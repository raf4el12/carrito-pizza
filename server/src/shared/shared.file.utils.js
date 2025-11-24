import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const deleteFile = async (filePath) => {
  if (!filePath) return false

  try {

    const cleanPath = filePath.replace(/^\/uploads\//, '')
    const fullPath = path.join(__dirname, '../../uploads', cleanPath)


    if (fs.existsSync(fullPath)) {
      await fs.promises.unlink(fullPath)
      return true
    }

    return false
  } catch (error) {
    console.error('Error eliminando archivo:', error)
    return false
  }
}


export const isValidUploadPath = (filePath) => {
  if (!filePath) return false

  const cleanPath = filePath.replace(/^\/uploads\//, '')
  const fullPath = path.join(__dirname, '../../uploads', cleanPath)
  const uploadsDir = path.join(__dirname, '../../uploads')

  return fullPath.startsWith(uploadsDir)
}
