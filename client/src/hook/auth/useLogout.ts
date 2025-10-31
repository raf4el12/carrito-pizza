import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import ApiBackend from '../../shared/services/api.backend'

async function logoutUser() {
  return ApiBackend.post('/auth/logout')
}

export function removeAuthLocalStorage() {
  localStorage.removeItem('userId')
}

export function useLogoutMutation() {
  const navigate = useNavigate()
  
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      removeAuthLocalStorage()
      navigate('/auth/login')
    },
  })
}
