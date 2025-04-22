import Input from '../ui/Input/Input';

type Props = {
 input: string;
 setInput: React.Dispatch<React.SetStateAction<string>>;
 isLoading: boolean;
 handleSubmit: (e: React.FormEvent) => void;
};

const ChatInput = ({ input, setInput, isLoading, handleSubmit }: Props) => {
 return (
  <div className="bg-white border-t p-4 fixed bottom-0 left-0 right-0 z-10">
   <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-2">
    <Input
     type="text"
     value={input}
     onChange={(e) => setInput(e.target.value)}
     placeholder="Recommend me a biceps exercise..."
     className="text-[#545454] placeholder-[#545454] focus:ring-[#545454] focus:border-[#545454]"
     disabled={isLoading}
    />
    <button
     type="submit"
     disabled={isLoading || !input.trim()}
     className="w-full sm:w-auto bg-[#ff5757] text-white px-6 py-2 rounded-lg hover:bg-[#ff3a3a] focus:outline-none focus:ring-2 focus:ring-[#ff5757] disabled:opacity-50 disabled:cursor-not-allowed"
    >
     Send
    </button>
   </form>
  </div>
 );
};

export default ChatInput;
