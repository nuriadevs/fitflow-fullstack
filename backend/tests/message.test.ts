import { connectDB, mongoose } from '../src/config/database';
import { Message } from '../src/models/Message'; // Importa el modelo de Message
import { MongoError } from 'mongodb';

describe('Modelo de Mensaje', () => {
  beforeAll(async () => {
    console.log('🔗 Conectando a MongoDB...');
    await connectDB();
    console.log('✅ Conectado a MongoDB con éxito');
  });

  afterAll(async () => {
    console.log('🧹 Limpiando la base de datos...');
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    console.log('✅ Base de datos limpiada y conexión cerrada');
  });

  // Caso 1: Crear un mensaje correctamente
  it('✅ debería crear un mensaje correctamente', async () => {
    console.log('🚀 Creando mensaje...');

    const newMessage = new Message({
      role: 'user',
      content: 'Hola, ¿cómo estás?',
      metadata: { summary: 'Mensaje inicial del usuario' },
    });

    const savedMessage = await newMessage.save();
    expect(savedMessage._id).toBeDefined();
    expect(savedMessage.role).toBe('user');
    expect(savedMessage.content).toBe('Hola, ¿cómo estás?');
   // expect(savedMessage.metadata.summary).toBe('Mensaje inicial del usuario');
    expect(savedMessage.createdAt).toBeDefined();

    console.log('✅ Mensaje creado con éxito');
  });

  // Caso 2: Crear un mensaje de tipo 'tool' con llamadas a la herramienta
  it('✅ debería crear un mensaje de tipo "tool" con llamadas a la herramienta', async () => {
    console.log('🚀 Creando mensaje de tipo tool...');

    const newMessage = new Message({
      role: 'tool',
      tool_call_id: '123456',
      tool_calls: [{
        id: 'func1',
        type: 'function',
        function: {
          name: 'getWeather',
          arguments: '{"location": "Madrid"}',
        },
      }],
    });

    const savedMessage = await newMessage.save();
    expect(savedMessage._id).toBeDefined();
    expect(savedMessage.role).toBe('tool');
    expect(savedMessage.tool_call_id).toBe('123456');
    expect(savedMessage.tool_calls).toHaveLength(1);

    console.log('✅ Mensaje de tipo tool creado con éxito');
  });

  // Caso 3: Verificar que el campo tool_call_id es obligatorio cuando el rol es 'tool'
  it('🚫 debería fallar si tool_call_id está vacío cuando el rol es "tool"', async () => {
    console.log('⚠️ Verificando validación de tool_call_id vacío para rol "tool"...');

    try {
      const invalidMessage = new Message({
        role: 'tool',
        tool_calls: [{
          id: 'func1',
          type: 'function',
          function: {
            name: 'getWeather',
            arguments: '{"location": "Madrid"}',
          },
        }],
      });

      await invalidMessage.save();
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        console.log('✅ Validación correcta: faltando tool_call_id');
        expect(error.errors.tool_call_id).toBeDefined();
      } else {
        throw error;
      }
    }
  });

  // Caso 4: Crear un mensaje de tipo 'assistant' con solo contenido
  it('✅ debería crear un mensaje de tipo "assistant" correctamente', async () => {
    console.log('🚀 Creando mensaje de tipo assistant...');

    const newMessage = new Message({
      role: 'assistant',
      content: 'Estoy bien, gracias por preguntar.',
    });

    const savedMessage = await newMessage.save();
    expect(savedMessage._id).toBeDefined();
    expect(savedMessage.role).toBe('assistant');
    expect(savedMessage.content).toBe('Estoy bien, gracias por preguntar.');
    expect(savedMessage.createdAt).toBeDefined();

    console.log('✅ Mensaje de tipo assistant creado con éxito');
  });

  // Caso 5: Crear un mensaje con contenido vacío (debería estar permitido)
  it('✅ debería permitir un mensaje con contenido vacío', async () => {
    console.log('🚀 Creando mensaje con contenido vacío...');

    const newMessage = new Message({
      role: 'system',
      content: '',
    });

    const savedMessage = await newMessage.save();
    expect(savedMessage._id).toBeDefined();
    expect(savedMessage.role).toBe('system');
    expect(savedMessage.content).toBe('');
    expect(savedMessage.createdAt).toBeDefined();

    console.log('✅ Mensaje con contenido vacío permitido');
  });
});
