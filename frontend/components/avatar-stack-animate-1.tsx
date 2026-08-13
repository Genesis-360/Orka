import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarStack } from "@/components/kibo-ui/avatar-stack";

export const title = "Animate on hover";

const avatars = [
  { src: "https://github.com/shadcn.png", fallback: "SC" },
  { src: "https://github.com/haydenbleasel.png", fallback: "HB" },
  { src: "https://github.com/leerob.png", fallback: "LR" },
  { src: "https://github.com/vercel.png", fallback: "VC" },
];

const Example = () => (
  <div className="w-full max-w-md">
    <AvatarStack animate>
      {avatars.map((avatar) => (
        <Avatar key={avatar.fallback}>
          <AvatarImage alt={avatar.fallback} src={avatar.src} />
          <AvatarFallback>{avatar.fallback}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarStack>
  </div>
);

export default Example;
