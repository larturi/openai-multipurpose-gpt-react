import { FormEvent, useState } from 'react'

interface Props {
  onSendMessage: (message: string, selectedOption: string) => void
  placeholder?: string
  disableCorrections?: boolean
  options: Option[]
  placeholderSelect?: string
}

interface Option {
  id: string
  text: string
}

export const TextMessageBoxSelect = ({
  onSendMessage,
  placeholder,
  disableCorrections = false,
  options,
  placeholderSelect = 'Seleccione'
}: Props) => {
  const [message, setMessage] = useState('')
  const [selectedOption, setSelectedOption] = useState<string>('')

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (message.trim().length === 0) return
    if (selectedOption.trim() === '') return

    onSendMessage(message, selectedOption)
    setMessage('')
  }

  return (
    <form
      onSubmit={handleSendMessage}
      className='flex flex-col px-2 py-2 md:flex-row items-center md:h-16 rounded-xl bg-white md:w-full md:px-4'
    >
      <div className='md:flex-grow w-full'>
        <div className='relative md:flex md:gap-3'>
          <input
            type='text'
            autoFocus
            name='message'
            className='flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10 mb-3 md:w-7/12 mt-3'
            placeholder={placeholder}
            autoComplete='off'
            autoCorrect={disableCorrections ? 'on' : 'off'}
            spellCheck={disableCorrections ? 'true' : 'false'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <select
            name='select'
            className='flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10 mb-3 mt-3 md:w-5/12'
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value=''>{placeholderSelect}</option>
            {options.map(({ id, text }) => (
              <option key={id} value={id}>
                {text}
              </option>
            ))}
          </select>
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
