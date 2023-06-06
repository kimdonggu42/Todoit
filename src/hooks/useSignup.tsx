import { useState } from "react";
import { appAuth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  // 에러 정보
  const [error, setError] = useState(null);
  // 현재 서버와 통신중인 상태
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();

  const signup = async (email: string, password: string, displayName: string) => {
    setError(null); // 아직 에러가 없으니 null
    setIsPending(true); // 통신중이므로 true

    try {
      const userCredential = await createUserWithEmailAndPassword(appAuth, email, password);
      const user = userCredential.user;

      // 회원 정보를 정상적으로 받지 못하면 실패
      if (!user) {
        throw new Error("회원가입에 실패했습니다.");
      }

      try {
        await updateProfile(appAuth.currentUser, { displayName });
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

    // createUserWithEmailAndPassword(appAuth, email, password)
    //   .then((userCredential) => {
    //     const user = userCredential.user;

    //     // 회원 정보를 정상적으로 받지 못하면 실패
    //     if (!user) {
    //       throw new Error("회원가입에 실패했습니다.");
    //     }

    //     // 회원가입이 완료되고 유저 정보에 닉네임을 업데이트
    //     updateProfile(appAuth.currentUser, { displayName })
    //       .then(() => {
    //         setError(null);
    //         setIsPending(false);
    //       })
    //       .catch((err) => {
    //         setError(err.message);
    //         setIsPending(false);
    //       });
    //   })
    //   .catch((err) => {
    //     setError(err.message);
    //     setIsPending(false);
    //   });
  };

  return { error, isPending, signup };
};
