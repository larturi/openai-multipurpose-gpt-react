import { QuestionResponse } from '../../../interfaces'

interface Options {
  threadId: string
  question: string
  assistantId: string
}

export const postQuestionUseCase = async (options: Options) => {
  const { threadId, question, assistantId } = options

  try {
    const userToken = localStorage.getItem('userToken')

    const resp = await fetch(`${import.meta.env.VITE_ASSISTANT_API}/tics/user-question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({ threadId, question, assistantId })
    })

    const replies = (await resp.json()) as QuestionResponse[]
    return replies
  } catch (error) {
    throw new Error('Error posting question')
  }
}
