// Context Imports
import { NextAuthProvider } from "@/contexts/nextAuthProvider";

const Providers = (props) => {
  const { children } = props;
  return (
    <NextAuthProvider basePath={process.env.NEXTAUTH_BASEPATH}>
      {children}
    </NextAuthProvider>
  );
};

export default Providers;
