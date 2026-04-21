export interface TextBlock {
  type: "text";
  text: string;
}

export interface ToolUseBlock {
  type: "tool_use";
  id: string;
  name: string;
  input: Record<string, unknown>;
}

export interface ToolResultBlock {
  type: "tool_result";
  tool_use_id: string;
  content: string | ContentBlock[];
  is_error?: boolean;
}

export type ContentBlock = TextBlock | ToolUseBlock | ToolResultBlock;

export interface UserMessage {
    role: "user";
    content: string | ContentBlock[];
}

export interface AssistantMessage {
    role: "assistant";
    content: string | ContentBlock[];
}


export interface Usage {
    input_tokens: number;
    output_tokens: number;
    cache_creation_input_tokens?: number;
    cache_read_input_tokens?: number
}

export interface StreamTextEvent {
  type: "text";
  text: string;
}

export interface StreamToolUseStartEvent {
    type: "tool_use_start";
    id: string;
    name: string;
}

export interface StreamToolUseInputEvent {
    type: "tool_use_input";
    id: String;
    partial_json: string;
}

export interface StreamMessageStartEvent {
    type: "message_start";
    messageId: string;
}

export interface StreamMessageDoneEvent {
    type: "message_done";
    stopReason: string;
    usage: Usage;
}

export interface StreamErrorEvent {
    type: "error";
    error: string;
}   

export type StreamEvent = 
StreamTextEvent 
| StreamToolUseStartEvent 
| StreamToolUseInputEvent //JSON碎片
| StreamMessageStartEvent
| StreamMessageDoneEvent
| StreamToolUseInputEvent
| StreamErrorEvent;