import { connectDB, mongoose } from '../src/config/database';
import { Exercise } from '../src/models/Exercise';

describe('Modelo de Ejercicio', () => {

beforeAll(async () => {
  await connectDB();
  // 🔥 Elimina la colección para que los índices se recreen desde cero
  try {
    await connectDB();
  } catch (err) {
    console.log('La colección no existía, todo bien.');
  }
  // 🔄 Fuerza la creación de los índices
//  await Exercise.syncIndexes();
});


  beforeEach(async () => {
    // Limpia la colección de ejercicios antes de cada prueba
    await Exercise.deleteMany({});
  });

  afterAll(async () => {
    if (mongoose.connection.readyState === 1) {
      console.log('🔒 Cerrando conexión a MongoDB...');
      await mongoose.connection.close();
      console.log('✅ Conexión cerrada');
    }
  });

  it('debería crear un nuevo ejercicio correctamente', async () => {
    const exerciseData = {
      name: 'Sentadillas con barra',
      muscleGroup: 'Piernas',
      equipment: 'Barra',
      difficulty: 'Media',
      description: 'Ejercicio clásico para fortalecer las piernas y glúteos.',
    };

    const newExercise = new Exercise(exerciseData);
    const savedExercise = await newExercise.save();

    expect(savedExercise._id).toBeDefined();
    expect(savedExercise.name).toBe(exerciseData.name);
    expect(savedExercise.muscleGroup).toBe(exerciseData.muscleGroup);
  });

  it('debería fallar si el ejercicio ya existe (duplicado en name + description)', async () => {
    const duplicateData = {
      name: 'Press banca',
      muscleGroup: 'Pecho',
      equipment: 'Banco y barra',
      difficulty: 'Alta',
      description: 'Ejercicio clásico de pecho', // <- parte del índice único
    };

    // Crea el primero sin problema
    await Exercise.create(duplicateData);

    // Intenta crear el duplicado exacto
    try {
      await Exercise.create(duplicateData);
      throw new Error('El ejercicio duplicado no lanzó error como se esperaba');
    } catch (error: any) {
      // Verifica error de clave duplicada de MongoDB
      expect(error.code).toBe(11000);
      expect(error.message).toMatch(/duplicate key/);
    }
  });

  it('debería fallar si falta un campo obligatorio (name)', async () => {
    const invalidData = {
      name: '', // Campo obligatorio vacío
      muscleGroup: 'Espalda',
      equipment: 'Mancuernas',
      difficulty: 'Alta',
      description: 'Ejercicio para trabajar la espalda.',
    };

    try {
      const exercise = new Exercise(invalidData);
      await exercise.save();
      throw new Error('El ejercicio sin nombre no lanzó error como se esperaba');
    } catch (error: any) {
      expect(error.name).toBe('ValidationError');
      expect(error.errors.name).toBeDefined();
    }
  });
});
