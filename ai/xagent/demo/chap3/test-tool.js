// test-tools.js
import { readTool, resolveWorkspacePath, addLineNumbers } from "./tools.js";
import fs from "node:fs/promises";
import path from "node:path";

// 1. 测试 addLineNumbers
console.log("===== 测试 1：行号添加功能 =====");
const testText = `第一行
第二行
第三行`;
console.log(addLineNumbers(testText, 1));

// 2. 测试路径安全解析（防止越权访问上级目录）
console.log("\n===== 测试 2：路径安全限制 =====");
const cwd = process.cwd();
try {
  // 允许的路径
  const safePath = resolveWorkspacePath("test-file.txt", cwd);
  console.log("允许的路径:", safePath);

  // 禁止的路径（越权访问 ..）
  const badPath = resolveWorkspacePath("../secret.txt", cwd);
  console.log("禁止的路径:", badPath);
} catch (e) {
  console.log("✅ 成功拦截越权路径:", e.message);
}

// 3. 测试 Read 工具（真正调用文件读取）
console.log("\n===== 测试 3：Read 工具调用 =====");

// 先创建一个测试文件
await fs.writeFile(
  "test-file.txt",
  "Hello World\n这是第二行\n第三行测试",
  "utf8",
);

// 调用工具
const result = await readTool.call(
  {
    file_path: "test-file.txt",
    offset: 1,
    limit: 3,
  },
  { cwd: process.cwd() }, // 当前工作目录
);

console.log(result.content);

// 清理测试文件
await fs.unlink("test-file.txt");

console.log("\n✅ 所有工具测试完成！");
