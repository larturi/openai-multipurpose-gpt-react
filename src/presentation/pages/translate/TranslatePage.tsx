import { useState } from 'react'
import { GptMessage, MyMessage, TypingLoader, TextMessageBoxSelect } from '../../components'
import { translateUseCase } from '../../../core/use-cases/translate/translate.use-case'

interface Message {
  text: string
  isGpt: boolean
}

const languages = [
  { id: 'alemán', text: 'Alemán' },
  { id: 'árabe', text: 'Árabe' },
  { id: 'bengalí', text: 'Bengalí' },
  { id: 'francés', text: 'Francés' },
  { id: 'hindi', text: 'Hindi' },
  { id: 'inglés', text: 'Inglés' },
  { id: 'japonés', text: 'Japonés' },
  { id: 'mandarín', text: 'Mandarín' },
  { id: 'portugués', text: 'Portugués' },
  { id: 'ruso', text: 'Ruso' }
]

export const TranslatePage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string, selectedLanguaje: string) => {
    setIsLoading(true)

    const newMessage = `Traduce ${text} al idioma ${selectedLanguaje}`
    setMessages((prev) => [...prev, { text: newMessage, isGpt: false }])

    const { ok, translation: message } = await translateUseCase(text, selectedLanguaje)

    if (!ok) {
      setMessages((prev) => [...prev, { text: 'No se pudo realizar la traducción', isGpt: true }])
    } else {
      setMessages((prev) => [
        ...prev,
        {
          text: message,
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
          <GptMessage text='Hola, que quieres que traduzca hoy?' />

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

      <TextMessageBoxSelect
        onSendMessage={handlePost}
        placeholder='Escribe aqui lo que deseas...'
        options={languages}
        placeholderSelect='Seleccionar idioma'
      />
    </div>
  )
}
