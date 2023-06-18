import { useState } from "react";
import { appAuth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { toast } from "react-toastify";

export const useSignup = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const { dispatch }: any = useContext(AuthContext);

  const signup = async (email: string, password: string, displayName: string) => {
    setIsPending(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(appAuth, email, password);
      const user = userCredential.user;

      // 회원 정보를 정상적으로 받지 못하면 실패
      if (!user) {
        throw new Error("회원가입에 실패했습니다.");
      }

      try {
        await updateProfile(appAuth.currentUser, { displayName });
        dispatch({ type: "signup", payload: user });
        setIsPending(false);
        setError(null);
      } catch (err: any) {
        setIsPending(false);
        setError(err.message);
      }
      toast.success(`${user.displayName} 님 환영합니다.`);
    } catch (err: any) {
      setIsPending(false);
      setError(err.message);
      if (String(err).includes("auth/email-already-in-use")) {
        toast.error("이미 사용중인 이메일입니다.");
      }
    }
  };

  return { signup, isPending, error };
};
