import { FiCreditCard, FiDollarSign, FiArrowLeft, FiCheck } from 'react-icons/fi'

interface PaymentMethodProps {
    method: string
    onChange: (method: string) => void
    onNext: () => void
    onBack: () => void
    isProcessing: boolean
    total: number
}

const PaymentMethod = ({ method, onChange, onNext, onBack, isProcessing, total }: PaymentMethodProps) => {
    return (
        <div className="p-6 md:p-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Método de Pago</h2>
                <p className="text-gray-500 text-sm mt-1">Selecciona cómo deseas pagar</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <button
                    onClick={() => onChange('efectivo')}
                    className={`
            relative p-6 rounded-2xl border-2 text-left transition-all duration-200 group
            ${method === 'efectivo'
                            ? 'border-orange-500 bg-orange-50 shadow-md'
                            : 'border-gray-200 hover:border-orange-200 hover:bg-gray-50'}
          `}
                >
                    <div className={`
            absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center
            ${method === 'efectivo' ? 'border-orange-500 bg-orange-500 text-white' : 'border-gray-300'}
          `}>
                        {method === 'efectivo' && <FiCheck className="w-4 h-4" />}
                    </div>

                    <div className={`
            w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors
            ${method === 'efectivo' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500 group-hover:bg-orange-50 group-hover:text-orange-500'}
          `}>
                        <FiDollarSign className="w-6 h-6" />
                    </div>

                    <h3 className={`font-bold text-lg mb-1 ${method === 'efectivo' ? 'text-orange-900' : 'text-gray-900'}`}>
                        Efectivo
                    </h3>
                    <p className="text-sm text-gray-500">Paga al recibir tu pedido</p>
                </button>

                <button
                    onClick={() => onChange('tarjeta')}
                    className={`
            relative p-6 rounded-2xl border-2 text-left transition-all duration-200 group
            ${method === 'tarjeta'
                            ? 'border-orange-500 bg-orange-50 shadow-md'
                            : 'border-gray-200 hover:border-orange-200 hover:bg-gray-50'}
          `}
                >
                    <div className={`
            absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center
            ${method === 'tarjeta' ? 'border-orange-500 bg-orange-500 text-white' : 'border-gray-300'}
          `}>
                        {method === 'tarjeta' && <FiCheck className="w-4 h-4" />}
                    </div>

                    <div className={`
            w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors
            ${method === 'tarjeta' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500 group-hover:bg-orange-50 group-hover:text-orange-500'}
          `}>
                        <FiCreditCard className="w-6 h-6" />
                    </div>

                    <h3 className={`font-bold text-lg mb-1 ${method === 'tarjeta' ? 'text-orange-900' : 'text-gray-900'}`}>
                        Tarjeta
                    </h3>
                    <p className="text-sm text-gray-500">Visa, Mastercard, Amex</p>
                </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl mb-8 border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Total a pagar</span>
                    <span className="text-2xl font-bold text-gray-900">S/ {total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 text-right">Incluye impuestos y envío</p>
            </div>

            <div className="pt-4 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
                <button
                    type="button"
                    onClick={onBack}
                    disabled={isProcessing}
                    className="w-full sm:w-auto text-gray-600 hover:text-gray-900 font-medium px-4 py-3 sm:py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    <FiArrowLeft /> Volver
                </button>

                <button
                    onClick={onNext}
                    disabled={isProcessing}
                    className={`
            w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5
            disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3
          `}
                >
                    {isProcessing ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Procesando...
                        </>
                    ) : (
                        <>
                            Confirmar Pedido
                            <FiCheck className="w-5 h-5" />
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default PaymentMethod
