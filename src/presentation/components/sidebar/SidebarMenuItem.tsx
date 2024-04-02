import { NavLink } from 'react-router-dom'

interface Props {
  to: string
  icon: string
  title: string
  description: string
}

export const SidebarMenuItem: React.FC<Props> = ({ to, icon, title, description }) => {
  return (
    <NavLink
      key={to}
      to={to}
      className={({ isActive }) =>
        isActive
          ? 'flex justify-center items-center bg-gray-800 rounded-md p-2 transition-colors mt-1'
          : 'flex justify-center items-center rounded-md p-2 transition-colors hover:bg-gray-800 mt-1'
      }
    >
      <i className={`${icon} text-2xl text-indigo-400 mr-4 min-w-[35px] flex justify-center`}></i>
      <div className='flex flex-col flex-grow'>
        <span className='text-white text-lg font-semibold'>{title}</span>
        <span className='text-gray-400 text-sm'>{description}</span>
      </div>
    </NavLink>
  )
}
