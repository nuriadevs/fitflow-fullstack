import { z } from 'zod'
import type { ToolFn } from '../../../types/types'
import { queryGymExercises } from '../../rag/query'

// Función para buscar ejercicios en herramienta
export const exerciseSearchToolDefinition = {
  name: 'exerciseSearch',
  parameters: z.object({
      query: z.string().describe('The search query for finding exercises'),
      level: z.string().optional().describe('The level of difficulty of the exercises'),
      bodyPart: z.string().optional().describe('The body part the exercise targets'),
  }),
  description: 'Searches for exercises and information about them, including title, type, bodypart, equipment,level, and desc. Use this to answer questions about exercises.',
}

type Args = z.infer<typeof exerciseSearchToolDefinition.parameters>

// Función para buscar ejercicios
export const exerciseSearch: ToolFn<Args, string> = async ({ toolArgs }) => {
  const { query, level, bodyPart } = toolArgs
  
  // Limpiar y normalizar los filtros
  const filters = {
    ...(level && { level: level.toString().toLowerCase().trim() }),
    ...(bodyPart && { bodyPart: bodyPart.toString().toLowerCase().trim() }),
  }
  
  let results
  try {
    results = await queryGymExercises(query, filters)
    
    if (!results || results.length === 0) {
      if (Object.keys(filters).length > 0) {
        results = await queryGymExercises(query)
      }
      
      if (!results || results.length === 0) {
        return JSON.stringify({
          error: "No exercises found",
          query,
          filters,
          message: "Try searching with different keywords or removing some filters"
        })
      }
    }
    
    // Limitar a un máximo de 3 resultados
    const limitedResults = results.slice(0, 3);
    
    // Transformar los resultados sin guardarlos
    const exercises = limitedResults.map(result => ({
      name: result.metadata?.title || '',
      type: result.metadata?.type || 'strength',
      muscleGroup: result.metadata?.bodyPart || '',
      equipment: result.metadata?.equipment || '',
      difficulty: result.metadata?.level || '',
      description: result.data || '',
      source: 'upstash'
    })).filter(exercise => 
      exercise.name && 
      exercise.muscleGroup && 
      exercise.equipment && 
      exercise.difficulty && 
      exercise.description
    );
    
    return JSON.stringify({
      message: "",
      exercises: exercises
    }, null, 2)
  } catch (error) {
    console.error('Error in exerciseSearch:', error)
    return JSON.stringify({
      error: 'Failed to search for exercises',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}