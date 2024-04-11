import { createBrowserRouter, Navigate } from 'react-router-dom'

import {
  AssistantPage,
  AudioToTextPage,
  ImageGenerationPage,
  ImageTunningPage,
  OrthographyPage,
  ProsConsPage,
  ProsConsStreamGeneratorPage,
  TextToAudioPage,
  TranslatePage
} from '../pages'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { AssistantTyCsPage } from '../pages/assistant/AssistantTyCsPage'
import LoginPage from '../pages/auth/LoginPage'
import { RequireAuth } from '../components/auth/RequireAuth'

export const menuRoutes = [
  {
    to: '/orthography',
    icon: 'fa-solid fa-spell-check',
    title: 'Ortografía',
    description: 'Corregir ortografía',
    showInMenu: true,
    component: <OrthographyPage />
  },
  {
    to: '/pros-cons',
    icon: 'fa-solid fa-code-compare',
    title: 'Pros & Cons',
    description: 'Comparar pros y contras',
    showInMenu: true,
    component: <ProsConsPage />
  },
  {
    to: '/pros-cons-stream',
    icon: 'fa-solid fa-water',
    title: 'Como stream',
    description: 'Con stream de mensajes',
    showInMenu: true,
    component: <ProsConsStreamGeneratorPage />
  },
  {
    to: '/translate',
    icon: 'fa-solid fa-language',
    title: 'Traducir',
    description: 'Textos a otros idiomas',
    showInMenu: true,
    component: <TranslatePage />
  },
  {
    to: '/text-to-audio',
    icon: 'fa-solid fa-podcast',
    title: 'Texto a audio',
    description: 'Convertir texto a audio',
    showInMenu: true,
    component: <TextToAudioPage />
  },
  {
    to: '/audio-to-text',
    icon: 'fa-solid fa-comment-dots',
    title: 'Audio a texto',
    description: 'Convertir audio a texto',
    showInMenu: true,
    component: <AudioToTextPage />
  },
  {
    to: '/image-generation',
    icon: 'fa-solid fa-image',
    title: 'Imágenes',
    description: 'Generar imágenes',
    showInMenu: true,
    component: <ImageGenerationPage />
  },
  {
    to: '/image-tunning',
    icon: 'fa-solid fa-wand-magic',
    title: 'Editar imagen',
    description: 'Generación continua',
    showInMenu: true,
    component: <ImageTunningPage />
  },
  {
    to: '/assistant',
    icon: 'fa-solid fa-user',
    title: 'Asistentes',
    description: 'Chatear con asistentes',
    showInMenu: true,
    component: <AssistantPage />
  },
  {
    to: '/assistant/terminos-y-condiciones',
    icon: 'fa-solid fa-user',
    title: 'Asistentes',
    description: 'Chatear con asistentes',
    showInMenu: false,
    component: <AssistantTyCsPage />
  }
]

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      ...menuRoutes.map((route) => ({
        path: route.to,
        element: <RequireAuth>{route.component}</RequireAuth>
      })),
      {
        path: '',
        element: <Navigate to='/orthography' />
      }
    ]
  }
])
