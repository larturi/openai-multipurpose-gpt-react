import { Outlet } from 'react-router-dom'
import { menuRoutes } from '../router/router'
import { SidebarMenuItem } from '../components'
import { useState } from 'react'

export const DashboardLayout = () => {
  const [isNavVisible, setIsNavVisible] = useState(false)

  return (
    <main className='flex flex-row mt-7'>
      <button
        className='lg:hidden fixed top-3 right-3 z-50 bg-indigo-700 text-white p-3 rounded-md shadow-lg w-[55px] h-[55px]'
        onClick={() => setIsNavVisible(!isNavVisible)}
      >
        <i className='fa-solid fa-bars text-2xl'></i>
      </button>

      {/* Desktop Sidebar */}
      <nav className='hidden lg:flex flex-col ml-5 w-[400px] min-h-[calc(100vh-3.0rem)] bg-white bg-opacity-10 p-5 rounded-3xl'>
        <h1 className='font-bold text-lg lg:text-3xl text-gray-400 bg-clip-text'>
          ReactGPT
          <span className='text-indigo-600'>.</span>
        </h1>
        <span className='text-xl'>Bienvenido</span>

        <div className='border-gray-700 border my-3' />

        {menuRoutes.map((option) => (
          <SidebarMenuItem key={option.to} setIsNavVisible={setIsNavVisible} {...option} />
        ))}
      </nav>

      {/* Responsive Sidebar */}
      <nav
        className={`lg:relative lg:hidden fixed z-40 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-95 p-5 transform transition duration-300 ease-in-out ${
          isNavVisible ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:flex flex-col ml-0 w-[400px] min-h-[calc(100vh-3.0rem)]`}
      >
        <h1 className='font-bold text-lg lg:text-3xl text-gray-400 bg-clip-text'>
          ReactGPT
          <span className='text-indigo-600'>.</span>
        </h1>
        <span className='text-xl'>Bienvenido</span>

        <div className='border-gray-700 border my-3' />

        {menuRoutes.map((option) => (
          <SidebarMenuItem key={option.to} setIsNavVisible={setIsNavVisible} {...option} />
        ))}
      </nav>

      <section className='mx-3 sm:mx-6 flex flex-col w-full h-[calc(100vh-50px)] bg-white bg-opacity-10 p-5 rounded-3xl'>
        <div className='flex flex-row h-full'>
          <div className='flex flex-col flex-auto h-full p-1'>
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  )
}
