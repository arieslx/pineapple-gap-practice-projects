import { query } from "./chap4.js";
import fs from "node:fs/promises";

// 1. 创建测试文件
await fs.writeFile(
  "test.txt",
  "第一行内容\n第二行内容\n第三行内容\n我是被AI读取的文件",
  "utf8",
);

console.log("===== 开始测试 Agent 智能循环 =====\n");

// 2. 运行 Agent
const stream = query({
  messages: [
    {
      role: "user",
      content: "请读取 package.json 的内容，并告诉我项目的 name",
    },
  ],
  systemPrompt: "你是一个AI助手，可以调用工具读取文件",
  toolContext: { cwd: process.cwd() },
  maxTurns: 5,
});

const stream1 = query({
  messages: [
    {
      role: "user",
      content:
        "请先读取 README.md，再读取 package.json，然后总结这个项目的用途和启动方式",
    },
  ],
  systemPrompt: "你是一个AI助手，可以调用工具读取文件",
  toolContext: { cwd: process.cwd() },
  maxTurns: 5,
});

// 3. 消费流式输出
while (true) {
  const { value, done } = await stream1.next();
  if (done) {
    console.log("\n===== 最终结果 =====");
    console.log("结束原因:", value.reason);
    console.log("token 用量:", value.usage);
    break;
  }

  if (value.type === "text") {
    process.stdout.write(value.text);
  }

  if (value.type === "tool_use_start") {
    console.log(`\n[AI 调用工具: ${value.name}]`);
  }

  if (value.type === "tool_result_message") {
    console.log("\n[工具返回结果]");
    console.log(value.message.content[0].content);
  }
}

// 清理
await fs.unlink("test.txt");
console.log("\n✅ 测试完成！");
