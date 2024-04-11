import { Navigate } from 'react-router-dom'

interface RequireAuthProps {
  children: React.ReactNode
}

const isAuthenticated = () => {
  // Aquí deberías verificar si el usuario está autenticado.
  // Por ejemplo, comprobando si hay un token válido en el localStorage.
  // Esto es solo un placeholder para la lógica de autenticación.
  const token = localStorage.getItem('userToken')
  return !!token
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  if (!isAuthenticated()) {
    // Usuario no autenticado, redirigir a la página de login
    return <Navigate to='/login' />
  }

  return children
}
