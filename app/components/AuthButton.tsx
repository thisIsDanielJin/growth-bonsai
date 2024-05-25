import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

export const AuthButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center space-x-2">
        <p>Signed in as: </p>
        <p className="font-bold">{session?.user?.name}</p>
        <button className="btn btn-accent" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }
  return (
    <>
      <button className="btn btn-accent" onClick={() => signIn()}>
        Sign in
      </button>
    </>
  );
};
