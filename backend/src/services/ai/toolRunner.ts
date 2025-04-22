import type OpenAI from 'openai'
import { exerciseSearch, exerciseSearchToolDefinition } from './tools/exerciseSearch'



export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    userMessage,
    // Los argumentos que OpenAI envió para la función, convertidos de string a objeto
    toolArgs: JSON.parse(toolCall.function.arguments || '{}'),
  }

  switch (toolCall.function.name) {
    case exerciseSearchToolDefinition.name:
      return exerciseSearch(input)

    default:
      return `Never run this tool: ${toolCall.function.name} again, or else!`
  }
}
