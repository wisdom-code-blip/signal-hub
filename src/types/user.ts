export type UserRole = "buyer" | "provider" | "admin";

export type AppUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  verified?: boolean;
  avatarUrl?: string;
};