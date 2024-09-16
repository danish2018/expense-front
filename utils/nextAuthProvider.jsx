"use client";

import TokenExpirationHandler from "@/components/section/TokenExpirationHandler";
// Third-party Imports
import { SessionProvider } from "next-auth/react";

export const NextAuthProvider = ({ children, ...rest }) => {
  return (
    <SessionProvider {...rest}>
      {children}
    </SessionProvider>
  );
};
