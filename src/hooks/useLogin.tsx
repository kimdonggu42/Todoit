import { useState } from "react";
import { appAuth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch }: any = useContext(AuthContext);

  const login = async (email: string, password: string) => {
    setError(null);
    setIsPending(true);

    try {
      const userCredential = await signInWithEmailAndPassword(appAuth, email, password);
      const user = userCredential.user;
      dispatch({ type: "login", payload: user });
      setIsPending(false);
      setError(null);

      // 회원 정보를 정상적으로 받지 못하면 실패
      if (!user) {
        throw new Error("로그인에 실패했습니다.");
      }
    } catch (err: any) {
      setIsPending(false);
      setError(err.message);
    }
  };

  return { error, isPending, login };
};
