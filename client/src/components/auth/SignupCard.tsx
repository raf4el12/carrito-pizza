import { zodResolver } from '@hookform/resolvers/zod'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useSignup } from '../../hook/auth/useSignup'
import { userSignupSchema } from '../../types/auth/auth.schema'
import type { SignupDto } from '../../types/auth/auth.schema'
import { Role } from '../../types/user/user.schema'
import FormFieldError from '../commons/FormFieldError'
import LayoutAuth from './LayoutAuth'

const SignupCard = () => {
  const navigate = useNavigate()
  const signupMutation = useSignup()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupDto>({
    resolver: zodResolver(userSignupSchema),
    defaultValues: {
      rol: Role.CLIENTE,
    },
  })

  const onSubmit = (data: SignupDto) => {
    signupMutation.mutate(data, {
      onSuccess: () => navigate('/auth/login'),
      onError: (err: any) => {
        setError('root', {
          message: err?.message || 'Error al registrar la cuenta',
        })
      },
    })
  }

  return (
    <LayoutAuth icon={<AccountCircleIcon fontSize="inherit" />}>
      <h2 className="text-2xl font-bold text-center mb-1 text-primary">
        Crear cuenta
      </h2>
      <p className="text-gray-500 text-center mb-6 text-sm">
        Completa el formulario para registrarte
      </p>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="nombre">
            Nombre
          </label>
          <input
            id="nombre"
            {...register('nombre')}
            className={`w-full rounded-md border px-3 py-2 bg-gray-50 ${
              errors.nombre ? 'border-red-400' : 'border-gray-300'
            }`}
            placeholder="Nombre"
          />
          {errors.nombre && (
            <FormFieldError>{errors.nombre.message}</FormFieldError>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="apellido">
            Apellido
          </label>
          <input
            id="apellido"
            {...register('apellido')}
            className={`w-full rounded-md border px-3 py-2 bg-gray-50 ${
              errors.apellido ? 'border-red-400' : 'border-gray-300'
            }`}
            placeholder="Apellido"
          />
          {errors.apellido && (
            <FormFieldError>{errors.apellido.message}</FormFieldError>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            {...register('username')}
            className={`w-full rounded-md border px-3 py-2 bg-gray-50 ${
              errors.username ? 'border-red-400' : 'border-gray-300'
            }`}
            placeholder="Username"
          />
          {errors.username && (
            <FormFieldError>{errors.username.message}</FormFieldError>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Correo electrónico
          </label>
          <input
            id="email"
            {...register('email')}
            className={`w-full rounded-md border px-3 py-2 bg-gray-50 ${
              errors.email ? 'border-red-400' : 'border-gray-300'
            }`}
            placeholder="r@ejemplo.com"
          />
          {errors.email && (
            <FormFieldError>{errors.email.message}</FormFieldError>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="contraseña">
            Contraseña
          </label>
          <input
            id="contraseña"
            type="password"
            {...register('contraseña')}
            className={`w-full rounded-md border px-3 py-2 bg-gray-50 ${
              errors.contraseña ? 'border-red-400' : 'border-gray-300'
            }`}
            placeholder="Contraseña"
          />
          {errors.contraseña && (
            <FormFieldError>{errors.contraseña.message}</FormFieldError>
          )}
        </div>
        <button
          type="submit"
          disabled={signupMutation.isPending}
          className="w-full bg-black text-white rounded-md py-2 font-semibold mt-2 hover:bg-gray-900 transition disabled:opacity-60"
        >
          {signupMutation.isPending ? 'Registrando...' : 'Registrarse'}
        </button>
        {errors.root && <FormFieldError>{errors.root.message}</FormFieldError>}
      </form>
      <div className="mt-6 text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?{' '}
        <a href="/auth/login" className="underline hover:text-primary">
          Inicia sesión aquí
        </a>
      </div>
    </LayoutAuth>
  )
}

export default SignupCard
