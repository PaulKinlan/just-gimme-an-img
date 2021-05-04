import "./style.css";
import { run } from "./squoosh/index.js";
import "file-drop-element";
import "prismjs/themes/prism-okaidia.css";
import Prism from "prismjs";
import {basename, extname} from './utils';


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
    
    const spinner = document.getElementById("loader-container");
    spinner.classList.remove("hidden");

    const avifOutput = document.getElementById("avif-output");
    const pngOutput = document.getElementById("png-output");
   
    
    await compressAndOutputImages(file, sizes, avifOutput, "image/avif", {
      "avif": "auto",
    });
    await compressAndOutputImages(file, sizes, pngOutput, "image/png", {
      "oxipng": "auto",
    });

    spinner.classList.add("hidden");
  };
}

fileSelect.addEventListener("change", onFile)
imageDrop.addEventListener("filedrop", onFile);

Prism.hooks.add("before-highlight", function (env) {
  env.code = env.element.innerText;
});

const updateHTML = (sizes, name, naturalHeight, naturalWidth) => {

  const extension = extname(name);
  const nameNoExtension = basename(name, extension);

  let sources = `<source 
    type="image/avif"
    srcset="${sizes.map(([width]) => `${encodeURIComponent(nameNoExtension)}\-${width}w.avif ${width}w`).join(", \n\t\t")}">`;
  
  code.innerText = `<picture>
  ${sources}
  <img 
    alt="The Author should add something here"
    src="${(encodeURIComponent(name))}" 
    srcset="${sizes.map(([width]) => `${encodeURIComponent(nameNoExtension)}\-${width}w${extension} ${width}w`).join(", \n\t\t")}"
    size="100vw"
    loading="lazy"
    decoding="async"
    height="${naturalHeight}"
    width="${naturalWidth}"
    style="content-visibility: auto; max-width: 100%; height: auto;"
  />
</picture>`;
}

const updateCLI = (sizes, name) => {
  let cliCommands = sizes.map(
    ([width, height]) => `npx @squoosh/cli --resize "{width: ${width}, height: ${height}}" --avif auto -s \-${width}w ${name.split(" ").join("\\ ")}`
  );

  cliCommands.push(...sizes.map(
    ([width, height]) => `npx @squoosh/cli --resize "{width: ${width}, height: ${height}}" --oxipng auto -s \-${width}w ${name.split(" ").join("\\ ")}`
  ));
  cli.innerText = cliCommands.join(' && \\ \n  ');
}

const getExtensionFromMimeType = (mimeType) => {
  const extensions = {
    'image/png': 'png',
    'image/avif': 'avif',
    'image/jpeg': 'jpeg',
    'image/webp': 'webp'
  }

  if (mimeType in extensions) {
    return extensions[mimeType];
  }

  throw "Mime-type unknown."
}

async function compressAndOutputImages(fileToConvert, sizes, element, mimeType, cliOptions) {
  const {name} = fileToConvert;
  const extension = getExtensionFromMimeType(mimeType);

  element.innerHTML = "";

  for (let [width, height] of sizes) {

    cliOptions["resize"] = { width, height };

    const results = await run({ files: [fileToConvert], ...cliOptions});

    for (let file of results.values()) {
      const outputFile = file.outputs[0];
      const output = new Blob([file.outputs[0].out.buffer], { type: mimeType });

      const url = URL.createObjectURL(output);

      element.appendChild(applyTemplate(previewListItem, { name: `${basename(name, extname(name))}-${width}.${extension}`, url, width, height, size: `${(outputFile.outputSize / 1024).toFixed(3)} KB` }));
    }
  }
}

