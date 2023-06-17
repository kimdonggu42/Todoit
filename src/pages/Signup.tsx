import styled from "styled-components";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";

export const SignupContainer = styled.div`
  font-size: 1rem;
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
  /* border: 1px solid red; */
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
  width: 100%;
  height: 3rem;
  border: none;
  border-radius: 0.3rem;
  margin-top: 1rem;
  color: white;
  font-weight: 600;
  background-color: #fed049;
  cursor: pointer;
`;

export const MovePageButton = styled.div`
  margin-top: 1rem;

  > a > button {
    font-size: 1rem;
    margin-left: 0.3rem;
    font-weight: 500;
    border: none;
    color: #fed049;
    background-color: transparent;
  }
`;

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { error, isPending, signup } = useSignup();

  const handleData = (e: any) => {
    if (e.target.type === "email") {
      setEmail(e.target.value);
    } else if (e.target.type === "password") {
      setPassword(e.target.value);
    } else if (e.target.type === "text") {
      setDisplayName(e.target.value);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <SignupContainer>
      <Logo>회원가입</Logo>
      <FormArea onSubmit={handleSubmit}>
        <Input
          type='text'
          placeholder='nickname'
          required
          onChange={handleData}
          value={displayName}
        />
        <Input type='email' placeholder='email' required onChange={handleData} value={email} />
        <Input
          type='password'
          placeholder='password'
          required
          onChange={handleData}
          value={password}
        />
        <SignupBtn type='submit'>{isPending ? "회원가입 진행중" : "회원가입"}</SignupBtn>
        {error && <strong>{error}</strong>}
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

export default Signup;
