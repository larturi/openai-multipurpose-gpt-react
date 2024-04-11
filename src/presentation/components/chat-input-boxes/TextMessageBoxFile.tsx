import { FormEvent, useRef, useState } from 'react'

interface Props {
  onSendMessage: (message: string, file: File) => void
  placeholder?: string
  disableCorrections?: boolean
  accept?: string
}

export const TextMessageBoxFile = ({
  onSendMessage,
  placeholder,
  disableCorrections = false,
  accept
}: Props) => {
  const [message, setMessage] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>()
  const inputFileRef = useRef<HTMLInputElement>(null)

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!selectedFile) return
    onSendMessage(message, selectedFile)
    setMessage('')
    setSelectedFile(null)
  }

  return (
    <form
      onSubmit={handleSendMessage}
      className='flex flex-col py-2 md:py-0 items-center rounded-xl bg-white px-4 md:flex-row'
    >
      <div className='flex flex-col w-full md:w-10/12 justify-start'>
        <div className='flex'>
          <div className='mr-4 mt-4'>
            <button
              type='button'
              className='flex items-center justify-center text-gray-400 hover:text-gray-600'
              onClick={() => inputFileRef.current?.click()}
            >
              <i className='fa-solid fa-paperclip text-xl'></i>
            </button>

            <input
              type='file'
              ref={inputFileRef}
              accept={accept}
              onChange={(e) => setSelectedFile(e.target.files?.item(0))}
              hidden
            />
          </div>

          <div className='w-full'>
            <input
              type='text'
              autoFocus
              name='message'
              className=' border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10 mb-3 mt-3 w-full'
              placeholder={placeholder}
              autoComplete='off'
              autoCorrect={disableCorrections ? 'on' : 'off'}
              spellCheck={disableCorrections ? 'true' : 'false'}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className='w-full md:w-3/12 md:ml-3'>
        <button className='btn-primary w-full' disabled={!selectedFile}>
          {!selectedFile ? (
            <span className='mr-2'>Enviar</span>
          ) : (
            <span className='mr-2'>{selectedFile.name.substring(0, 10) + '...'}</span>
          )}
          <i className='fa-regular fa-paper-plane'></i>
        </button>
      </div>
    </form>
  )
}
