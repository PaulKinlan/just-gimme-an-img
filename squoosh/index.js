import { W as WorkerPool, p as preprocessors, c as codecs } from './worker_pool-bba7ad7e.js';

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;

  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length) code = path.charCodeAt(i);else if (code === 47) break;else code = 47;

    if (code === 47) {
        if (lastSlash === i - 1 || dots === 1) ;else if (lastSlash !== i - 1 && dots === 2) {
          if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
              if (res.length > 2) {
                var lastSlashIndex = res.lastIndexOf('/');

                if (lastSlashIndex !== res.length - 1) {
                  if (lastSlashIndex === -1) {
                    res = '';
                    lastSegmentLength = 0;
                  } else {
                    res = res.slice(0, lastSlashIndex);
                    lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
                  }

                  lastSlash = i;
                  dots = 0;
                  continue;
                }
              } else if (res.length === 2 || res.length === 1) {
                res = '';
                lastSegmentLength = 0;
                lastSlash = i;
                dots = 0;
                continue;
              }
            }

          if (allowAboveRoot) {
            if (res.length > 0) res += '/..';else res = '..';
            lastSegmentLength = 2;
          }
        } else {
          if (res.length > 0) res += '/' + path.slice(lastSlash + 1, i);else res = path.slice(lastSlash + 1, i);
          lastSegmentLength = i - lastSlash - 1;
        }
        lastSlash = i;
        dots = 0;
      } else if (code === 46 && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }

  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');

  if (!dir) {
    return base;
  }

  if (dir === pathObject.root) {
    return dir + base;
  }

  return dir + sep + base;
}

var posix = {
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0) path = arguments[i];else {
        if (cwd === undefined) cwd = process.cwd();
        path = cwd;
      }
      assertPath(path);

      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47;
    }

    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0) return '/' + resolvedPath;else return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },
  normalize: function normalize(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var isAbsolute = path.charCodeAt(0) === 47;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47;
    path = normalizeStringPosix(path, !isAbsolute);
    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';
    if (isAbsolute) return '/' + path;
    return path;
  },
  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47;
  },
  join: function join() {
    if (arguments.length === 0) return '.';
    var joined;

    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);

      if (arg.length > 0) {
        if (joined === undefined) joined = arg;else joined += '/' + arg;
      }
    }

    if (joined === undefined) return '.';
    return posix.normalize(joined);
  },
  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);
    if (from === to) return '';
    from = posix.resolve(from);
    to = posix.resolve(to);
    if (from === to) return '';
    var fromStart = 1;

    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47) break;
    }

    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;
    var toStart = 1;

    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47) break;
    }

    var toEnd = to.length;
    var toLen = toEnd - toStart;
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;

    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47) {
              return to.slice(toStart + i + 1);
            } else if (i === 0) {
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47) {
              lastCommonSep = i;
            } else if (i === 0) {
            lastCommonSep = 0;
          }
        }

        break;
      }

      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode) break;else if (fromCode === 47) lastCommonSep = i;
    }

    var out = '';

    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47) {
          if (out.length === 0) out += '..';else out += '/..';
        }
    }

    if (out.length > 0) return out + to.slice(toStart + lastCommonSep);else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47) ++toStart;
      return to.slice(toStart);
    }
  },
  _makeLong: function _makeLong(path) {
    return path;
  },
  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47;
    var end = -1;
    var matchedSlash = true;

    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);

      if (code === 47) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },
  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);
    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;

      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);

        if (code === 47) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }

          if (extIdx >= 0) {
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                end = i;
              }
            } else {
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },
  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var preDotState = 0;

    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);

      if (code === 47) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }

          continue;
        }

      if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }

      if (code === 46) {
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }

    return path.slice(startDot, end);
  },
  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }

    return _format('/', pathObject);
  },
  parse: function parse(path) {
    assertPath(path);
    var ret = {
      root: '',
      dir: '',
      base: '',
      ext: '',
      name: ''
    };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47;
    var start;

    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }

    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;
    var preDotState = 0;

    for (; i >= start; --i) {
      code = path.charCodeAt(i);

      if (code === 47) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }

          continue;
        }

      if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }

      if (code === 46) {
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }

      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';
    return ret;
  },
  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};
posix.posix = posix;
var pathBrowserify = posix;

function clamp(v, min, max) {
  if (v < min) return min;
  if (v > max) return max;
  return v;
}

const suffix = ['B', 'KB', 'MB'];

function prettyPrintSize(size) {
  const base = Math.floor(Math.log2(size) / 10);
  const index = clamp(base, 0, 2);
  return (size / 2 ** (10 * index)).toFixed(2) + suffix[index];
}

function progressTracker(results, program) {
  const tracker = {};
  tracker.progressOffset = 0;
  tracker.totalOffset = 0;
  let status = '';

  tracker.setStatus = text => {
    status = text || '';
    update();
  };

  let progress = '';

  tracker.setProgress = (done, total) => {
    const completeness = (tracker.progressOffset + done) / (tracker.totalOffset + total);
    progress = `▐${'▨'.repeat(completeness * 10 | 0).padEnd(10, '╌')}▌ `;
    update();
  };

  function update() {
    console.log(progress + status.bold() + getResultsText());
  }

  tracker.finish = text => {
    console.log('finished', text.bold() + getResultsText());
  };

  function getResultsText() {
    let out = '';

    for (const [filename, result] of results.entries()) {
      out += `\n ${filename}: ${prettyPrintSize(result.size)}`;

      for (const {
        outputFile,
        outputSize,
        infoText
      } of result.outputs) {
        const name = (program.suffix + pathBrowserify.extname(outputFile)).padEnd(5);
        out += `\n  ${'└'} ${name} → ${prettyPrintSize(outputSize)}`;
        const percent = (outputSize / result.size * 100).toPrecision(3);
        out += ` (${percent}%)`;
        if (infoText) out += infoText;
      }
    }

    return out || '\n';
  }

  return tracker;
}

async function run({
  files = [],
  suffix = '',
  optimizerButteraugliTarget = false,
  outputDir = '',
  maxOptimizerRounds = 8,
  ...extras
}) {
  return await processFiles(files, {
    suffix,
    optimizerButteraugliTarget,
    outputDir,
    maxOptimizerRounds,
    ...extras
  });
}

async function processFiles(files, program) {
  const parallelism = navigator.hardwareConcurrency;
  const results = new Map();
  const progress = progressTracker(results, program);
  progress.setStatus('Decoding...');
  progress.totalOffset = files.length;
  progress.setProgress(0, files.length);
  const workerPool = new WorkerPool(parallelism);
  let decoded = 0;
  let decodedFiles = await Promise.all(files.map(async file => {
    const result = await workerPool.dispatchJob({
      operation: 'decode',
      file
    });
    results.set(file.name, {
      file: result.file,
      size: result.size,
      outputs: []
    });
    progress.setProgress(++decoded, files.length);
    return result;
  }));

  for (const [preprocessorName, value] of Object.entries(preprocessors)) {
    if (!program[preprocessorName]) {
      continue;
    }

    const preprocessorParam = program[preprocessorName];
    const preprocessorOptions = Object.assign({}, value.defaultOptions, preprocessorParam);
    decodedFiles = await Promise.all(decodedFiles.map(async file => {
      return workerPool.dispatchJob({
        file,
        operation: 'preprocess',
        preprocessorName,
        options: preprocessorOptions
      });
    }));
  }

  progress.progressOffset = decoded;
  progress.setStatus(`Encoding (${parallelism} threads)`);
  progress.setProgress(0, files.length);
  const jobs = [];
  let jobsStarted = 0;
  let jobsFinished = 0;

  for (const {
    file,
    bitmap,
    size
  } of decodedFiles) {
    const ext = pathBrowserify.extname(file.name);
    const base = pathBrowserify.basename(file.name, ext) + program.suffix;

    for (const [encName, value] of Object.entries(codecs)) {
      if (!program[encName]) {
        continue;
      }

      const encParam = typeof program[encName] === 'string' ? program[encName] : '{}';
      const encConfig = encParam.toLowerCase() === 'auto' ? 'auto' : Object.assign({}, value.defaultEncoderOptions, encParam);
      const outputFile = pathBrowserify.join(program.outputDir, `${base}.${value.extension}`);
      jobsStarted++;
      const p = workerPool.dispatchJob({
        operation: 'encode',
        file,
        size,
        bitmap,
        outputFile,
        encName,
        encConfig,
        optimizerButteraugliTarget: Number(program.optimizerButteraugliTarget),
        maxOptimizerRounds: Number(program.maxOptimizerRounds)
      }).then(output => {
        jobsFinished++;
        results.get(file.name).outputs.push(output);
        progress.setProgress(jobsFinished, jobsStarted);
      });
      jobs.push(p);
    }
  }

  progress.setProgress(jobsFinished, jobsStarted);
  await workerPool.join();
  await Promise.all(jobs);
  progress.finish('Squoosh results:');
  return results;
}

export { run };
