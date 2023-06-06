import { useState } from "react";
import { signOut } from "firebase/auth";
import { appAuth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      await signOut(appAuth);
      setError(null);
      setIsPending(false);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userNickname");
      navigate("/login");
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { error, isPending, logout };
};
