// backend/src/services/rag/ingest.ts
import 'dotenv/config'
import { Index as UpstashIndex } from '@upstash/vector'
import { parse } from 'csv-parse/sync'
import fs from 'fs'
import path from 'path'
import ora from 'ora'


// Initialize Upstash Vector client
const index = new UpstashIndex({
    url: process.env.UPSTASH_VECTOR_REST_URL as string,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN as string,
  })


// función para indexar los datos del archivo de newMegaGymDatasetcsv
export async function indexGymExercises() {

  const spinner = ora('Reading gym exercises...').start()

  // Read and parse CSV file
  const csvPath = path.join(process.cwd(), 'src/services/rag/newMegaGymDataset.csv')
  const csvData = fs.readFileSync(csvPath, 'utf-8')
  const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true,
  })

  spinner.text = 'Starting gym exercises indexing...'
  // Index each movie
  for (const exercise of records) {
    spinner.text = `Indexing exercise: ${exercise.Title}`
    const text = `${exercise.Title}. ${exercise.Desc}. ${exercise.Level}`

    try {
      await index.upsert({
        id: exercise.Title, // Using Rank as unique ID
        data: text, // Text will be automatically embedded
        metadata: {
          title: exercise.Title,
          type: exercise.Type,
          bodyPart: exercise.BodyPart,
          equipment: exercise.Equipment,
          level: exercise.Level,
        },
      })
    } catch (error) {
      spinner.fail(`Error indexing exercise ${exercise.Title}`)
      console.error(error)
      process.exit(1);
    }
  }

  spinner.succeed('Finished indexing exercise data')

}


indexGymExercises()