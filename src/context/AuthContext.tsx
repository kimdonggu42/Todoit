import { createContext, useReducer, ReactNode } from "react";
import { useEffect } from "react";
import { appAuth } from "../firebase/config";
import { AuthReducerActionInterface } from "../util/type";

const authReducer = (state: object, action: AuthReducerActionInterface) => {
  switch (action.type) {
    case "signup":
      return { ...state, user: action.payload };
    case "login":
      return { ...state, user: action.payload };
    case "logout":
      return { ...state, user: null };
    case "isAuthReady":
      return { ...state, user: action.payload, isAuthReady: true };
    default:
      return state;
  }
};

const AuthContext: any = createContext(null);

const initialState = {
  user: null,
  isAuthReady: false,
};

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // onAuthStateChanged : 유저의 인증정보 변화를 관찰하는 함수
    // onAuthStateChanged 함수는 Unsubscribe 함수를 반환한다. 더 이상 유저의 변화를 관찰하지 않도록 하는 함수
    // 새로고침 후 초기에 딱 한번 실행하면 되기 때문에 이후에는 구독을 중지
    const unsubscribe = appAuth.onAuthStateChanged((user: object) => {
      dispatch({ type: "isAuthReady", payload: user });
    });
    return unsubscribe;
  }, []);

  return (
    // { state(user, isAuthReady), dispatch } 두 가지 값이 context객체를 통해 접근할 수 있는 값이 된다.
    <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
