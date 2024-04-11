export const audioToTextUseCase = async (audioFile: File, prompt?: string) => {
  try {
    const formData = new FormData()
    formData.append('file', audioFile)

    if (prompt) {
      formData.append('prompt', prompt)
    }

    const userToken = localStorage.getItem('userToken')

    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/audio-to-text`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      body: formData
    })

    const data = await resp.json()
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
