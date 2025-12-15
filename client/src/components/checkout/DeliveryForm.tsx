import { FiMapPin, FiFileText, FiArrowLeft } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { deliveryFormSchema, type DeliveryFormDto, type DeliveryData } from '../../types/checkout/checkout.schema'

interface DeliveryFormProps {
    data: DeliveryData
    onChange: (data: DeliveryData) => void
    onNext: () => void
    onBack: () => void
}

const DeliveryForm = ({ data, onChange, onNext, onBack }: DeliveryFormProps) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<DeliveryFormDto>({
        resolver: zodResolver(deliveryFormSchema),
        defaultValues: {
            address: data.address,
            notes: data.notes,
        },
    })

    // Sincronizar cambios con el estado padre
    const watchedAddress = watch('address')
    const watchedNotes = watch('notes')

    useEffect(() => {
        onChange({ address: watchedAddress, notes: watchedNotes || '' })
    }, [watchedAddress, watchedNotes, onChange])

    const onSubmit = () => {
        onNext()
    }

    return (
        <div className="p-6 md:p-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Datos de Entrega</h2>
                <p className="text-gray-500 text-sm mt-1">¿A dónde te enviamos tu pedido?</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg">
                <div className="space-y-2">
                    <label htmlFor="address" className="block text-sm font-semibold text-gray-700">
                        Dirección Completa <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiMapPin className={errors.address ? 'text-red-400' : 'text-gray-400'} />
                        </div>
                        <input
                            type="text"
                            id="address"
                            {...register('address')}
                            className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow outline-none ${
                                errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="Av. Principal 123, Dpto 401..."
                        />
                    </div>
                    {errors.address ? (
                        <p className="text-xs text-red-500">{errors.address.message}</p>
                    ) : (
                        <p className="text-xs text-gray-500">Incluye calle, número y referencias si es necesario (mín. 10 caracteres).</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="notes" className="block text-sm font-semibold text-gray-700">
                        Notas para el repartidor (Opcional)
                    </label>
                    <div className="relative">
                        <div className="absolute top-3 left-3 pointer-events-none">
                            <FiFileText className={errors.notes ? 'text-red-400' : 'text-gray-400'} />
                        </div>
                        <textarea
                            id="notes"
                            {...register('notes')}
                            rows={4}
                            className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow outline-none resize-none ${
                                errors.notes ? 'border-red-500 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="El timbre no funciona, llamar al llegar..."
                        />
                    </div>
                    {errors.notes && <p className="text-xs text-red-500">{errors.notes.message}</p>}
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
