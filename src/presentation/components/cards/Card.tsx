import { useNavigate } from 'react-router-dom'

interface Props {
  title: string
  description: string
  linkUrl?: string
  navigateTo?: string
}

export const Card = ({ title, description, linkUrl, navigateTo }: Props) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    if (navigateTo) {
      navigate(navigateTo)
    }
  }

  return (
    <>
      <div className='min-w-[500px] p-6 border border-neutral-700 rounded-lg bg-neutral-900'>
        <h5 className='mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {title}
        </h5>
        <p className='mb-3 text-md font-normal text-gray-400'>
          {description}
          {linkUrl && (
            <a
              className='text-md font-normal text-gray-400 ml-1 underline'
              href={linkUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              View more
            </a>
          )}
        </p>

        <div className='flex justify-start'>
          <button
            className='mt-2 px-3 py-2 text-md font-medium text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800'
            onClick={handleNavigate}
          >
            Iniciar conversación
          </button>
        </div>
      </div>
    </>
  )
}
