import { useState } from "react";
import { appAuth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { toast } from "react-toastify";

export const useLogin = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const { dispatch }: any = useContext(AuthContext);

  const login = async (email: string, password: string) => {
    setIsPending(true);
    setError(null);

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
      if (String(err).includes("auth/user-not-found")) {
        toast.error("회원가입되어 있지 않은 이메일입니다.");
      } else if (String(err).includes("auth/wrong-password")) {
        toast.error("비밀번호를 다시 확인해 주세요.");
      } else if (String(err).includes("auth/too-many-requests")) {
        toast.error("잠시 후 다시 로그인해 주세요.");
      }
    }
  };

  return { login, isPending, error };
};
