import { useState } from 'react'
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from '../../components'
import { prosConsUseCase } from '../../../core/use-cases'

interface Message {
  text: string
  isGpt: boolean
}

export const ProsConsPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string) => {
    setIsLoading(true)
    setMessages((prev) => [...prev, { text: text, isGpt: false }])

    const { ok, content } = await prosConsUseCase(text)

    if (!ok) {
      setMessages((prev) => [
        ...prev,
        { text: 'No se pudo realizar el analisis de pros y contras', isGpt: true }
      ])
    } else {
      setMessages((prev) => [
        ...prev,
        {
          text: content,
          isGpt: true
        }
      ])
    }

    setIsLoading(false)
  }

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>
          <GptMessage text='Hola, puedes escribir lo que sea que quieras que compare y te daré pros y contras...' />

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
