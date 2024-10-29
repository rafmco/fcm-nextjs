import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type User =
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    }
  | undefined;

type Props = {
  user: User;
};

export default function UserCard({ user }: Props) {
  const userImage = user ? (
    <>
      <div className="flex justify-between pt-6">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user?.image as string | undefined} />
            <AvatarFallback className="text-black bg-muted-foreground">
              {user?.name?.split(" ")[0][0]}
              {user?.name?.split(" ")[1][0]}
            </AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-semibold text-muted-foreground">
              {user?.name}
            </h3>
            <span className="block text-xs text-muted-foreground">
              {user?.email}
            </span>
          </div>
        </div>
      </div>
    </>
  ) : null;

  return <div className="flex flex-row itens-start">{userImage}</div>;
}
