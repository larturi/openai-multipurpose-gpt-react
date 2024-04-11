/* eslint-disable no-constant-condition */

import { isTokenValid } from '../auth/is-token-valid'

export const prosConsStreamUseCase = async (prompt: string) => {
  try {
    const userToken = localStorage.getItem('userToken')
    if (!isTokenValid()) {
      return null
    }

    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({ prompt })
    })

    if (!resp.ok) throw new Error('No se pudo realizar el analisis de pros y contras')

    const reader = resp.body?.getReader()

    if (!reader) {
      console.log('No se pudo generar el reader')
      return null
    }

    return reader
  } catch (error) {
    console.log(error)
    return null
  }
}
