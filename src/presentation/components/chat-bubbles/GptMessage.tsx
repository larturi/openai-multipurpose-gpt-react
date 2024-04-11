import Markdown from 'react-markdown'

interface Props {
  text: string
}

export const GptMessage = ({ text }: Props) => {
  return (
    <div className='col-start-1 col-end-12 md:col-end-9 p-3 rounded-lg w-full'>
      <div className='flex flex-row items-start w-full'>
        <div className='flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0'>
          G
        </div>
        <div
          className='relative ml-3 text-sm bg-black bg-opacity-25 pt-4 px-4 
        shadow rounded-xl mt-[-5px] md:max-w-[500px] w-full'
        >
          <Markdown className='w-full'>{text}</Markdown>
        </div>
      </div>
    </div>
  )
}
