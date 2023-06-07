import { useState } from "react";
import { appAuth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useSignup = () => {
  // 에러 정보
  const [error, setError] = useState(null);
  // 현재 서버와 통신중인 상태
  const [isPending, setIsPending] = useState(false);
  const { dispatch }: any = useContext(AuthContext);

  const navigate = useNavigate();

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
        dispatch({ type: "login", payload: user });
        setError(null);
        setIsPending(false);
        navigate("/login");
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
