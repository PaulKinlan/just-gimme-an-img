import "./style.css";
import "file-drop-element";
import "prismjs/themes/prism-okaidia.css";
import Prism from "prismjs";
import { basename, extname } from "./utils";

import { registerSW } from "virtual:pwa-register";
import { applyTemplate } from "./lib/applyTemplate";
import {
  getConversionStrategyForInput,
  getMimeTypeFromStrategy,
  getExtensionFromMimeType,
  getCodecFromMimeType,
  getCLIOptionsFromMimeType,
} from "./lib/mime-utils";
import { ImageOptimizer } from "./lib/ImageOptimizer";

const updateSW = registerSW({
  onNeedRefresh() {
    // show a prompt to user
  },
  onOfflineReady() {
    // show a ready to work offline to user
  },
});

const imageOptimizer = new ImageOptimizer();

let allImages = [];

const onSaveAll = async (e) => {
  if (allImages.length == 0) {
    alert("Please encode some images");
    return;
  }

  if ("showDirectoryPicker" in window === false) {
    alert(
      "This feature only works in a browser that supports the File System API."
    );
    return;
  }

  try {
    const directoryHandle = await window.showDirectoryPicker();
    if (directoryHandle !== undefined) {
      for (let image of allImages) {
        const file = await directoryHandle.getFileHandle(image.name, {
          create: true,
        });
        const writable = await file.createWritable();
        await image.stream().pipeTo(writable);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const onFile = (e) => {
  const file = (e.target?.files || e.files)[0];

  goButton.disabled = false;

  imageOptimizer
    .load(file)
    .then(({ naturalWidth, naturalHeight, type, name }) => {
      let root = document.documentElement;

      root.style.setProperty("--filename", `'${name}'`);

      const [
        sourceElementStrategy,
        imgElementStrategy,
      ] = getConversionStrategyForInput(type);

      const sourceElementMimeType = getMimeTypeFromStrategy(
        sourceElementStrategy
      );
      const imgElementMimeType = getMimeTypeFromStrategy(imgElementStrategy);

      //const { naturalHeight, naturalWidth } = i.load;
      const sizes = imageOptimizer.optimalSizes;

      updateCLI(sizes, name, sourceElementStrategy, imgElementStrategy);
      updateHTML(
        sizes,
        name,
        sourceElementMimeType,
        imgElementMimeType,
        naturalHeight,
        naturalWidth
      );

      Prism.highlightAll();

      const rootOutputElement = document.getElementById("image-output");
      rootOutputElement.innerHTML = "";

      renderOriginal(rootOutputElement);

      createWorklistUI(rootOutputElement, sourceElementMimeType);
      createWorklistUI(rootOutputElement, imgElementMimeType);
    });
};

const onGoClicked = async (e) => {
  const {file, optimalSizes} = imageOptimizer;

  // We have to load the image to get the width and height.
  const [
    sourceElementStrategy,
    imgElementStrategy,
  ] = getConversionStrategyForInput(file.type);

  const sourceElementMimeType = getMimeTypeFromStrategy(sourceElementStrategy);
  const imgElementMimeType = getMimeTypeFromStrategy(imgElementStrategy);

  allImages.push(
    ...(await compressAndOutputImages(file, optimalSizes, sourceElementMimeType))
  );
  allImages.push(
    ...(await compressAndOutputImages(file, optimalSizes, imgElementMimeType))
  );
};

fileSelect.addEventListener("change", onFile);
imageDrop.addEventListener("filedrop", onFile);
goButton.addEventListener("click", onGoClicked);
saveAllButton.addEventListener("click", onSaveAll);

Prism.hooks.add("before-highlight", function (env) {
  env.code = env.element.innerText;
});

const updateHTML = (
  sizes,
  name,
  sourceElementMimeType,
  imgElementMimeType,
  naturalHeight,
  naturalWidth
) => {
  const extension = extname(name);
  const nameNoExtension = basename(name, extension);

  const sourceExtension = getExtensionFromMimeType(sourceElementMimeType);
  const imgExtension = getExtensionFromMimeType(imgElementMimeType);

  let sources = `<source 
    type="${sourceElementMimeType}"
    sizes="100vw"
    srcset="${sizes
      .map(
        ([width]) =>
          `${encodeURIComponent(
            nameNoExtension
          )}\-${width}w.${sourceExtension} ${width}w`
      )
      .join(", \n\t\t")}">`;

  code.innerText = `<picture>
  ${sources}
  <img 
    alt="The Author should a description of what appears in the image."
    src="${encodeURIComponent(nameNoExtension)}.${imgExtension}" 
    srcset="${sizes
      .map(
        ([width]) =>
          `${encodeURIComponent(
            nameNoExtension
          )}\-${width}w.${imgExtension} ${width}w`
      )
      .join(", \n\t\t")}"
    sizes="100vw"
    loading="lazy"
    decoding="async"
    height="${naturalHeight}"
    width="${naturalWidth}"
    style="content-visibility: auto; max-width: 100%; height: auto;"
  />
</picture>`;
};

const updateCLI = (sizes, name, targetBaseCodec, targetSourceCodec) => {
  let cliCommands = sizes.map(
    ([width, height]) =>
      `npx @squoosh/cli --resize "{width: ${width}, height: ${height}}" --${targetSourceCodec} auto -s \-${width}w ${name
        .split(" ")
        .join("\\ ")}`
  );

  cliCommands.push(
    ...sizes.map(
      ([width, height]) =>
        `npx @squoosh/cli --resize "{width: ${width}, height: ${height}}" --${targetBaseCodec} auto -s \-${width}w ${name
          .split(" ")
          .join("\\ ")}`
    )
  );
  cli.innerText = cliCommands.join(" && \\ \n  ");
};

const renderOriginal = (rootElement) => {
  const { file, metadata } = imageOptimizer;
  const { name } = file;

  rootElement.appendChild(
    applyTemplate(codecOutputTemplate, {
      codec: "original",
      id: `original-output`,
    })
  );

  const outputElement = document.getElementById(`original-output`);

  outputElement.appendChild(
    applyTemplate(previewListItemTemplate, {
      name: `${name}`,
      url: URL.createObjectURL(file),
      width: metadata.naturalWidth,
      height: metadata.naturalHeight,
      size: `${(file.size / 1024).toFixed(2)} KB`,
    })
  );
};

function createWorklistUI(rootElement, mimeType) {
  const { metadata: {name}, optimalSizes } = imageOptimizer;
  const extension = getExtensionFromMimeType(mimeType);

  rootElement.appendChild(
    applyTemplate(codecOutputTemplate, {
      codec: getCodecFromMimeType(mimeType),
      id: `${getCodecFromMimeType(mimeType)}-output`,
    })
  );

  const outputElement = document.getElementById(
    `${getCodecFromMimeType(mimeType)}-output`
  );

  for (let [width, height] of optimalSizes) {
    outputElement.appendChild(
      applyTemplate(previewListItemTemplate, {
        name: `${basename(name, extname(name))}-${width}.${extension}`,
        width,
        height,
        previewText: "",
        downloadText: "",
        size: `Unknown Size`,
      })
    );
  }
}

async function compressAndOutputImages(fileToConvert, sizes, mimeType) {
  const { name } = fileToConvert;
  const extension = getExtensionFromMimeType(mimeType);
  const cliOptions = getCLIOptionsFromMimeType(mimeType);
  const compressedImages = [];

  for (let [width, height] of sizes) {
    cliOptions["resize"] = { width, height };

    const elementToUpdate = document.getElementById(
      `${basename(name, extname(name))}-${width}.${extension}`
    );

    elementToUpdate.classList.add("working");

    const results = await imageOptimizer.optimize(cliOptions);

    for (let file of results.values()) {
      const outputFile = file.outputs[0];
      const newName = `${basename(name, extname(name))}-${width}.${extension}`;
      const output = new File([file.outputs[0].out.buffer], newName, {
        type: mimeType,
      });
      compressedImages.push(output);

      const url = URL.createObjectURL(output);

      const newElement = applyTemplate(previewListItemTemplate, {
        name: newName,
        url,
        width,
        height,
        previewText: "Preview",
        downloadText: "Download",
        size: `${(outputFile.outputSize / 1024).toFixed(2)} KB`,
      });

      elementToUpdate.replaceWith(newElement);
    }
  }
  return compressedImages;
}
