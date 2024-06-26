import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
export default function UserAvatar({
  size,
  name,
  src,
  alt,
  status = "online",
}) {
  const statusClasses = {
    online: "green.500",
    offline: "gray.500",
    busy: "red.500",
  };
  return (
    <div>
      <Avatar size={size} name={name ? name : ""} src={src} alt={alt}>
        <AvatarBadge boxSize="0.9em" bg={statusClasses[status]} />
      </Avatar>
    </div>
  );
}
