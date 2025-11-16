export const isValidHttpUrl = (value) => {
  if (!value || typeof value !== 'string') return false
  try {
    const url = new URL(value.trim())
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}


