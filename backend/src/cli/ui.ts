import ora from 'ora';
import { AIMessage } from '../types/types';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
  prompt: '\x1b[36m[TÚ]\x1b[0m '
});

// Manejar Ctrl+C
process.on('SIGINT', () => {
  console.log('\n\n¡Hasta luego! Gracias por chatear conmigo.');
  closeUI();
  process.exit(0);
});

export const question = (): Promise<string> => {
  return new Promise((resolve) => {
    rl.prompt();
    rl.once('line', (line) => {
      resolve(line.trim());
    });
  });
};

export const closeUI = () => {
  rl.close();
  process.stdin.destroy();
};

export const showLoader = (text: string) => {
  const spinner = ora({
    text,
    color: 'cyan',
    spinner: 'dots'
  }).start()

  return {
    stop: () => spinner.stop(),
    succeed: (text?: string) => spinner.succeed(text),
    fail: (text?: string) => spinner.fail(text),
    update: (text: string) => (spinner.text = text),
  }
}

export const logMessage = (message: AIMessage) => {
  const roleColors = {
    user: '\x1b[36m', // cyan
    assistant: '\x1b[32m', // green
    tool: '\x1b[33m', // yellow
  }

  const reset = '\x1b[0m'
  const role = message.role
  const color = roleColors[role as keyof typeof roleColors] || '\x1b[37m' // default to white

  // Log all messages with their role
  console.log(`\n${color}[${role.toUpperCase()}]${reset}`)
  
  // Log content if exists
  if (message.content) {
    console.log(`${message.content}\n`)
  }

  // Log tool calls if exists
  if ('tool_calls' in message && message.tool_calls) {
    message.tool_calls.forEach((tool) => {
      console.log(`${color}Tool Call:${reset} ${tool.function.name}`)
      console.log(`${color}Arguments:${reset} ${JSON.stringify(tool.function.arguments, null, 2)}\n`)
    })
  }
}

export const logError = (error: any) => {
  console.error('\x1b[31m[ERROR]\x1b[0m', error)
}

export const logSuccess = (message: string) => {
  console.log('\x1b[32m[SUCCESS]\x1b[0m', message)
}

export const startInteractiveChat = async (onMessage: (message: string) => Promise<void>) => {
  console.log('\n¡Bienvenido! Puedes chatear conmigo.');
  console.log('Para terminar la conversación, escribe: "adiós", "exit", "salir" o "hasta luego"');
  console.log('También puedes usar Ctrl+C para salir en cualquier momento.\n');

  const exitCommands = ['adiós', 'exit', 'salir', 'hasta luego'];

  while (true) {
    try {
      const userMessage = await question();
      
      if (!userMessage) continue; // Ignorar líneas vacías
      
      if (exitCommands.includes(userMessage.toLowerCase())) {
        console.log('\n¡Hasta luego! Gracias por chatear conmigo.');
        break;
      }

      await onMessage(userMessage);
    } catch (error) {
      console.error('\nError al procesar el mensaje:', error);
      continue;
    }
  }
}
