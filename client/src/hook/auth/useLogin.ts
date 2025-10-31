import { useMutation } from '@tanstack/react-query'
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
  
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      navigate('/')
    },
  })
}
