import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import carritoService from '../shared/services/carrito.service'
import type { CartItem, CartResponse } from '../types/cart/cart.schema'
import useAuthContext from './AuthContext'

interface CartState {
  items: CartItem[]
  total: number
  isLoading: boolean
  refresh: () => Promise<void>
  addToCart: (params: { id_variante: number; cantidad?: number; ingredientes?: { id_ingrediente: number; accion?: string; posicion?: string }[] }) => Promise<void>
  updateQuantity: (id_carrito: number, cantidad: number) => Promise<void>
  removeItem: (id_carrito: number) => Promise<void>
  clearCart: () => Promise<void>
}

const CartContext = createContext<CartState | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthContext()
  const [items, setItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const loadCart = useCallback(async () => {
    if (!user?.id_usuario) {
      setItems([])
      setTotal(0)
      return
    }
    setIsLoading(true)
    try {
      const data = (await carritoService.getByCliente(user.id_usuario)) as CartResponse
      setItems(data.items || [])
      setTotal(Number(data.totals?.total || 0))
    } catch (error) {
      console.error('Error loading cart', error)
      toast.error('No se pudo cargar el carrito')
    } finally {
      setIsLoading(false)
    }
  }, [user?.id_usuario])

  useEffect(() => {
    void loadCart()
  }, [loadCart])

  const addToCart = useCallback(
    async ({ id_variante, cantidad = 1, ingredientes = [] }: { id_variante: number; cantidad?: number; ingredientes?: { id_ingrediente: number; accion?: string; posicion?: string }[] }) => {
      if (!user?.id_usuario) {
        toast.error('Inicia sesión para agregar al carrito')
        return
      }
      try {
        await carritoService.addItem({
          id_cliente: user.id_usuario,
          id_variante,
          cantidad,
          ingredientes,
        })
        toast.success('Producto agregado al carrito')
        await loadCart()
      } catch (error) {
        console.error('Error al agregar al carrito', error)
        toast.error('No se pudo agregar al carrito')
      }
    },
    [loadCart, user?.id_usuario]
  )

  const updateQuantity = useCallback(
    async (id_carrito: number, cantidad: number) => {
      if (!user?.id_usuario) return
      try {
        await carritoService.updateItem(id_carrito, { cantidad })
        await loadCart()
      } catch (error) {
        console.error('Error al actualizar cantidad', error)
        toast.error('No se pudo actualizar la cantidad')
      }
    },
    [loadCart, user?.id_usuario]
  )

  const removeItem = useCallback(
    async (id_carrito: number) => {
      if (!user?.id_usuario) return
      try {
        await carritoService.removeItem(id_carrito)
        await loadCart()
      } catch (error) {
        console.error('Error al eliminar del carrito', error)
        toast.error('No se pudo eliminar el ítem')
      }
    },
    [loadCart, user?.id_usuario]
  )

  const clearCart = useCallback(async () => {
    if (!user?.id_usuario) return
    try {
      await carritoService.clear(user.id_usuario)
      await loadCart()
    } catch (error) {
      console.error('Error al limpiar carrito', error)
      toast.error('No se pudo limpiar el carrito')
    }
  }, [loadCart, user?.id_usuario])

  const value = useMemo(
    () => ({ items, total, isLoading, refresh: loadCart, addToCart, updateQuantity, removeItem, clearCart }),
    [items, total, isLoading, loadCart, addToCart, updateQuantity, removeItem, clearCart]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
