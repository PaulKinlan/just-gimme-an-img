import "./style.css";
import { run } from "./squoosh/index.js";
import "file-drop-element";
import "prismjs/themes/prism-okaidia.css";
import Prism from "prismjs";
import { basename, extname } from "./utils";

import { registerSW } from "virtual:pwa-register";
import { applyTemplate } from "./lib/applyTemplate";

const updateSW = registerSW({
  onNeedRefresh() {
    // show a prompt to user
  },
  onOfflineReady() {
    // show a ready to work offline to user
  },
});

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
  } while (scaledWidth > 320);
  return sizes;
};

let file;

const onFile = (e) => {
  goButton.disabled = false;
  file = (e.target?.files || e.files)[0];
}

const onGoClicked = (e) => {
  const { name } = file;

  // We have to load the image to get the width and height.
  preview.src = URL.createObjectURL(file);
  preview.onload = async () => {
    const [
      sourceElementStrategy,
      imgElementStrategy,
    ] = getConversionStrategyForInput(file.type);

    const sourceElementMimeType = getMimeTypeFromStrategy(
      sourceElementStrategy
    );
    const imgElementMimeType = getMimeTypeFromStrategy(imgElementStrategy);

    const { naturalHeight, naturalWidth } = preview;
    const sizes = calculateSizes(naturalWidth, naturalHeight);

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

    const spinner = document.getElementById("loader-container");
    spinner.classList.remove("hidden");

    const rootOutputElement = document.getElementById("image-output");
    rootOutputElement.innerHTML = "";

    await compressAndOutputImages(
      file,
      sizes,
      rootOutputElement,
      sourceElementMimeType
    );
    await compressAndOutputImages(file, sizes, rootOutputElement, imgElementMimeType);

    spinner.classList.add("hidden");
  };
};

fileSelect.addEventListener("change", onFile);
imageDrop.addEventListener("filedrop", onFile);
goButton.addEventListener("click", onGoClicked);

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

const getCLIOptionsFromMimeType = (mimeType) => {
  const extensions = {
    "image/png": { oxipng: "auto" },
    "image/avif": { avif: "auto" },
    "image/jpeg": { mozjpeg: "auto" },
    "image/webp": { webp: "auto" },
  };

  if (mimeType in extensions) {
    return extensions[mimeType];
  }

  throw "Mime-type unknown.";
};

const getExtensionFromMimeType = (mimeType) => {
  const extensions = {
    "image/png": "png",
    "image/avif": "avif",
    "image/jpeg": "jpeg",
    "image/webp": "webp",
  };

  if (mimeType in extensions) {
    return extensions[mimeType];
  }

  throw "Mime-type unknown.";
};

const getCodecFromMimeType = (mimeType) => {
  const codecs = {
    "image/png": "oxipng",
    "image/avif": "avif",
    "image/jpeg": "mozjpeg",
    "image/webp": "webp",
  };

  if (mimeType in codecs) {
    return codecs[mimeType];
  }

  throw "Mime-type unknown.";
};

const getConversionStrategyForInput = (mimeType) => {
  // Our strategy is here.
  // <source> is 0, <img> is 1.
  const codecs = {
    "image/png": ["avif", "png"],
    "image/avif": ["avif", "png"], // AVIF should be in the source, then png in the image.
    "image/jpeg": ["avif", "mozjpeg"],
    "image/webp": ["avif", "webp"], // Should we actually have a fallback of png...?
  };

  if (mimeType in codecs) {
    return codecs[mimeType];
  }

  throw "Mime-type unknown.";
};

const getMimeTypeFromStrategy = (mimeType) => {
  // Our strategy is here.
  // <source> is 0, <img> is 1.
  const codecs = {
    png: "image/png",
    avif: "image/avif",
    mozjpeg: "image/jpeg",
    webp: "image/webp",
  };

  if (mimeType in codecs) {
    return codecs[mimeType];
  }

  throw "Mime-type unknown.";
};

async function compressAndOutputImages(
  fileToConvert,
  sizes,
  rootElement,
  mimeType
) {
  const { name } = fileToConvert;
  const extension = getExtensionFromMimeType(mimeType);
  const cliOptions = getCLIOptionsFromMimeType(mimeType);

  rootElement.appendChild(applyTemplate(codecOutputTemplate, {
    codec: getCodecFromMimeType(mimeType),
    id: `${getCodecFromMimeType(mimeType)}-output`
  }));

  const outputElement = document.getElementById(`${getCodecFromMimeType(mimeType)}-output`);

  for (let [width, height] of sizes) {
    cliOptions["resize"] = { width, height };

    const results = await run({ files: [fileToConvert], ...cliOptions });

    for (let file of results.values()) {
      const outputFile = file.outputs[0];
      const output = new Blob([file.outputs[0].out.buffer], { type: mimeType });

      const url = URL.createObjectURL(output);

      outputElement.appendChild(
        applyTemplate(previewListItemTemplate, {
          name: `${basename(name, extname(name))}-${width}.${extension}`,
          url,
          width,
          height,
          size: `${(outputFile.outputSize / 1024).toFixed(3)} KB`,
        })
      );
    }
  }
}
