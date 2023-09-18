import styled from "styled-components";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";
import authspinner from "../assets/images/auth-spinner.gif";
import { SignupFormValueInterface } from "../util/type";

export default function Signup() {
  const [formValue, setFormValue] = useState<SignupFormValueInterface>({
    email: "",
    password: "",
    displayName: "",
  });
  const { isPending, signup } = useSignup();

  const handleFormValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(formValue.email, formValue.password, formValue.displayName);
  };

  return (
    <SignupContainer>
      <Logo>회원가입</Logo>
      <FormArea onSubmit={handleSubmit}>
        <Input
          type='text'
          name='displayName'
          placeholder='이름'
          required
          onChange={handleFormValueChange}
          value={formValue.displayName}
        />
        <Input
          type='email'
          name='email'
          placeholder='이메일'
          required
          onChange={handleFormValueChange}
          value={formValue.email}
        />
        <Input
          type='password'
          name='password'
          placeholder='비밀번호'
          required
          onChange={handleFormValueChange}
          value={formValue.password}
        />
        <SignupBtn type='submit'>
          {isPending ? <img src={authspinner} alt='authspinner' /> : "회원가입"}
        </SignupBtn>
      </FormArea>
      <MovePageButton>
        <span>이미 계정이 있으신가요?</span>
        <Link to='/login'>
          <button>로그인</button>
        </Link>
      </MovePageButton>
    </SignupContainer>
  );
}

export const SignupContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Logo = styled.div`
  font-size: 2rem;
  font-weight: 500;
  color: #353535;
  margin-bottom: 1rem;
`;

export const FormArea = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1rem;
  width: 90vw;
  max-width: 25rem;
  padding: 2rem;
  border-radius: 0.3rem;
  border: none;
  border: 1px solid #dddddd;
`;

export const Input = styled.input`
  font-size: 1rem;
  width: 100%;
  height: 3rem;
  border-radius: 0.3rem;
  padding: 0.5rem 0.7rem 0.5rem 0.7rem;
  color: #353535;
  border: none;
  border: 1px solid #dddddd;

  &:focus {
    outline: none;
  }
`;

export const SignupBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  width: 100%;
  height: 3rem;
  border: none;
  border-radius: 0.3rem;
  margin-top: 1rem;
  color: white;
  font-weight: 600;
  background-color: #1b9c85;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const MovePageButton = styled.div`
  font-size: 1rem;
  margin-top: 1rem;

  > a > button {
    font-size: 1rem;
    margin-left: 0.3rem;
    font-weight: 600;
    border: none;
    color: #1b9c85;
    background-color: transparent;
  }
`;
