import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import ApiBackend from '../../shared/services/api.backend'
import type { SignupDto } from '../../types/auth/auth.schema'

export const useSignup = () => {
  const navigate = useNavigate()
  
  return useMutation({
    mutationFn: async (user: SignupDto) => {
      const data = await ApiBackend.post('/auth/signup', user)
      return data
    },
    onSuccess: () => {
      navigate('/auth/login')
    },
  })
}
