import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import authspinner from "../assets/images/auth-spinner.gif";
import { LoginFormValueInterface } from "../util/type";
import * as Signup from "./Signup";

function Login() {
  const [formValue, setFormValue] = useState<LoginFormValueInterface>({
    email: "",
    password: "",
  });
  const { isPending, login } = useLogin();

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "email") {
      setFormValue({ ...formValue, email: e.target.value });
    } else if (e.target.type === "password") {
      setFormValue({ ...formValue, password: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formValue.email, formValue.password);
  };

  return (
    <Signup.SignupContainer>
      <Signup.Logo>로그인</Signup.Logo>
      <Signup.FormArea onSubmit={handleSubmit}>
        <Signup.Input
          type='email'
          placeholder='이메일'
          required
          onChange={handleData}
          value={formValue.email}
        />
        <Signup.Input
          type='password'
          placeholder='비밀번호'
          required
          onChange={handleData}
          value={formValue.password}
        />
        <Signup.SignupBtn type='submit'>
          {isPending ? <img src={authspinner} alt='authspinner' /> : "로그인"}
        </Signup.SignupBtn>
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
