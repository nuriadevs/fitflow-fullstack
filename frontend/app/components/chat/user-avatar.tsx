import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

interface UserAvatarProps {
  userName?: string;
}

/**
 * Componente UserAvatar que muestra un avatar de usuario con iniciales.
 * @param param0
 * @returns
 */
export function UserAvatar({ userName }: UserAvatarProps) {
  const getInitials = (name?: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <Avatar>
      <AvatarImage
        src="https://api.dicebear.com/9.x/fun-emoji/svg?seed=Easton"
        alt={userName || 'Usuario'}
      />
      <AvatarFallback>{getInitials(userName)}</AvatarFallback>
    </Avatar>
  );
}