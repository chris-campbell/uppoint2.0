import { Session } from "next-auth";

export const getFirstName = (
  fullName: string | undefined | null
): string | undefined => {
  const firstName = fullName?.split(" ");
  return firstName ? firstName[0] : undefined;
};

export const getAvatar = (session: Session) => {
  const defaultAvatar =
    "https://api.dicebear.com/7.x/thumbs/png?seed=guest&randomizeIds=true";
  return (session && session.user && session.user.image) || defaultAvatar;
};
