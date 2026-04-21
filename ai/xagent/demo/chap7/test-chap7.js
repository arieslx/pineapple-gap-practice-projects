import { checkPermission } from "./chap7.js";
import { readTool, writeTool, bashTool } from "../chap5/chap5.js";

(async () => {
  // 测试1：只读工具 → allow
  const p1 = await checkPermission({ tool: readTool, input: { file_path: "a.txt" } });
  console.log("Read 权限:", p1.behavior, "→", p1.reason);

  // 测试2：写工具 → ask
  const p2 = await checkPermission({ tool: writeTool, input: { file_path: "a.txt", content: "test" } });
  console.log("Write 权限:", p2.behavior, "→", p2.reason);

  // 测试3：危险命令 → deny
  const p3 = await checkPermission({ tool: bashTool, input: { command: "rm test.txt" } });
  console.log("Bash rm 权限:", p3.behavior, "→", p3.reason);

  // 测试4：安全命令 → allow
  const p4 = await checkPermission({ tool: bashTool, input: { command: "ls -la" } });
  console.log("Bash ls 权限:", p4.behavior, "→", p4.reason);
})();