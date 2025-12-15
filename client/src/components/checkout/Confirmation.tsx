import { FiCheckCircle, FiHome, FiShoppingBag } from 'react-icons/fi'
import { Link } from 'react-router-dom'

interface ConfirmationProps {
    orderId: number | null
    onHome: () => void
}

const Confirmation = ({ orderId, onHome }: ConfirmationProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce-slow">
                <FiCheckCircle className="w-10 h-10 text-green-600" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Pedido Confirmado!</h2>
            <p className="text-gray-500 mb-8 max-w-md">
                Gracias por tu compra. Hemos recibido tu pedido #{orderId} y ya estamos preparando tus deliciosas pizzas.
            </p>

            <div className="bg-gray-50 p-6 rounded-2xl max-w-sm w-full mb-8 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2">¿Qué sigue?</h4>
                <ul className="text-sm text-gray-600 space-y-2 text-left">
                    <li className="flex items-start gap-2">
                        <span className="w-5 h-5 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                        Confirmación enviada a tu correo
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="w-5 h-5 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                        Preparación en cocina (~15 min)
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="w-5 h-5 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                        En camino a tu dirección (~20 min)
                    </li>
                </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={onHome}
                    className="bg-gray-900 hover:bg-black text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                    <FiHome /> Volver al Inicio
                </button>
                <Link
                    to="/menu"
                    className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 font-semibold py-3 px-8 rounded-xl transition-all hover:shadow-md flex items-center justify-center gap-2"
                >
                    <FiShoppingBag /> Seguir Comprando
                </Link>
            </div>
        </div>
    )
}

export default Confirmation
