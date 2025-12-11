import { FiMapPin, FiFileText, FiArrowLeft } from 'react-icons/fi'

interface DeliveryData {
    address: string
    notes: string
}

interface DeliveryFormProps {
    data: DeliveryData
    onChange: (data: DeliveryData) => void
    onNext: () => void
    onBack: () => void
}

const DeliveryForm = ({ data, onChange, onNext, onBack }: DeliveryFormProps) => {
    const handleChange = (field: keyof DeliveryData, value: string) => {
        onChange({ ...data, [field]: value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onNext()
    }

    return (
        <div className="p-6 md:p-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Datos de Entrega</h2>
                <p className="text-gray-500 text-sm mt-1">¿A dónde te enviamos tu pedido?</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
                <div className="space-y-2">
                    <label htmlFor="address" className="block text-sm font-semibold text-gray-700">
                        Dirección Completa <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiMapPin className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id="address"
                            value={data.address}
                            onChange={(e) => handleChange('address', e.target.value)}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow outline-none"
                            placeholder="Av. Principal 123, Dpto 401..."
                            required
                        />
                    </div>
                    <p className="text-xs text-gray-500">Incluye calle, número y referencias si es necesario.</p>
                </div>

                <div className="space-y-2">
                    <label htmlFor="notes" className="block text-sm font-semibold text-gray-700">
                        Notas para el repartidor (Opcional)
                    </label>
                    <div className="relative">
                        <div className="absolute top-3 left-3 pointer-events-none">
                            <FiFileText className="text-gray-400" />
                        </div>
                        <textarea
                            id="notes"
                            value={data.notes}
                            onChange={(e) => handleChange('notes', e.target.value)}
                            rows={4}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow outline-none resize-none"
                            placeholder="El timbre no funciona, llamar al llegar..."
                        />
                    </div>
                </div>

                <div className="pt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="w-full sm:w-auto text-gray-600 hover:text-gray-900 font-medium px-4 py-3 sm:py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                    >
                        <FiArrowLeft /> Volver
                    </button>

                    <button
                        type="submit"
                        className="w-full sm:w-auto bg-gray-900 hover:bg-black text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                        Continuar al Pago
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default DeliveryForm
