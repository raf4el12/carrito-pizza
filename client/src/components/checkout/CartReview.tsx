import { useCart } from '../../context/CartContext'
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi'
import { Link } from 'react-router-dom'

interface CartReviewProps {
    onNext: () => void
}

const CartReview = ({ onNext }: CartReviewProps) => {
    const { items, updateQuantity, removeItem, isLoading } = useCart()

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
                <p>Cargando tu carrito...</p>
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-center px-6">
                <div className="bg-orange-50 p-6 rounded-full mb-6">
                    <FiShoppingBag className="w-12 h-12 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h3>
                <p className="text-gray-500 mb-8 max-w-md">
                    Parece que aún no has agregado ninguna de nuestras deliciosas pizzas.
                </p>
                <Link
                    to="/menu"
                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors shadow-lg shadow-orange-200"
                >
                    Explorar el Menú
                </Link>
            </div>
        )
    }

    return (
        <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Revisa tu pedido</h2>
                <span className="text-sm text-gray-500 font-medium">{items.length} productos</span>
            </div>

            <div className="space-y-6">
                {items.map((item) => {
                    const name = item.Variante?.Producto?.nombre || 'Producto desconocido'
                    const image = item.Variante?.Producto?.imagen_url || 'https://placehold.co/120x120?text=Pizza'
                    const tamano = item.Variante?.Tamano?.nombre
                    const masa = item.Variante?.Tipo_Masa?.nombre
                    const price = item.totals?.unit || 0
                    const subtotal = item.totals?.subtotal || 0
                    const ingredients = item.Ingredientes || []

                    return (
                        <div
                            key={item.id_carrito}
                            className="group flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                        >
                            <div className="relative overflow-hidden rounded-lg w-full sm:w-32 h-32 shrink-0">
                                <img
                                    src={image}
                                    alt={name}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg font-bold text-gray-900 leading-tight">{name}</h3>
                                        <button
                                            onClick={() => removeItem(item.id_carrito)}
                                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                            title="Eliminar producto"
                                        >
                                            <FiTrash2 className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="mt-1 flex flex-wrap gap-2 text-sm text-gray-600">
                                        {tamano && <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium">{tamano}</span>}
                                        {masa && <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium">{masa}</span>}
                                    </div>

                                    {ingredients.length > 0 && (
                                        <div className="mt-2 text-xs text-gray-500">
                                            <span className="font-medium">Extras:</span>{' '}
                                            {ingredients.map(ing => ing.Ingrediente?.nombre).join(', ')}
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between items-end mt-4">
                                    <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm">
                                        <button
                                            onClick={() => updateQuantity(item.id_carrito, Math.max(1, item.cantidad - 1))}
                                            className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-l-lg transition-colors"
                                            disabled={item.cantidad <= 1}
                                        >
                                            <FiMinus className="w-4 h-4" />
                                        </button>
                                        <span className="w-10 text-center font-semibold text-gray-900">{item.cantidad}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id_carrito, item.cantidad + 1)}
                                            className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-r-lg transition-colors"
                                        >
                                            <FiPlus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="text-right">
                                        <div className="text-xs text-gray-500">S/ {price.toFixed(2)} c/u</div>
                                        <div className="text-lg font-bold text-orange-600">S/ {subtotal.toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-4">
                <button
                    onClick={onNext}
                    className="w-full sm:w-auto bg-gray-900 hover:bg-black text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                    Continuar a la Entrega
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default CartReview
