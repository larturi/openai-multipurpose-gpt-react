export const loginUseCase = async (email: string, password: string) => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_AUTH_API}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    if (!resp.ok) throw new Error('No se pudo realizar el login')

    const data = (await resp.json()) as { login: boolean; access_token: string }

    return {
      ...data
    }
  } catch (error) {
    return {
      login: false,
      access_token: null
    }
  }
}
