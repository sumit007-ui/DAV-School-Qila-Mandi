import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes/index'
import { projectId, dataset } from './env'

export const sanityConfig = defineConfig({
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

export default sanityConfig
