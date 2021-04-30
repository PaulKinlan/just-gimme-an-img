import "./style.css";
import { run } from "./squoosh/index.js";
import "file-drop-element";
import "prismjs/themes/prism-okaidia.css";
import Prism from "prismjs";

const calculateSizes = (width, height) => {
  const sizes = [];
  let counter = 1;
  let scaledWidth = width;
  let scaledHeight = height;
  do {
    scaledWidth = width / counter;
    scaledHeight = height / counter;
    sizes.push([Math.ceil(scaledWidth), Math.ceil(scaledHeight)]);
    counter++;
  } while(scaledWidth > 320)
  return sizes;
};

const applyTemplate = (templateElement, data) => {
  const element = templateElement.content.cloneNode(true);    
  const treeWalker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT, () => NodeFilter.FILTER_ACCEPT);

  while(treeWalker.nextNode()) {
    const node = treeWalker.currentNode;
    for(let bindAttr in node.dataset) {
      let isBindableAttr = (bindAttr.indexOf('bind_') == 0) ? true : false;
      if(isBindableAttr) {
        let dataKeyString = node.dataset[bindAttr];
        let dataKeys = dataKeyString.split("|");
        let bindKey = bindAttr.substr(5);
        for(let dataKey of dataKeys) {
          if(dataKey in data && data[dataKey] !== "") {
            node[bindKey] = data[dataKey];
            break;
          }
        }
      }
    }
  }

  return element;
}

/*
Plan:
* Determine the image type.
* If jpeg, assume that will be good as a base image, don't re-encode.
* If png, assume that will be good as a base image, don't re-encode.
*/

const onFile = (e) => {
  const file = (e.target?.files || e.files)[0];
  const { name } = file;

  preview.src = URL.createObjectURL(file);
  preview.onload = async () => {
    const { naturalHeight, naturalWidth } = preview;
    const sizes = calculateSizes(naturalWidth, naturalHeight);

    updateCLI(sizes, name);
    updateHTML(sizes, name, naturalHeight, naturalWidth);

    Prism.highlightAll(); 

    const avifOutput = document.getElementById("avif-output");

    for (let [width, height] of sizes) {
      const results = await run({files: [file], "resize": { width, height }, "avif": "auto"});
      
      for (let file of results.values()) {
        const output = new Blob([file.outputs[0].out.buffer], {type:"image/avif"});

        const url = URL.createObjectURL(output);

        avifOutput.appendChild(applyTemplate(previewListItem, {name: `${name}-${width}`,url, width, height}));
      }
    }

    const pngOutput = document.getElementById("png-output");

    for (let [width, height] of sizes) {
      const results = await run({files: [file], "resize": { width, height }, "oxipng": "auto"});
      
      for (let file of results.values()) {
        const output = new Blob([file.outputs[0].out.buffer], {type:"image/png"});
        const previewImageElement = new Image();
        previewImageElement.src = URL.createObjectURL(output);
        pngOutput.appendChild(previewImageElement);
      }
    }
  };
}

fileSelect.addEventListener("change", onFile)
imageDrop.addEventListener("filedrop", onFile);

Prism.hooks.add("before-highlight", function (env) {
  env.code = env.element.innerText;
});

const updateHTML = (sizes, name, naturalHeight, naturalWidth) => {

  const extension = name.substring(name.lastIndexOf(".") +1);
  const nameNoExtension = name.substring(0, name.lastIndexOf("."));
  let sources = `<source 
    type="image/avif"
    srcset="${sizes.map(([width]) => `${encodeURIComponent(nameNoExtension)}\-${width}w.avif ${width}w`).join(", \n\t\t")}">`;
  code.innerText = `<picture>
  ${sources}
  <img 
    alt=""
    src="${(encodeURIComponent(name))}" 
    srcset="${sizes.map(([width]) => `${encodeURIComponent(nameNoExtension)}\-${width}w.${extension} ${width}w`).join(", \n\t\t")}"
    size="100vw"
    loading="lazy"
    decoding="async"
    height="${naturalHeight}"
    width="${naturalWidth}"
    style="content-visibility: auto; max-width: 100%;"
  />
</picture>`;
}

const updateCLI = (sizes, name) => {
  let cliCommands = sizes.map(
    ([width, height]) => `npx @squoosh/cli --resize "{width: ${width}, height: ${height}}" --avif auto -s \-${width}w ${name.split(" ").join("\\ ")}`
  );

  cliCommands.push(`npx @squoosh/cli --oxipng auto -s -original ${name.split(" ").join("\\ ")}`);
  cliCommands.push(...sizes.map(
    ([width, height]) => `npx @squoosh/cli --resize "{width: ${width}, height: ${height}}" --oxipng auto -s \-${width}w ${name.split(" ").join("\\ ")}`
  ));
  cli.innerText = cliCommands.join(' && \\ \n  ');
}

