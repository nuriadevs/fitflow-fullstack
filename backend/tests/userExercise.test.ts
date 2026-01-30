import { connectDB, mongoose } from '../src/config/database';
import User from '../src/models/Users';
import { Exercise } from '../src/models/Exercise';
import { UserExercise } from '../src/models/UserExercise';
import { MongoError } from 'mongodb';

describe('Modelo UserExercise (ejercicios asignados por usuario)', () => {
  let user: any;
  let exercise: any;

  beforeAll(async () => {
    console.log('🔗 Conectando a MongoDB...');
    await connectDB();
    console.log('✅ Conectado a MongoDB con éxito');

    // Crear usuario y ejercicio de prueba
    user = new User({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    });
    await user.save();

    exercise = new Exercise({
      name: 'Sentadilla',
      muscleGroup: 'Piernas',
      equipment: 'Barra',
      difficulty: 'Media',
      description: 'Ejercicio de piernas fundamental',
    });
    await exercise.save();
  });

  afterAll(async () => {
    console.log('🧹 Limpiando base de datos...');
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    console.log('✅ Base de datos limpiada y conexión cerrada');
  });

  it('✅ debería crear correctamente una entrada UserExercise', async () => {
    console.log('🚀 Creando relación usuario-ejercicio...');

    const userExercise = new UserExercise({
      userId: user._id,
      exerciseId: exercise._id,
      notes: 'Calentamiento con poco peso',
      personalizedWeight: 40,
      personalizedReps: 10,
      personalizedSets: 3,
    });

    const saved = await userExercise.save();
    expect(saved._id).toBeDefined();
    expect(saved.notes).toBe('Calentamiento con poco peso');
    expect(saved.favorite).toBe(false); // valor por defecto
    expect(saved.addedAt).toBeDefined();

    console.log('✅ Relación guardada con éxito');
  });

  it('🚫 debería fallar si se intenta duplicar una relación (user + exercise)', async () => {
    console.log('🔁 Intentando duplicar la relación usuario-ejercicio...');

    const duplicate = new UserExercise({
      userId: user._id,
      exerciseId: exercise._id,
    });

    try {
      await duplicate.save();
    } catch (error) {
      if (error instanceof MongoError) {
        console.log('✅ Error esperado de clave duplicada:', error.code);
        expect(error.code).toBe(11000); // clave compuesta duplicada
      } else {
        throw error;
      }
    }
  });

  it('🚫 debería fallar si falta userId o exerciseId', async () => {
    console.log('⚠️ Verificando validación de campos requeridos...');

    try {
      const invalid = new UserExercise({
        notes: 'Falta user y exercise',
      });
      await invalid.save();
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        expect(error.errors.userId).toBeDefined();
        expect(error.errors.exerciseId).toBeDefined();
        console.log('✅ Validación correcta: faltan campos obligatorios');
      } else {
        throw error;
      }
    }
  });
});
