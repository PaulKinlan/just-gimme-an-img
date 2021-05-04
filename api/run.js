import { run } from "./squoosh/index.js";

module.exports = async (req, res) => {
  const {
    body = undefined,
    suffix = "",
    optimizerButteraugliTarget = false,
    outputDir,
    maxOptimizerRounds,
  } = req.query;

  /*
  files = [],
  suffix = '',
  optimizerButteraugliTarget = false,
  outputDir = '',
  maxOptimizerRounds = 8,
  ...extras
  */

  const files = [];
  return await run({
    files,
    suffix,
    optimizerButteraugliTarget,
    outputDir,
    maxOptimizerRounds,
  });
};
