import { useNavigate } from 'react-router-dom'
import { loginUseCase } from '../../../core/use-cases/auth/login.use-case'
import { useEffect, useState } from 'react'

const LoginPage = () => {
  const navigate = useNavigate()

  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    setShowErrorMessage(false)

    if (email === '' || password === '') {
      setErrorMessage('Debe ingresar usuario y password')
      setShowErrorMessage(true)
      setIsLoading(false)
      return
    }

    try {
      setErrorMessage('El primer login puede demorar hasta un minuto')
      setShowErrorMessage(true)

      const { login, access_token } = await loginUseCase(email, password)

      if (login && access_token) {
        localStorage.setItem('userToken', access_token)
        navigate('/')
      } else {
        setErrorMessage('Usuario y/o password incorrectos')
        setShowErrorMessage(true)
      }
    } catch (error) {
      setErrorMessage('Error al intentar iniciar sesión. Por favor, inténtalo de nuevo.')
      setShowErrorMessage(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setShowErrorMessage(false)
  }, [])

  useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    if (userToken) navigate('/')
  }, [navigate])

  return (
    <div>
      <section className='bg-gray-900'>
        <div className='flex flex-col items-center justify-center lg:px-6 lg:py-0 px-3 py-3 mx-auto h-screen '>
          <div className='w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight md:text-3xl text-white'>
                OpenAI Multipurpose
              </h1>

              <p className='text-gray-400 text-md'>
                Translate, Image Generator and Image Edition, Voice to Text, Text to Voice,
                Assistant and more!
              </p>

              <hr className='border-t border-gray-600' />

              <h3>Login</h3>

              <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
                <div>
                  <label className='block mb-2 text-sm font-medium text-white'>Your email</label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    className='border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                    placeholder='name@email.com'
                  />
                </div>
                <div>
                  <label className='block mb-2 text-sm font-medium text-white'>Password</label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='••••••••'
                    className='border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>

                <button
                  type='submit'
                  className='w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800'
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className='flex justify-center'>
                      <span
                        className={`fa-solid fa-spinner text-indigo-400
                         mr-4 min-w-[35px] flex justify-center ml-1 text-sm animate-spin`}
                      ></span>
                    </div>
                  ) : (
                    <span>Sign in</span>
                  )}
                </button>
              </form>

              <div className='flex justify-center align-middle w-full'>
                <p
                  className={`
                    text-sm font-semibold w-full py-3 rounded-md bg-purple-700 
                    text-white text-center ${showErrorMessage ? 'block' : 'hidden'}`}
                >
                  {errorMessage}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LoginPage
