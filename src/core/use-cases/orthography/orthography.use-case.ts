import { OtographyResponse } from '../../../interfaces'

export const orthographyUseCase = async (prompt: string) => {
  try {
    const userToken = localStorage.getItem('userToken')

    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/orthography-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({ prompt })
    })

    if (!resp.ok) throw new Error('No se pudo realizar la corrección')

    const data = (await resp.json()) as OtographyResponse

    return {
      ok: true,
      ...data
    }
  } catch (error) {
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: 'No se pudo realizar la corrección'
    }
  }
}
