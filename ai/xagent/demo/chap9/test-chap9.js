import {
  createSessionId,
  initSessionStorage,
  appendTranscriptEntry,
  restoreSession,
  listProjectSessions,
  formatProjectSessionHistory,
  getLatestSessionId,
  createMessageEntry,
  createUsageEntry,
  createToolEventEntry,
  createSystemEntry,
} from "./chap9.js";

const cwd = process.cwd();

(async () => {
  console.log("=== Step9 会话存储测试开始 ===");

  // 1. 创建会话 ID
  const sessionId = createSessionId();
  console.log("✅ 生成会话 ID:", sessionId);

  // 2. 初始化会话存储（创建 JSONL 文件）
  const metadata = {
    sessionId,
    cwd,
    startedAt: new Date().toISOString(),
    model: "test-model-v1",
  };
  const paths = await initSessionStorage(metadata);
  console.log("✅ 会话目录初始化完成");
  console.log("📁 存储路径:", paths.transcriptPath);

  // 3. 追加各种日志
  await appendTranscriptEntry(cwd, sessionId,
    createMessageEntry({
      role: "user",
      message: { role: "user", content: "你好" },
    })
  );

  await appendTranscriptEntry(cwd, sessionId,
    createMessageEntry({
      role: "assistant",
      message: { role: "assistant", content: "你好！" },
    })
  );

  await appendTranscriptEntry(cwd, sessionId,
    createToolEventEntry({
      name: "Read",
      phase: "done",
      resultLength: 123,
      isError: false,
    })
  );

  await appendTranscriptEntry(cwd, sessionId,
    createUsageEntry({
      turn: { input_tokens: 10, output_tokens: 5 },
      total: { input_tokens: 10, output_tokens: 5 },
    })
  );

  await appendTranscriptEntry(cwd, sessionId,
    createSystemEntry({
      level: "info",
      message: "会话正常运行",
    })
  );
  console.log("✅ 成功追加 5 条日志");

  // 4. 获取最新会话 ID
  const latestId = await getLatestSessionId(cwd);
  console.log("✅ 最新会话 ID:", latestId);

  // 5. 恢复会话
  const restored = await restoreSession(cwd, sessionId);
  console.log("\n=== 恢复会话成功 ===");
  console.log("会话信息:", restored.summary);
  console.log("恢复的消息数量:", restored.messages.length);

  // 6. 列出项目所有会话
  const sessions = await listProjectSessions(cwd);
  console.log("\n=== 项目会话列表 ===");
  console.log(sessions);

  // 7. 格式化输出会话历史
  const formatted = await formatProjectSessionHistory(cwd);
  console.log("\n=== 格式化会话历史 ===");
  console.log(formatted);

  console.log("\n🎉 Step9 所有测试全部通过！");
})();