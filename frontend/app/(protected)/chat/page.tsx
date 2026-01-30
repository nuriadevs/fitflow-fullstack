// components/chat/ChatBotDemo.tsx
'use client';

import { useProfile } from '@/hooks/useProfile';
import { Chat } from '@/hooks/use-chat';
import LoadingSpinner from '@/components/ui/loadingSpinner';
import ExerciseList from '@/components/chat/exerciseList';
import { AvatarDemo } from '@/components/chat/avatar-chat';
import { UserAvatar } from '@/components/chat/user-avatar';
import {
    Conversation,
    ConversationContent,
    ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
    Message,
    MessageContent,
    MessageResponse,
    MessageActions,
    MessageAction,
} from '@/components/ai-elements/message';
import {
    PromptInput,
    PromptInputAttachment,
    PromptInputAttachments,
    PromptInputBody,
    PromptInputFooter,
    type PromptInputMessage,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputHeader,
} from '@/components/ai-elements/prompt-input';
import { CopyIcon } from 'lucide-react';
import {
    Source,
    Sources,
    SourcesContent,
    SourcesTrigger,
} from '@/components/ai-elements/sources';
import {
    Reasoning,
    ReasoningContent,
    ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
import { Loader } from '@/components/ai-elements/loader';

export default function ChatBotDemo() {
    const { messages, input, setInput, isLoading, status, sendMessage, regenerate } = Chat();
    const { user, isLoading: isUserLoading } = useProfile();

    const handleSubmit = (
        message: PromptInputMessage,
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const hasText = Boolean(message.text);
        const hasAttachments = Boolean(message.files?.length);

        if (!hasText && !hasAttachments) return;
        if (isLoading) return;

        sendMessage(message.text);
        setInput('');
    };

    if (isUserLoading) return <LoadingSpinner />;

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] max-w-6xl mx-auto my-4 border-2 rounded-lg overflow-hidden shadow-lg">
            
            <div className="flex-1 overflow-y-auto bg-gray-50">
                <Conversation className="h-full">
                    <ConversationContent className="px-4 py-6">
                        {messages.map((message) => (
                            <div key={message.id} className="mb-6">
                                {message.role === 'assistant' &&
                                    message.parts.filter((part) => part.type === 'source-url').length > 0 && (
                                        <Sources>
                                            <SourcesTrigger
                                                count={
                                                    message.parts.filter(
                                                        (part) => part.type === 'source-url',
                                                    ).length
                                                }
                                            />
                                            {message.parts
                                                .filter((part) => part.type === 'source-url')
                                                .map((part, i) => {
                                                    if (part.type !== 'source-url') return null;
                                                    return (
                                                        <SourcesContent key={`${message.id}-source-${i}`}>
                                                            <Source
                                                                href={part.url}
                                                                title={part.title || part.url}
                                                            />
                                                        </SourcesContent>
                                                    );
                                                })}
                                        </Sources>
                                    )}

                                {message.parts.map((part, i) => {
                                    switch (part.type) {
                                        case 'text':
                                            return (
                                                <Message key={`${message.id}-${i}`} from={message.role}>
                                                    {message.role === 'assistant' && (
                                                        <>
                                                            <div className="flex gap-3 items-start mb-4">
                                                                <AvatarDemo />
                                                                <div className="flex-1">
                                                                    <MessageContent className="bg-white rounded-lg p-4 shadow-sm">
                                                                        <MessageResponse>
                                                                            {part.text}
                                                                        </MessageResponse>
                                                                    </MessageContent>
                                                                </div>
                                                            </div>
                                                            <MessageActions>
                                                                <MessageAction
                                                                    onClick={() => regenerate()}
                                                                    label="Retry"
                                                                />
                                                                <MessageAction
                                                                    onClick={() => navigator.clipboard.writeText(part.text)}
                                                                    label="Copy"
                                                                >
                                                                    <CopyIcon className="size-3" />
                                                                </MessageAction>
                                                            </MessageActions>
                                                        </>
                                                    )}

                                                    {message.role === 'user' && (
                                                        <div className="flex justify-end gap-3 items-start mb-4">
                                                            <div className="flex-1 flex justify-end">
                                                                <MessageContent className="bg-blue-600 text-white rounded-lg p-4 shadow-sm max-w-[80%]">
                                                                    <MessageResponse>
                                                                        {part.text}
                                                                    </MessageResponse>
                                                                </MessageContent>
                                                            </div>
                                                            <UserAvatar
                                                                userName={user?.username || user?.email}
                                                            />
                                                        </div>
                                                    )}
                                                </Message>
                                            );

                                        case 'reasoning':
                                            return (
                                                <Reasoning
                                                    key={`${message.id}-${i}`}
                                                    className="w-full mb-4"
                                                    isStreaming={
                                                        status === 'streaming' &&
                                                        i === message.parts.length - 1 &&
                                                        message.id === messages.at(-1)?.id
                                                    }
                                                >
                                                    <ReasoningTrigger />
                                                    <ReasoningContent>{part.text}</ReasoningContent>
                                                </Reasoning>
                                            );

                                        case 'exercise-list':
                                            return (
                                                <Message key={`${message.id}-${i}`} from={message.role}>
                                                    <div className="flex gap-3 items-start mb-4">
                                                        <AvatarDemo />
                                                        <MessageContent className="flex-1">
                                                            <div className="bg-white rounded-lg p-4 shadow-sm">
                                                                {part.description && (
                                                                    <h3 className="text-lg font-semibold mb-4">
                                                                        {part.description}
                                                                    </h3>
                                                                )}
                                                                <ExerciseList
                                                                    exercises={part.exercises}
                                                                    userName={user?.username}
                                                                />
                                                            </div>
                                                        </MessageContent>
                                                    </div>
                                                </Message>
                                            );

                                        default:
                                            return null;
                                    }
                                })}
                            </div>
                        ))}
                        {status === 'submitted' && <Loader />}
                    </ConversationContent>
                    <ConversationScrollButton />
                </Conversation>
            </div>

            <div className="shrink-0 border-t bg-white px-4 py-4">
                <PromptInput onSubmit={handleSubmit} globalDrop multiple>
                    <PromptInputHeader>
                        <PromptInputAttachments>
                            {(attachment) => <PromptInputAttachment data={attachment} />}
                        </PromptInputAttachments>
                    </PromptInputHeader>
                    <PromptInputBody>
                        <PromptInputTextarea
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            placeholder="Ask anything you want..."
                        />
                    </PromptInputBody>
                    <PromptInputFooter>
                        <PromptInputSubmit disabled={!input || isLoading} status={status} />
                    </PromptInputFooter>
                </PromptInput>
            </div>
        </div>
    );
}