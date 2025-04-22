import { Index as UpstashIndex } from '@upstash/vector'

// Initialize Upstash Vector client
const index = new UpstashIndex({
    url: process.env.UPSTASH_VECTOR_REST_URL as string,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN as string,
  })


type ExerciseMetadata = {
    title?: string;
    type?: string;
    bodyPart?: string;
    equipment?: string;
    level?: string;
}


export const queryGymExercises = async (
    query: string,
    filters?: Partial<ExerciseMetadata>,
    topK: number = 5
) => {
      // Build filter string if filters provided
  let filterStr = ''
  if (filters) {
    const filterParts = Object.entries(filters)
     .filter(([_, value]) => value !== undefined && value !== '')
     .map(([key, value]) => {
      console.log(`Processing filter: ${key}=${value}`)
      // Asegurarse de que el valor esté en minúsculas y sin espacios extra
      const cleanValue = value.toString().toLowerCase().trim()
      return `${key}='${cleanValue}'`
    })

    if (filterParts.length > 0) {
      filterStr = filterParts.join(' AND ')
    }
  }


  try {
    // Intentar la búsqueda con los parámetros proporcionados
    let results = await index.query({
      data: query,
      topK,
      filter: filterStr || undefined,
      includeMetadata: true,
      includeData: true,
    })

    // Si no hay resultados y hay filtros, intentar sin ellos
    if ((!results || results.length === 0) && filterStr) {
      results = await index.query({
        data: query,
        topK,
        includeMetadata: true,
        includeData: true,
      })
    }

    // Si aún no hay resultados, intentar con una búsqueda más amplia
    if (!results || results.length === 0) {
      const broaderQuery = `${query} exercise`
      results = await index.query({
        data: broaderQuery,
        topK,
        includeMetadata: true,
        includeData: true,
      })
    }

    // Eliminar duplicados basados en el título
    if (results && results.length > 0) {
      const uniqueResults = [];
      const seenTitles = new Set();
      
      for (const result of results) {
        const title = result.metadata?.title;
        if (title && !seenTitles.has(title)) {
          seenTitles.add(title);
          uniqueResults.push(result);
        }
      }
      
      results = uniqueResults;
    }

    return results
  } catch (error) {
    console.error('Error querying exercises:', error)
    throw error
  }
}



