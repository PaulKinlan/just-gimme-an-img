import { run } from "../squoosh/index.js";

export class ImageOptimizer {
  constructor() {
    this._file = null;
  }

  // async, but returns a promis
  load(file) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        this._file = file;
        let { naturalHeight, naturalWidth } = img;
        const metadata = {
          naturalWidth,
          naturalHeight,
          type: file.type,
          name: file.name,
        };
        this._metadata = metadata;
        resolve(metadata);
      };
      img.onerror = (error) => reject(error);
    });
  }

  get optimalSizes() {
    const sizes = [];
    let counter = 1;
    let { naturalWidth, naturalHeight } = this._metadata;
    let scaledWidth = naturalWidth;
    let scaledHeight = naturalHeight;
    do {
      scaledWidth = naturalWidth / counter;
      scaledHeight = naturalHeight / counter;
      sizes.push([Math.ceil(scaledWidth), Math.ceil(scaledHeight)]);
      counter++;
    } while (scaledWidth > 320);
    return sizes;
  }

  async optimize(options) {
    return await run({ files: [this._file], ...options });
  }

  get metadata() {
    return this._metadata;
  }

  get file() {
    return this._file;
  }
}
