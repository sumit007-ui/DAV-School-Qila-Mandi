import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemaTypes/index'
import { projectId, dataset } from './src/sanity/env'

export default defineConfig({
  name: 'default',
  title: 'DAV Public School Studio',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})
