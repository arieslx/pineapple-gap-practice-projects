import "dotenv/config";
import { streamMessage } from "./streaming.js";

//测试streamMessage函数，直接运行这个文件即可
const gen = streamMessage({
  messages: [{ role: "user", content: "用一句话解释什么是 Agentic Loop" }],
  system: "You are a helpful assistant. Reply in Chinese.",
});

let result;
while (true) {
  const { value, done } = await gen.next();
  if (done) {
    result = value;
    break;
  }

  switch (value.type) {
    case "text":
      process.stdout.write(value.text); // 逐字输出到终端
      break;
    case "message_done":
      console.log(
        `\nTokens: ${value.usage.input_tokens} in / ${value.usage.output_tokens} out`,
      );
      break;
  }
}
