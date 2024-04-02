import { useState } from 'react'
import {
  GptMessage,
  MyMessage,
  TypingLoader,
  TextMessageBoxSelect,
  GptMessageAudio
} from '../../components'
import { textToVoiceUseCase } from '../../../core/use-cases'

interface TextMessage {
  text: string
  isGpt: boolean
  type: 'text'
}

interface AudioMessage {
  text: string
  isGpt: boolean
  audioUrl: string
  type: 'audio'
}

type Message = TextMessage | AudioMessage

const voices = [
  { id: 'alloy', text: 'Alloy' },
  { id: 'echo', text: 'Echo' },
  { id: 'fable', text: 'Fable' },
  { id: 'nova', text: 'Nova' },
  { id: 'onyx', text: 'Onyx' },
  { id: 'shimmer', text: 'Shimmer' }
]

export const TextToAudioPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string, selectedVoice: string) => {
    setIsLoading(true)
    setMessages((prev) => [...prev, { text: text, isGpt: false, type: 'text' }])

    const { ok, message, audioUrl } = await textToVoiceUseCase(text, selectedVoice)

    if (!ok) return

    setMessages((prev) => [
      ...prev,
      { text: message, isGpt: true, type: 'audio', audioUrl: audioUrl! }
    ])

    console.log(ok, message, audioUrl)
    setIsLoading(false)
  }

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>
          <GptMessage text='Hola, puedes escribir tu texto y lo convertiré a voz!' />

          {messages.map((message, index) =>
            message.isGpt ? (
              message.type === 'audio' ? (
                <GptMessageAudio key={index} audioUrl={message.audioUrl} />
              ) : (
                <GptMessage key={index} text={message.text} />
              )
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
        placeholder='Escribe aqui lo que deseas convertir a audio...'
        options={voices}
        placeholderSelect='Seleccionar voz'
      />
    </div>
  )
}
