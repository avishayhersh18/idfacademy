"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { LoginTexts } from "@/HebrewStrings/Texts";

const Login = () => {
  const { data: sessionData } = useSession();
  const handleButtonClick = async () => {
    if (!sessionData?.user) signIn("auth0", { callbackUrl: "/home" });

    else signOut();
  };

  return (
    <button onClick={handleButtonClick} className="">
      {sessionData?.user ? "Logout" : LoginTexts.login}
    </button>
  );
};

export default Login;
