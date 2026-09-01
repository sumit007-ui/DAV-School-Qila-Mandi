import imageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from '../env'

const imageBuilder = imageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: any) => {
  if (!source || (!source.asset && !source._ref && typeof source !== 'string')) {
    return null
  }
  return imageBuilder.image(source).auto('format').fit('max')
}

export const getSanityImageUrl = (source: any, fallback: string = ''): string => {
  if (!source) return fallback
  if (typeof source === 'string' && source.startsWith('http')) return source
  try {
    const url = urlForImage(source)?.url()
    return url || fallback
  } catch {
    return fallback
  }
}
