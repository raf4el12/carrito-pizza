import { useState } from 'react'
import { FiShoppingCart, FiMapPin, FiCreditCard, FiCheckCircle } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import CartReview from './CartReview'
import DeliveryForm from './DeliveryForm'
import PaymentMethod from './PaymentMethod'
import OrderSummary from './OrderSummary'
import Confirmation from './Confirmation'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import pedidosService from '../../shared/services/pedidos.service'
import useAuthContext from '../../context/AuthContext'
import type { DeliveryData } from '../../types/checkout/checkout.schema'

const steps = [
    { id: 1, title: 'Carrito', icon: FiShoppingCart },
    { id: 2, title: 'Entrega', icon: FiMapPin },
    { id: 3, title: 'Pago', icon: FiCreditCard },
    { id: 4, title: 'Confirmación', icon: FiCheckCircle },
]

const CheckoutFlow = () => {
    const [currentStep, setCurrentStep] = useState(1)
    const { items, total, refresh } = useCart()
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const [deliveryData, setDeliveryData] = useState<DeliveryData>({
        address: '',
        notes: '',
    })
    const [paymentMethod, setPaymentMethod] = useState('efectivo')
    const [isProcessing, setIsProcessing] = useState(false)
    const [orderId, setOrderId] = useState<number | null>(null)

    const handleNext = () => {
        if (currentStep === 1 && items.length === 0) {
            toast.error('Tu carrito está vacío')
            return
        }
        // La validación del paso 2 (entrega) se maneja en DeliveryForm con zod
        setCurrentStep((prev) => Math.min(prev + 1, 4))
    }

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1))
    }

    const handlePlaceOrder = async () => {
        if (!user) return
        setIsProcessing(true)
        try {
            const response = await pedidosService.create({
                id_cliente: user.id_usuario,
                direccion_entrega: deliveryData.address,
                metodo_pago: paymentMethod,
                notas_cliente: deliveryData.notes || null,
            })

            toast.success('¡Pedido realizado con éxito!')
            await refresh()
            setOrderId(response?.id_pedido || Date.now())
            setCurrentStep(4)
        } catch (error) {
            console.error('Error placing order:', error)
            const errorMessage = error instanceof Error ? error.message : 'Hubo un error al procesar tu pedido'
            toast.error(errorMessage)
        } finally {
            setIsProcessing(false)
        }
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <CartReview onNext={handleNext} />
            case 2:
                return (
                    <DeliveryForm
                        data={deliveryData}
                        onChange={setDeliveryData}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                )
            case 3:
                return (
                    <PaymentMethod
                        method={paymentMethod}
                        onChange={setPaymentMethod}
                        onNext={handlePlaceOrder}
                        onBack={handleBack}
                        isProcessing={isProcessing}
                        total={total}
                    />
                )
            case 4:
                return <Confirmation orderId={orderId} onHome={() => navigate('/')} />
            default:
                return null
        }
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
            {/* Stepper Header */}
            <div className="mb-8 md:mb-12">
                <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
                    <div
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-orange-500 -z-10 rounded-full transition-all duration-500 ease-in-out"
                        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    ></div>

                    {steps.map((step) => {
                        const Icon = step.icon
                        const isActive = step.id <= currentStep
                        const isCurrent = step.id === currentStep

                        return (
                            <div key={step.id} className="flex flex-col items-center bg-white px-2">
                                <div
                                    className={`
                    w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${isActive ? 'bg-orange-500 border-orange-500 text-white shadow-lg scale-110' : 'bg-white border-gray-300 text-gray-400'}
                  `}
                                >
                                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                                </div>
                                <span
                                    className={`
                    mt-2 text-[10px] sm:text-xs md:text-sm font-medium transition-colors duration-300
                    ${isActive ? 'text-orange-600' : 'text-gray-400'}
                    ${isCurrent ? 'font-bold' : ''}
                  `}
                                >
                                    {step.title}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content Area */}
                <div className={`transition-all duration-500 ${currentStep === 4 ? 'lg:col-span-12' : 'lg:col-span-8'}`}>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
                        {renderStepContent()}
                    </div>
                </div>

                {/* Order Summary Sidebar (Hidden on Confirmation step) */}
                {currentStep !== 4 && (
                    <div className="lg:col-span-4">
                        <OrderSummary currentStep={currentStep} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default CheckoutFlow
