import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import ApiBackend from '../../shared/services/api.backend'
import type { LoginResponse } from '../../types/user/user.schema'
import type { LoginDto } from '../../types/auth/auth.schema'

async function loginUser(data: LoginDto) {
  const response = await ApiBackend.post<LoginResponse>('/auth/login', data)
  
  // Guardar userId en localStorage ya que las cookies son httpOnly
  localStorage.setItem('userId', response.userId.toString())
  
  return response
}

export function useLoginMutation() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      // Invalidar la query del usuario para que se recargue con los nuevos datos
      await queryClient.invalidateQueries({ queryKey: ['user'] })
      
      // Esperar un momento para que el AuthContext se actualice
      await new Promise((resolve) => setTimeout(resolve, 300))
      
      // Redirigir según el rol del usuario
      const targetRoute = data.rol === 'administrador' ? '/admin/dashboard' : '/'
      
      // Usar window.location para asegurar la redirección
      window.location.href = targetRoute
    },
  })
}
