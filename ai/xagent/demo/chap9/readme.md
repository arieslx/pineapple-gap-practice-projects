### 保存下面五类记录：
1. session_meta
会话元信息，记录：
- sessionId
- 当前项目 cwd
- startedAt
- model
这一条通常在新会话开始时写入一次。

---
2. message
真正的对话消息：
- 用户消息
- assistant 消息
恢复会话时，最核心的工作就是把这些 message 重建回 MessageParam[]。

---
3. tool_event
工具调用的过程信息：
- 哪个工具被调用
- 何时开始
- 何时结束
- 结果长度
- 是否出错
这一类记录不一定直接参与恢复模型上下文，但对调试、回看和历史分析非常有价值。

---
4. usage
每轮 token 消耗，以及累计 token 消耗。
这会让 /history 有东西可展示，也为后面的 token 预算管理打下基础。

---
5. system
本地命令和系统事件，例如：
- /history 的输出
- 某次错误
- 某次中断
它们让 transcript 更接近真实运行轨迹。

```js
export type TranscriptEntry =
  | { type: "session_meta"; sessionId: string; cwd: string; startedAt: string; model: string }
  | { type: "message"; timestamp: string; role: "user" | "assistant"; message: MessageParam }
  | { type: "tool_event"; timestamp: string; name: string; phase: "start" | "done"; resultLength?: number; isError?: boolean }
  | { type: "usage"; timestamp: string; turn: Usage; total: Usage }
  | { type: "system"; timestamp: string; level: "info" | "error"; message: string };

```