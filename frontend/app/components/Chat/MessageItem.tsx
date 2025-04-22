import { Message } from '../../../../shared/types/chat'
type Props = {
  message: Message
}

const MessageItem = ({ message }: Props) => {
  return (
    <div
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-4 ${
          message.role === 'user' ? 'bg-[#ff5757] text-white' : 'bg-white text-gray-800'
        }`}
      >
        {typeof message.content === 'string' ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          message.content // Si el contenido es JSX, lo renderizamos directamente
        )}
      </div>
    </div>
  )
}

export default MessageItem
