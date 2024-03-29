import { Outlet } from 'react-router-dom'
import { menuRoutes } from '../router/router'
import { SidebarMenuItem } from '../components'

export const DashboardLayout = () => {
  return (
    <main className='flex flex-row mt-7 gap-2'>
      <nav className='hidden sm:flex flex-col ml-5 w-[400px] min-h-[calc(100vh-3.0rem)] bg-white bg-opacity-10 p-5 rounded-3xl'>
        <h1 className='font-bold text-lg lg:text-3xl text-gray-400 bg-clip-text'>
          ReactGPT
          <span className='text-indigo-600'>.</span>
        </h1>
        <span className='text-xl'>Bienvenido</span>

        <div className='border-gray-700 border my-3' />

        {menuRoutes.map((option) => (
          <SidebarMenuItem key={option.to} {...option} />
        ))}
      </nav>

      <section className='mx-3 sm:mx-10 flex flex-col w-full h-[calc(100vh-50px)] bg-white bg-opacity-10 p-5 rounded-3xl'>
        <div className='flex flex-row h-full'>
          <div className='flex flex-col flex-auto h-full p-1'>
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  )
}
