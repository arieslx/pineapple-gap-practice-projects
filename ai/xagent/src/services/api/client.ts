import Anthropic from "@anthropic-ai/sdk";

export const DEFAULT_MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-4-6";

export const DEFAULT_MAX_TOKENS = 1000; //8096, todo:process.env.ANTHROPIC_MAX_TOKENS是string

let clientInstance: Anthropic | null = null;

export function getAnthropicClient(options?: { apiKey?: string; baseURL?: string }): Anthropic {
  if (clientInstance && !options) {
    return clientInstance;
  }

  const client = new Anthropic({
    apiKey: options?.apiKey ?? process.env.ANTHROPIC_AUTH_TOKEN,
    baseURL: options?.baseURL ?? process.env.ANTHROPIC_BASE_URL,
  });

  if(!options){
    clientInstance = client;
  }

  return client;
}

