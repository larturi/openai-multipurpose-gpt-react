import { FormEvent, useState } from 'react'

interface Props {
  onSendMessage: (message: string) => void
  placeholder?: string
  disableCorrections?: boolean
}

export const TextMessageBox = ({
  onSendMessage,
  placeholder,
  disableCorrections = false
}: Props) => {
  const [message, setMessage] = useState('')

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (message.trim().length === 0) return

    onSendMessage(message)
    setMessage('')
  }

  return (
    <form
      onSubmit={handleSendMessage}
      className='flex flex-col px-2 py-2 md:flex-row items-center md:h-16 rounded-xl bg-white md:w-full md:px-4'
    >
      <div className='md:flex-grow w-full'>
        <div className='md:relative'>
          <input
            type='text'
            autoFocus
            name='message'
            className='flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10 mb-3 mt-3'
            placeholder={placeholder}
            autoComplete='off'
            autoCorrect={disableCorrections ? 'on' : 'off'}
            spellCheck={disableCorrections ? 'true' : 'false'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>

      <div className='md:ml-4 w-full md:w-3/12'>
        <button className='btn-primary w-full'>
          <span className='mr-2'>Enviar</span>
          <i className='fa-regular fa-paper-plane'></i>
        </button>
      </div>
    </form>
  )
}
