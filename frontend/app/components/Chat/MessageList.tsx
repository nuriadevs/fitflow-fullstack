import { Message } from '../../../../shared/types/chat'
import MessageItem from './MessageItem'

type Props = {
  messages: Message[]
  isLoading: boolean
}

const MessageList = ({ messages, isLoading }: Props) => {
  return (
    <div className="max-w-3xl mx-auto space-y-4 bg-gradient-to-r from-[#545454] to-[#2d2d2d] rounded-lg h-[calc(80vh-160px)] overflow-y-auto p-6 mb-10">
      {/* Renderizamos los mensajes */}
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}

      {/* Indicador de carga mientras espera la respuesta */}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-white rounded-lg p-4">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MessageList
