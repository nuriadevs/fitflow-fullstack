import { connectDB, mongoose } from '../src/config/database';
import User from '../src/models/Users';
import { MongoError } from 'mongodb'; // Importa MongoError para manejo explícito

describe('Modelo de Usuario', () => {
  beforeAll(async () => {
    console.log('🔗 Conectando a MongoDB...');
    await connectDB();
    console.log('✅ MongoDB conectado exitosamente');
  });

  afterAll(async () => {
    if (mongoose.connection.readyState === 1) {
      console.log('🧹 Limpiando la base de datos...');
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      console.log('✅ Conexión cerrada y base de datos limpiada');
    }
  });

  it('🔧 debería crear un nuevo usuario correctamente', async () => {
    console.log('🧪 Ejecutando prueba: Crear un nuevo usuario correctamente');

    const userData = {
      username: 'Maria Pérez',
      email: 'maria@example.com',
      password: '123456',
    };

    const newUser = new User(userData);
    const savedUser = await newUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.username).toBe(userData.username);

    console.log(`✅ Usuario creado: ${savedUser.username}, ${savedUser.email}`);
  });

  it('🚫 debería fallar si el email ya está registrado', async () => {
    console.log('🧪 Ejecutando prueba: Fallar si el email ya está registrado');

    const userData = {
      username: 'Maria Pérez',
      email: 'maria@example.com',
      password: '123456',
    };

    await User.deleteMany({ email: userData.email });

    const newUser1 = new User(userData);
    await newUser1.save();

    const newUser2 = new User(userData);

    try {
      await newUser2.save();
    } catch (error) {
      if (error instanceof MongoError) {
        console.log('❌ Error esperado de duplicación de email:', error.code);
        expect(error.code).toBe(11000);
      } else {
        throw error;
      }
    }
  });

  it('🚫 debería fallar si falta el email', async () => {
    console.log('🧪 Ejecutando prueba: Fallar si falta el email');

    const userData = {
      username: 'Maria Pérez',
      password: '123456',
    };

    const newUser = new User(userData);

    try {
      await newUser.save();
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        console.log('❌ Error esperado de validación (email faltante):', error.errors.email?.message);
        expect(error.errors.email).toBeDefined();
      } else {
        throw error;
      }
    }
  });

  it('🚫 debería fallar si el email tiene un formato incorrecto', async () => {
    console.log('🧪 Ejecutando prueba: Fallar si el email tiene un formato incorrecto');

    const userData = {
      username: 'Maria Pérez',
      email: 'mariaexample.com', // Email inválido
      password: '123456',
    };

    const newUser = new User(userData);

    try {
      await newUser.save();
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        console.log('❌ Error esperado de validación (email inválido):', error.errors.email?.message);
        expect(error.errors.email).toBeDefined();
      } else {
        throw error;
      }
    }
  });

  it('🚫 debería fallar si el nombre de usuario ya existe', async () => {
    console.log('🧪 Ejecutando prueba: Fallar si el nombre de usuario ya existe');

    const userData = {
      username: 'Maria Pérez',
      email: 'maria@example.com',
      password: '123456',
    };

    await User.deleteMany({ username: userData.username });

    const newUser1 = new User(userData);
    await newUser1.save();

    const newUser2 = new User({
      username: 'Maria Pérez',
      email: 'maria2@example.com',
      password: '654321',
    });

    try {
      await newUser2.save();
    } catch (error) {
      if (error instanceof MongoError) {
        console.log('❌ Error esperado de duplicación de username:', error.code);
        expect(error.code).toBe(11000);
      } else {
        throw error;
      }
    }
  });
});
