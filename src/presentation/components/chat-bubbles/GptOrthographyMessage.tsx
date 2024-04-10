interface Props {
  userScore: number
  errors: string[]
  message: string
}

export const GptOrthographyMessage = ({ userScore, errors, message }: Props) => {
  return (
    <div className='col-start-1 col-end-9 p-3 rounded-lg'>
      <div className='flex flex-row items-start'>
        <div className='flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0'>
          G
        </div>
        <div className='relative ml-3 text-sm bg-black bg-opacity-25 py-4 px-4 shadow rounded-xl'>
          <h3 className='text-xl font-bold mb-2'>Puntaje: {userScore}</h3>
          <p>{message}</p>

          {errors.length === 0 ? (
            <p>No se encontraron errores!</p>
          ) : (
            <>
              <h3 className='text-lg font-bold mb-2'>Errores encontrados:</h3>
              <ul>
                {errors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            </>
          )}

          <p className='mt-5 mb-2'>
            Puedes escribir otro texto en español y te ayudo con las correcciones!
          </p>
        </div>
      </div>
    </div>
  )
}
