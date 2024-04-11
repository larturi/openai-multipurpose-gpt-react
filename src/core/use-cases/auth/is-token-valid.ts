export const isTokenValid = () => {
  const token = localStorage.getItem('userToken')
  if (!token) return false

  const parts = token.split('.')
  if (parts.length !== 3) {
    localStorage.removeItem('userToken')
    return false
  }

  try {
    const payload = JSON.parse(window.atob(parts[1]))
    const now = Date.now() / 1000 // Tiempo actual en segundos
    if (payload.exp < now) {
      // El token ha expirado
      localStorage.removeItem('userToken')
      return false
    }
  } catch (e) {
    // Error al decodificar el token, podría no ser válido
    localStorage.removeItem('userToken')
    return false
  }

  return true // El token es válido
}
