/* eslint-disable no-constant-condition */
import { isTokenValid } from '../auth/is-token-valid'

export async function* prosConsStreamGeneratorUseCase(prompt: string, abortSignal: AbortSignal) {
  // Idem prosConsStreamUseCase pero con funcion generadora
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*

  const userToken = localStorage.getItem('userToken')
  if (!isTokenValid()) {
    throw new Error('Invalid Token')
  }

  const resp = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`
    },
    body: JSON.stringify({ prompt }),
    signal: abortSignal
  })

  if (!resp.ok) throw new Error('No se pudo realizar el analisis de pros y contras')

  const reader = resp.body?.getReader()

  if (!reader) {
    console.log('No se pudo generar el reader')
    return null
  }

  const decoder = new TextDecoder()
  let text = ''

  while (true) {
    const { value, done } = await reader.read()
    if (done) break

    const decodedChunk = decoder.decode(value, { stream: true })
    text += decodedChunk
    yield text
  }
}
