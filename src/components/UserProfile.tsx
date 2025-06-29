import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';



export default function UserProfile() {
  return (
    <Avatar>
      <AvatarImage
        className="w-11 h-11 rounded-full"
        src={comment.user_thumbnail_url}
      />
      <AvatarFallback className="w-11 h-11 bg-gray-200 text-gray-500 text-[46px] rounded-full">
        {comment.user_name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
