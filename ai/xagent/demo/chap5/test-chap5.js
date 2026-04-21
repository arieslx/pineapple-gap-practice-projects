import {
  readTool,
  writeTool,
  editTool,
  grepTool,
  globTool,
  bashTool,
} from "./chap5.js";

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// --------------------------
// 测试环境准备
// --------------------------
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testWorkspace = path.join(__dirname, "test-workspace");
const context = { cwd: testWorkspace };

// 清空并重建测试目录
async function setupTestWorkspace() {
  await fs.rm(testWorkspace, { recursive: true, force: true });
  await fs.mkdir(testWorkspace, { recursive: true });
  console.log("✅ 测试目录已准备：", testWorkspace);
}

// --------------------------
// 测试入口
// --------------------------
(async function runAllTests() {
  await setupTestWorkspace();

  try {
    await testWrite();
    await testRead();
    await testEdit();
    await testGrep();
    await testGlob();
    await testBash();

    console.log("\n🎉 所有工具测试通过！");
  } catch (err) {
    console.error("\n❌ 测试失败：", err);
  } finally {
    // 可选：清理测试目录
    // await fs.rm(testWorkspace, { recursive: true, force: true });
  }
})();

// --------------------------
// 1. 测试 Write
// --------------------------
async function testWrite() {
  console.log("\n--- testWrite ---");
  const res = await writeTool.call(
    {
      file_path: "demo.txt",
      content: "Hello World\nI love Node.js\nHello again",
    },
    context
  );
  console.log(res.content);
}

// --------------------------
// 2. 测试 Read
// --------------------------
async function testRead() {
  console.log("\n--- testRead ---");
  const res = await readTool.call({ file_path: "demo.txt" }, context);
  console.log("文件内容：\n", res.content);
}

// --------------------------
// 3. 测试 Edit
// --------------------------
async function testEdit() {
  console.log("\n--- testEdit ---");
  const res = await editTool.call(
    {
      file_path: "demo.txt",
      old_string: "I love Node.js",
      new_string: "I love AI tools",
    },
    context
  );
  console.log(res.content);

  // 验证修改结果
  const check = await readTool.call({ file_path: "demo.txt" }, context);
  console.log("修改后：\n", check.content);
}

// --------------------------
// 4. 测试 Grep
// --------------------------
async function testGrep() {
  console.log("\n--- testGrep ---");
  const res = await grepTool.call({ pattern: "Hello" }, context);
  console.log("搜索结果：\n", res.content);
}

// --------------------------
// 5. 测试 Glob，需要提前安装 ripgrep 工具
// --------------------------
async function testGlob() {
  console.log("\n--- testGlob ---");
  // 先创建几个测试文件
  await writeTool.call({ file_path: "a.js", content: "1" }, context);
  await writeTool.call({ file_path: "b.ts", content: "2" }, context);
  await writeTool.call({ file_path: "c.js", content: "3" }, context);

  const res = await globTool.call({ pattern: "*.js" }, context);
  console.log("匹配到 *.js 文件：\n", res.content);
}

// --------------------------
// 6. 测试 Bash
// --------------------------
async function testBash() {
  console.log("\n--- testBash ---");
  const res = await bashTool.call({ command: "ls -la && echo 'test'" }, context);
  console.log("Shell 输出：\n", res.content);
}