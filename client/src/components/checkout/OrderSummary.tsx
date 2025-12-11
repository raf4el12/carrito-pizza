import { useCart } from '../../context/CartContext'

interface OrderSummaryProps {
    currentStep: number
}

const OrderSummary = ({ currentStep: _currentStep }: OrderSummaryProps) => {
    const { items, total } = useCart()

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Resumen de la Orden</h3>

            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => {
                    const name = item.Variante?.Producto?.nombre || 'Producto'
                    const price = item.totals?.subtotal || 0
                    const quantity = item.cantidad

                    return (
                        <div key={item.id_carrito} className="flex justify-between items-start text-sm">
                            <div className="flex gap-3">
                                <div className="w-5 h-5 bg-orange-100 text-orange-600 rounded flex items-center justify-center text-xs font-bold flex-shrink-0">
                                    {quantity}x
                                </div>
                                <span className="text-gray-700 font-medium line-clamp-2">{name}</span>
                            </div>
                            <span className="text-gray-900 font-semibold whitespace-nowrap">S/ {price.toFixed(2)}</span>
                        </div>
                    )
                })}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600 text-sm">
                    <span>Subtotal</span>
                    <span>S/ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm">
                    <span>Envío</span>
                    <span className="text-green-600 font-medium">Gratis</span>
                </div>
                <div className="flex justify-between text-gray-900 font-bold text-lg pt-2 border-t border-gray-100 mt-2">
                    <span>Total</span>
                    <span>S/ {total.toFixed(2)}</span>
                </div>
            </div>

            <div className="mt-6 bg-blue-50 p-4 rounded-xl">
                <p className="text-xs text-blue-700 leading-relaxed">
                    <span className="font-bold">Garantía de satisfacción:</span> Si tu pizza no llega caliente, ¡te devolvemos tu dinero!
                </p>
            </div>
        </div>
    )
}

export default OrderSummary
