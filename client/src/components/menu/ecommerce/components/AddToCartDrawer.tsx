import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import toast from 'react-hot-toast'
import { Product } from '../../../../types/pruducts/products.schema'
import { useSizes } from '../../../../hook/sizes/useSizes'
import { useMasaTypes } from '../../../../hook/masa-types/useMasaTypes'
import { useIngredients } from '../../../../hook/ingredients/useIngredients'
import { useVariants } from '../../../../hook/variants/useVariants'
import variantsService from '../../../../shared/services/variants.service'
import { useCart } from '../../../../context/CartContext'

interface AddToCartDrawerProps {
  open: boolean
  onClose: () => void
  product: Product
}

const AddToCartDrawer = ({ open, onClose, product }: AddToCartDrawerProps) => {
  const { addToCart } = useCart()
  const { data: sizes } = useSizes()
  const { data: masaTypes } = useMasaTypes()
  const { data: ingredients } = useIngredients()
  const { data: variants, refetch: refetchVariants } = useVariants()

  const [selectedSize, setSelectedSize] = useState<number | ''>('')
  const [selectedMasa, setSelectedMasa] = useState<number | null>(null)
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([])
  const [cantidad, setCantidad] = useState(1)
  const [loading, setLoading] = useState(false)

  // Prefill first available size when drawer opens
  useEffect(() => {
    if (open && sizes?.length && selectedSize === '') {
      setSelectedSize(sizes[0].id_tamano)
    }
  }, [open, sizes, selectedSize])

  const sizePrice = useMemo(() => {
    const size = sizes?.find((s) => s.id_tamano === selectedSize)
    if (size) return Number(size.precio_base || 0)
    return product.precio_base ? Number(product.precio_base) : 0
  }, [sizes, selectedSize, product.precio_base])

  const masaExtra = useMemo(() => {
    if (!selectedMasa) return 0
    const masa = masaTypes?.find((m) => m.id_tipo_masa === selectedMasa)
    return masa ? Number(masa.precio_adicional || 0) : 0
  }, [masaTypes, selectedMasa])

  const ingredientesExtra = useMemo(() => {
    if (!selectedIngredients.length) return 0
    return selectedIngredients.reduce((acc, id) => {
      const ing = ingredients?.find((i) => i.id_ingrediente === id)
      return acc + Number(ing?.precio_adicional || 0)
    }, 0)
  }, [ingredients, selectedIngredients])

  const unitPrice = useMemo(() => sizePrice + masaExtra + ingredientesExtra, [sizePrice, masaExtra, ingredientesExtra])
  const totalPrice = useMemo(() => unitPrice * cantidad, [unitPrice, cantidad])

  const toggleIngredient = (id: number) => {
    setSelectedIngredients((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const findExistingVariant = () => {
    if (!variants) return null
    return (
      variants.find(
        (v) =>
          v.id_producto === product.id_producto &&
          v.id_tamano === selectedSize &&
          (v.id_tipo_masa ?? null) === (selectedMasa ?? null)
      ) || null
    )
  }

  const handleSubmit = async () => {
    if (!selectedSize) {
      toast.error('Selecciona un tamaño')
      return
    }
    setLoading(true)
    try {
      let variant = findExistingVariant()

      if (!variant) {
        const sku = `VAR-${product.id_producto}-${selectedSize}-${selectedMasa ?? 'base'}`
        variant = await variantsService.create({
          id_producto: product.id_producto,
          id_tamano: Number(selectedSize),
          id_tipo_masa: selectedMasa ?? null,
          precio_base: unitPrice,
          sku,
          activo: true,
        })
        await refetchVariants()
      }

      const ingredientesPayload = selectedIngredients.map((id) => ({
        id_ingrediente: id,
        accion: 'extra',
        posicion: 'completa',
      }))

      await addToCart({
        id_variante: variant.id_variante,
        cantidad,
        ingredientes: ingredientesPayload,
      })
      toast.success('Agregado al carrito')
      onClose()
      setCantidad(1)
      setSelectedIngredients([])
    } catch (error) {
      console.error(error)
      toast.error('No se pudo agregar al carrito')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 420, md: 520 },
          p: 3,
          borderTopLeftRadius: { xs: 16, sm: 0 },
          borderBottomLeftRadius: 16,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <div>
          <Typography variant="h6" fontWeight={700}>{product.nombre}</Typography>
          <Typography variant="body2" color="text.secondary">Arma tu pizza antes de agregar</Typography>
        </div>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Stack spacing={2} sx={{ pb: 2, overflowY: 'auto' }}>
        <FormControl fullWidth>
          <InputLabel id="size-select-label">Tamaño</InputLabel>
          <Select
            labelId="size-select-label"
            label="Tamaño"
            value={selectedSize}
            onChange={(e) => setSelectedSize(Number(e.target.value))}
          >
            {sizes?.map((s) => (
              <MenuItem key={s.id_tamano} value={s.id_tamano}>
                <ListItemText primary={s.nombre} secondary={`S/ ${Number(s.precio_base).toFixed(2)}`} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="masa-select-label">Masa</InputLabel>
          <Select
            labelId="masa-select-label"
            label="Masa"
            value={selectedMasa ?? ''}
            onChange={(e) => setSelectedMasa(e.target.value === '' ? null : Number(e.target.value))}
            displayEmpty
          >
            <MenuItem value="">
              <em>Sin masa especial</em>
            </MenuItem>
            {masaTypes?.map((m) => (
              <MenuItem key={m.id_tipo_masa} value={m.id_tipo_masa}>
                <ListItemText primary={m.nombre} secondary={`+ S/ ${Number(m.precio_adicional).toFixed(2)}`} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div>
          <Typography variant="subtitle2" gutterBottom>Ingredientes extra</Typography>
          <Stack direction="row" gap={1} flexWrap="wrap">
            {ingredients?.map((ing) => {
              const checked = selectedIngredients.includes(ing.id_ingrediente)
              return (
                <Button
                  key={ing.id_ingrediente}
                  variant={checked ? 'contained' : 'outlined'}
                  onClick={() => toggleIngredient(ing.id_ingrediente)}
                  size="small"
                >
                  <Checkbox size="small" checked={checked} sx={{ p: 0.5 }} />
                  <ListItemText
                    primary={ing.nombre}
                    secondary={`+ S/ ${Number(ing.precio_adicional).toFixed(2)}`}
                  />
                </Button>
              )
            })}
          </Stack>
        </div>

        <Divider />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" gap={1}>
            <IconButton onClick={() => setCantidad(Math.max(1, cantidad - 1))}>
              <RemoveIcon />
            </IconButton>
            <Typography>{cantidad}</Typography>
            <IconButton onClick={() => setCantidad(cantidad + 1)}>
              <AddIcon />
            </IconButton>
          </Stack>
          <div className="text-right">
            <Typography variant="body2" color="text.secondary">Precio unitario</Typography>
            <Typography variant="h6" fontWeight={700}>S/ {unitPrice.toFixed(2)}</Typography>
          </div>
        </Stack>

        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          disabled={loading}
          sx={{ borderRadius: 2, py: 1.5 }}
        >
          {loading ? 'Agregando...' : `Agregar por S/ ${totalPrice.toFixed(2)}`}
        </Button>
      </Stack>
    </Drawer>
  )
}

export default AddToCartDrawer
