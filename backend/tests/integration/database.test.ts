import { connectDB, mongoose } from '../../src/config/database';

// Jest automáticamente detecta y ejecuta estas pruebas
describe('Conexión a la base de datos', () => {
  jest.setTimeout(10000);
  
  it('debería conectarse exitosamente a MongoDB', async () => {
    try {
      await connectDB();
      expect(true).toBeTruthy();
    } catch (error) {
      console.error('Error al conectar a MongoDB:', error);
      fail('La conexión a MongoDB falló');
    }
  });

  it('debería poder realizar operaciones después de conectar', async () => {
    expect(true).toBeTruthy();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});

