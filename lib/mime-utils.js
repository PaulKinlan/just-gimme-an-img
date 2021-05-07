export const getCLIOptionsFromMimeType = (mimeType) => {
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
export const getExtensionFromMimeType = (mimeType) => {
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
export const getCodecFromMimeType = (mimeType) => {
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
export const getConversionStrategyForInput = (mimeType) => {
  // Our strategy is here.
  // <source> is 0, <img> is 1.
  const codecs = {
    "image/png": ["avif", "png"],
    "image/avif": ["avif", "png"],
    "image/jpeg": ["avif", "mozjpeg"],
    "image/webp": ["avif", "webp"], // Should we actually have a fallback of png...?
  };

  if (mimeType in codecs) {
    return codecs[mimeType];
  }

  throw "Mime-type unknown.";
};
export const getMimeTypeFromStrategy = (mimeType) => {
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
