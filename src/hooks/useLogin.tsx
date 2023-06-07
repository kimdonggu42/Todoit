import { useState } from "react";
import { appAuth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();
  const { dispatch }: any = useContext(AuthContext);

  const login = async (email: string, password: string) => {
    setError(null);
    setIsPending(true);

    try {
      const userCredential = await signInWithEmailAndPassword(appAuth, email, password);
      const user = userCredential.user;
      dispatch({ type: "login", payload: user });
      setError(null);
      setIsPending(false);
      navigate("/");

      // 회원 정보를 정상적으로 받지 못하면 실패
      if (!user) {
        throw new Error("로그인에 실패했습니다.");
      }
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { error, isPending, login };
};
