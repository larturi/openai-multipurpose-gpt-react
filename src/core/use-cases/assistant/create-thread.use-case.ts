export const createThreadUseCase = async () => {
  try {
    const userToken = localStorage.getItem('userToken')

    const resp = await fetch(`${import.meta.env.VITE_ASSISTANT_API}/tics/create-thread`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })

    const { id } = (await resp.json()) as { id: string }

    return id
  } catch (error) {
    throw new Error('Error creating thread')
  }
}
