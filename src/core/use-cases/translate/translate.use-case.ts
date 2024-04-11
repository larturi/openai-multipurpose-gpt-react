import { TranslateResponse } from '../../../interfaces'
import { isTokenValid } from '../auth/is-token-valid'

export const translateUseCase = async (prompt: string, lang: string) => {
  try {
    const userToken = localStorage.getItem('userToken')
    if (!isTokenValid()) {
      return {
        needAuth: true,
        ok: false,
        text: 'Invalid Token',
        translation: '',
        originalLang: '',
        translatedLang: ''
      }
    }
    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({ prompt, lang })
    })

    if (!resp.ok) throw new Error('No se pudo realizar la traducción')

    const data = (await resp.json()) as TranslateResponse

    return {
      ok: true,
      ...data
    }
  } catch (error) {
    return {
      ok: false,
      text: 'No se pudo realizar la traducción',
      translation: '',
      originalLang: '',
      translatedLang: ''
    }
  }
}
