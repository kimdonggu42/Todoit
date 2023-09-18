import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import authspinner from "../assets/images/auth-spinner.gif";
import { LoginFormValueInterface } from "../util/type";
import * as Signup from "./Signup";

export default function Login() {
  const [formValue, setFormValue] = useState<LoginFormValueInterface>({
    email: "",
    password: "",
  });
  const { isPending, login } = useLogin();

  const handleFormValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
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
          name='email'
          placeholder='이메일'
          required
          onChange={handleFormValueChange}
          value={formValue.email}
        />
        <Signup.Input
          type='password'
          name='password'
          placeholder='비밀번호'
          required
          onChange={handleFormValueChange}
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
