import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "CUSTOMER" | "STAFF" | "ADMIN";
    } & DefaultSession["user"];
  }

  interface User {
    role?: "CUSTOMER" | "STAFF" | "ADMIN";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "CUSTOMER" | "STAFF" | "ADMIN";
  }
}
