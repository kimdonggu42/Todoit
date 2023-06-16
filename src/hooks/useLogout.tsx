import { useState } from "react";
import { signOut } from "firebase/auth";
import { appAuth } from "../firebase/config";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useLogout = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch }: any = useContext(AuthContext);

  const logout = async () => {
    setIsPending(true);
    setError(null);

    try {
      await signOut(appAuth);
      dispatch({ type: "logout" });
      setIsPending(false);
      setError(null);
    } catch (err: any) {
      setIsPending(false);
      setError(err.message);
    }
  };
  return { logout, isPending, error };
};
