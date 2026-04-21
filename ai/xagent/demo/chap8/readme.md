```
async *submitMessage(input: string) {
  const trimmed = input.trim();
  if (!trimmed) return;

  if (trimmed.startsWith("/")) {
    return yield* this.handleCommand(trimmed);
  }

  // 1. 追加用户消息
  // 2. 构建本轮 system prompt
  // 3. 获取工具列表
  // 4. 调用 query() 启动单轮 Agentic Loop
  // 5. 透传流式事件
  // 6. 在结束时落盘到会话状态
  // 7. 累计 usage
}

```