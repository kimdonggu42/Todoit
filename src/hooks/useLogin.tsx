import { useState } from "react";
import { appAuth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setError(null); // 아직 에러가 없으니 null
    setIsPending(true); // 통신중이므로 true

    try {
      const userCredential = await signInWithEmailAndPassword(appAuth, email, password);
      const user: any = userCredential.user;
      setError(null);
      setIsPending(false);

      if (user) {
        localStorage.setItem("accessToken", JSON.stringify(user.accessToken));
        localStorage.setItem("userNickname", JSON.stringify(user.displayName));
        navigate("/todo");
      }

      // 회원 정보를 정상적으로 받지 못하면 실패
      if (!user) {
        throw new Error("로그인에 실패했습니다.");
      }
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
    }

    // signInWithEmailAndPassword(appAuth, email, password)
    //   .then((userCredential) => {
    //     const user: any = userCredential.user;

    //     setError(null);
    //     setIsPending(false);

    //     if (user) {
    //       localStorage.setItem("accessToken", JSON.stringify(user.accessToken));
    //       localStorage.setItem("userNickname", JSON.stringify(user.displayName));
    //       navigate("/todo");
    //     }

    //     // 회원 정보를 정상적으로 받지 못하면 실패
    //     if (!user) {
    //       throw new Error("회원가입에 실패했습니다.");
    //     }
    //   })
    //   .catch((err) => {
    //     setError(err.message);
    //     setIsPending(false);
    //   });
  };

  return { error, isPending, login };
};
