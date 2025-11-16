import Envs from '../envs'

const ABSOLUTE_URL_REGEX = /^https?:\/\//i
const UPLOADS_PREFIX_REGEX = /^uploads[\\/]/i

export const resolveImageUrl = (url?: string | null) => {
  if (!url) return ''
  const normalized = url.replace(/\\/g, '/')
  if (normalized.startsWith('data:') || normalized.startsWith('blob:')) return normalized
  if (ABSOLUTE_URL_REGEX.test(normalized)) return normalized
  if (normalized.startsWith('/')) {
    return `${Envs.VITE_API_BACKEND_URL}${normalized}`
  }
  if (UPLOADS_PREFIX_REGEX.test(normalized)) {
    return `${Envs.VITE_API_BACKEND_URL}/${normalized}`
  }
  return normalized
}


