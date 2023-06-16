import { useState } from "react";
import { appAuth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useSignup = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch }: any = useContext(AuthContext);

  const signup = async (email: string, password: string, displayName: string) => {
    setError(null);
    setIsPending(true);

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
        setError(null);
        setIsPending(false);
      } catch (err: any) {
        setError(err.message);
        setIsPending(false);
      }
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { error, isPending, signup };
};
