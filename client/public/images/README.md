# 📸 Guía para Agregar Imágenes

## Estructura de Carpetas

Coloca tus imágenes en las siguientes carpetas según su uso:

### 📍 `hero/` - Imagen principal del hero
- **Archivo**: `hero-pizza.jpg` (o .png, .webp)
- **Tamaño recomendado**: 1920x1080px
- **Descripción**: Imagen de fondo para el hero del home

### 🍕 `pizzas/` - Imágenes de pizzas del menú
- **Archivos**: `pizza-pepperoni.jpg`, `pizza-vegetarian.jpg`, etc.
- **Tamaño recomendado**: 800x600px
- **Descripción**: Fotos de las pizzas destacadas

### 👤 `testimonials/` - Fotos de clientes
- **Archivos**: `customer-1.jpg`, `customer-2.jpg`, etc.
- **Tamaño recomendado**: 200x200px (fotos de perfil cuadradas)
- **Descripción**: Avatares de clientes para testimonios

## ¿Cómo Agregar Imágenes?

1. Coloca tus archivos en la carpeta correspondiente
2. Las rutas en el código ya están configuradas, solo necesitas nombrar los archivos correctamente
3. Formatos soportados: `.jpg`, `.jpeg`, `.png`, `.webp`

## Ejemplo de Uso

Si colocas un archivo `hero-pizza.jpg` en `hero/`, automáticamente será accesible en:
- URL: `http://localhost:5173/images/hero/hero-pizza.jpg`
- Código: Ya configurado en `Main.tsx`

## Nota Importante

Si las imágenes no se muestran:
1. Verifica que los nombres de archivo coincidan exactamente
2. Revisa que estén en la carpeta `public/` y no en `src/`
3. Las rutas deben empezar con `/images/...` para archivos en `public`

