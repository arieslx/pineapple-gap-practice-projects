import "dotenv/config"; //单独文件测试用
import Anthropic from "@anthropic-ai/sdk";

// import { DEFAULT_MODE, DEFAULT_MAX_TOKENS } from "./client.js";

export function getClient() {
  return new Anthropic({
    apiKey: process.env.ANTHROPIC_AUTH_TOKEN,
    baseURL: process.env.ANTHROPIC_BASE_URL,
  });
}

export function textBlock(text = "") {
  return {
    type: "text",
    text,
  };
}

export function toolUseBlock(id, name, input = {}) {
  return {
    type: "tool_use",
    id,
    name,
    input,
  };
}

export async function* streamMessage(params) {
  const { messages, system, tools, signals } = params;
  const client = getClient();
  const stream = client.messages.stream({
    model: process.env.ANTHROPIC_MODEL || "claude-opus-4-6",
    messages,
    max_tokens: 1000,
    stream: true,
    ...(system ? { system } : {}),
    ...(tools ? { tools } : {}),
  });

  const content = [];
  const usage = { input_tokens: 0, output_tokens: 0 };
  let stopReason = "end_turn";
  let pendingToolJson = "";

  for await (const event of stream) {
    switch (event.type) {
      case "message_start": {
        usage.input_tokens = event.message.usage?.input_tokens || 0;
        yield {
          type: "message_start",
          messageId: event.message.id,
        };
        break;
      }
      case "content_block_start": {
        if (event.content_block.type === "text") {
          content[event.index] = textBlock("");
        }

        if (event.content_block.type === "tool_use") {
          content[event.index] = toolUseBlock(
            event.content_block.id,
            event.content_block.name,
            {},
          );
          pendingToolJson = "";
          yield {
            type: "tool_use_start",
            id: event.content_block.id,
            name: event.content_block.name,
          };
        }
        break;
      }
      case "content_block_delta": {
        if (event.delta.type === "text_delta") {
          content[event.index].text += event.delta.text;
          yield {
            type: "text",
            text: event.delta.text,
          };
        }

        if (event.delta.type === "input_json_delta") {
          pendingToolJson += event.delta.partial_json;
        }
        break;
      }

      case "content_block_stop": {
        const block = content[event.index];
        if (block.type === "tool_use" && pendingToolJson) {
          block.input = JSON.parse(pendingToolJson);
          pendingToolJson = "";
        }
        break;
      }
      case "message_delta": {
        usage.output_tokens = event.usage?.output_tokens || usage.output_tokens;
        stopReason = event.delta.stop_reason || stopReason;
        break;
      }
      case "message_stop": {
        yield {
          type: "message_done",
          stopReason,
          usage: { ...usage },
        };
        break;
      }
      default:
        break;
    }
  }
  return {
    assistantMessage: {
      role: "assistant",
      content,
    },
    usage,
    stopReason,
  };
}
