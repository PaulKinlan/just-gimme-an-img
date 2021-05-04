import { run } from "../squoosh/index.js";


export default async (req) => {
	req.respond({ body: `Hello, from Deno v${Deno.version.deno}!` });
};


/*
module.exports = async (req, res) => {
  const {
    suffix = "",
    optimizerButteraugliTarget = false,
    outputDir,
    maxOptimizerRounds,
    resize = "{}",
    avif,
    oxipng,
    webp
  } = req.query;

  const body = { req };

  // 5 MB image limit. FFS.


  const files = [];
  const output = await run({
    files,
    suffix,
    optimizerButteraugliTarget,
    outputDir,
    maxOptimizerRounds,
    avif,
    oxipng,
    resize,
    webp
  });

};
*/