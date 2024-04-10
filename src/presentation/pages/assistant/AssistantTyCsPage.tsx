/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react'
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from '../../components'
import { createThreadUseCase, postQuestionUseCase } from '../../../core/use-cases'

interface Message {
  text: string
  isGpt: boolean
  info?: {
    role: string
    content: string
  }
}

function cleanResponseText(text: string) {
  const patron = /【.*?】/g
  return text.replace(patron, '')
}

export const AssistantTyCsPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [threadId, setThreadId] = useState<string>()

  useEffect(() => {
    const threadIdLocalStorage = localStorage.getItem('threadId')

    if (threadIdLocalStorage) {
      setThreadId(threadIdLocalStorage!)
    } else {
      createThreadUseCase().then((id) => {
        setThreadId(id)
        localStorage.setItem('threadId', id)
      })
    }
  }, [])

  useEffect(() => {
    if (threadId) {
      setMessages((prev) => [
        ...prev,
        {
          text: `Id de Thread:\n ${threadId}`,
          isGpt: true
        }
      ])
    }
  }, [threadId])

  const handlePost = async (text: string) => {
    if (!threadId) return

    setIsLoading(true)
    setMessages((prev) => [...prev, { text: text, isGpt: false }])

    const replies = await postQuestionUseCase({
      threadId: threadId,
      question: text,
      assistantId: 'asst_R887FRx7hJxZwCUcSDoIFoxn'
    })
    setIsLoading(false)

    const lastMessage = replies.reverse()[0]
    console.log(lastMessage)

    setMessages((prev) => [
      ...prev,
      {
        text: cleanResponseText(lastMessage.content[0]),
        isGpt: lastMessage.role === 'assistant',
        info: {
          role: lastMessage.role,
          content: cleanResponseText(lastMessage.content[0])
        }
      }
    ])
  }

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>
          <GptMessage text='Hola, soy Sam, asistente en Terminos y Condiciones de Samsung. En que puedo ayudarte?' />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}

          {isLoading && (
            <div className='col-start-1 col-end-12 fade-in'>
              <TypingLoader className='fade-in' />
            </div>
          )}
        </div>
      </div>

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder='Escribe aqui lo que deseas...'
        disableCorrections
      />
    </div>
  )
}
