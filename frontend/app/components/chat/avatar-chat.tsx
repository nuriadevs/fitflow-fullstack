
import {
  Avatar,

  AvatarFallback,


  AvatarImage,
} from "@/components/ui/avatar"

/**
 * Avatar componente demo
 * @returns
 */
export function AvatarDemo() {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-6 md:gap-12 ">
      <Avatar>
        <AvatarImage
          src="/images/logo.svg"
          alt="logo fitflow"
        />
        <AvatarFallback>F</AvatarFallback>
      </Avatar>
    </div>
  )
}
