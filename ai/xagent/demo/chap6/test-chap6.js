import { buildSystemPrompt } from "./chap6.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  const prompt = await buildSystemPrompt({
    cwd: __dirname,
    additionalInstructions: "Please keep responses short."
  });

  console.log("==== 系统提示词 ====\n");
  console.log(prompt);
})();