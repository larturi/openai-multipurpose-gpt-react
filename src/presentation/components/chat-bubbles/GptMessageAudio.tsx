interface Props {
  audioUrl: string
}

export const GptMessageAudio = ({ audioUrl }: Props) => {
  return (
    <div className='col-start-1 col-end-9 p-3 rounded-lg'>
      <div className='flex flex-row items-start'>
        <div className='flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0'>
          G
        </div>
        <div className='relative ml-3 pb-4 text-sm bg-black bg-opacity-25 pt-4 px-4 shadow rounded-xl mt-[-5px]'>
          <audio controls src={audioUrl} className='w-full min-w-[300px]' autoPlay />
        </div>
      </div>
    </div>
  )
}
