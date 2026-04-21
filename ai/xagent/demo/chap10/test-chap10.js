import {
  ensureMemoryDir,
  saveMemory,
  readMemoryEntrypoint,
  findRelevantMemories,
  listMemoryFiles,
  rebuildMemoryIndex,
} from "./chap10.js";

// 当前目录作为测试项目
const cwd = process.cwd();

(async () => {
  console.log("=== Step10 项目记忆系统测试 ===");

  // 1. 创建记忆目录
  await ensureMemoryDir(cwd);
  console.log("✅ 记忆目录创建完成");

  // 2. 保存一条项目记忆
  const memory1 = {
    type: "project",
    name: "项目技术栈",
    description: "记录当前项目使用的技术",
    body: "本项目使用 Node.js + AI 模型，文件存储使用 JSONL，记忆系统使用 MD 文件。",
  };
  const filePath1 = await saveMemory(cwd, memory1);
  console.log("✅ 记忆已保存：", filePath1);

  // 3. 再保存一条用户记忆
  const memory2 = {
    type: "user",
    name: "用户偏好",
    description: "用户喜欢简洁、安全、可解释的代码",
    body: "用户希望代码安全、防注入、防越权，工具调用必须有权限控制。",
  };
  await saveMemory(cwd, memory2);
  console.log("✅ 第二条记忆已保存");

  // 4. 读取记忆索引 MEMORY.md
  const index = await readMemoryEntrypoint(cwd);
  console.log("\n=== 记忆索引 MEMORY.md ===");
  console.log(index);

  // 5. 搜索相关记忆（关键词：安全）
  const relevant = await findRelevantMemories(cwd, "安全 代码");
  console.log("\n=== 搜索『安全 代码』相关记忆 ===");
  console.log(relevant.join("\n---\n"));

  // 6. 列出所有记忆文件
  const files = await listMemoryFiles(cwd);
  console.log("\n=== 所有记忆文件 ===");
  console.log(files);

  console.log("\n🎉 Step10 所有测试全部通过！");
})();