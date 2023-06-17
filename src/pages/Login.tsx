import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import * as Signup from "./Signup";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isPending, login } = useLogin();

  const handleData = (e: any) => {
    if (e.target.type === "email") {
      setEmail(e.target.value);
    } else if (e.target.type === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <Signup.SignupContainer>
      <Signup.Logo>로그인</Signup.Logo>
      <Signup.FormArea onSubmit={handleSubmit}>
        <Signup.Input
          type='email'
          placeholder='email'
          required
          onChange={handleData}
          value={email}
        />
        <Signup.Input
          type='password'
          placeholder='password'
          required
          onChange={handleData}
          value={password}
        />
        <Signup.SignupBtn type='submit'>{isPending ? "로그인 진행중" : "로그인"}</Signup.SignupBtn>
        {error && <strong>{error}</strong>}
      </Signup.FormArea>
      <Signup.MovePageButton>
        <span>Todo!t이 처음이신가요?</span>
        <Link to='/signup'>
          <button>회원가입</button>
        </Link>
      </Signup.MovePageButton>
    </Signup.SignupContainer>
  );
}

export default Login;