import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Elimina un archivo del sistema de archivos
 * @param {string} filePath - Ruta del archivo (ej: /uploads/imagen-123.jpg)
 * @returns {Promise<boolean>} - true si se eliminó, false si no existía
 */
export const deleteFile = async (filePath) => {
  if (!filePath) return false

  try {
    // Remover el prefijo /uploads/ si existe
    const cleanPath = filePath.replace(/^\/uploads\//, '')
    const fullPath = path.join(__dirname, '../../uploads', cleanPath)

    // Verificar que el archivo existe
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

/**
 * Valida que la ruta del archivo esté dentro del directorio uploads
 * @param {string} filePath - Ruta del archivo
 * @returns {boolean}
 */
export const isValidUploadPath = (filePath) => {
  if (!filePath) return false

  const cleanPath = filePath.replace(/^\/uploads\//, '')
  const fullPath = path.join(__dirname, '../../uploads', cleanPath)
  const uploadsDir = path.join(__dirname, '../../uploads')

  // Verificar que el path no escape del directorio uploads
  return fullPath.startsWith(uploadsDir)
}
