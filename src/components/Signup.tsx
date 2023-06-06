import styled from "styled-components";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const FormContainer = styled.form`
  font-size: 1rem;
`;

const FieldsetArea = styled.fieldset`
  border: 1px solid gray;

  > input {
    border: 1px solid gray;
  }

  > button {
    margin-left: 1rem;
    border: 1px solid gray;
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
    <FormContainer onSubmit={handleSubmit}>
      <FieldsetArea>
        <legend>회원가입</legend>
        <input
          type='text'
          placeholder='nickname'
          required
          onChange={handleData}
          value={displayName}
        />
        <input type='email' placeholder='email' required onChange={handleData} value={email} />
        <input
          type='password'
          placeholder='password'
          required
          onChange={handleData}
          value={password}
        />
        {isPending ? <strong>회원가입 진행중</strong> : <button type='submit'>회원가입</button>}
        {error && <strong>{error}</strong>}
      </FieldsetArea>
    </FormContainer>
  );
}

export default Signup;
