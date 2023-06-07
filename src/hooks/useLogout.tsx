import { useState } from "react";
import { signOut } from "firebase/auth";
import { appAuth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();
  const { dispatch }: any = useContext(AuthContext);

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      await signOut(appAuth);
      dispatch({ type: "logout" });
      setError(null);
      setIsPending(false);
      navigate("/login");
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { error, isPending, logout };
};
