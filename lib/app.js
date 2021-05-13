import { ImageOptimizer } from "./ImageOptimizer";

let imageOptimizer;
const state = {
  running: false,
  basePath: "",
  images: []
};
const allImages = [];

export class App {

  constructor() {
    imageOptimizer = new ImageOptimizer();
  }

  get state() {
    return state;
  }

  get optimizer() {
    return imageOptimizer;
  }
}

export class ImageTask {

  constructor(width, height) {
    this._width = width;
    this._height = height;
    this._size = 0;
    this._compressedImage = undefined;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get size() {
    return this._size;
  }

  set size(value) {
    this._size = value;
  }

  set compressedImage(value) {

    if (this._url) {
      URL.revokeObjectURL(this._url)
    }

    this._compressedImage = value;
    if (value !== undefined) {
      this._url = URL.createObjectURL(value);
    }
    else {
      this._url = undefined;
    }
  }

  get compressedImage() {
    return this._compressedImage;
  }

  get url() {
    return this._url;
  }
}

