import { Card } from '../../components/cards/Card'

export const AssistantPage = () => {
  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='flex flex-col gap-4'>
          <Card
            title='Sam - Asesor de términos y condiciones'
            description='Este asistente brinda asesoramiento de una página basado en sus términos y condiciones.'
            linkUrl='https://www.samsung.com/mx/info/terms-and-conditions'
            navigateTo='/assistant/terminos-y-condiciones'
          />
        </div>
      </div>
    </div>
  )
}
