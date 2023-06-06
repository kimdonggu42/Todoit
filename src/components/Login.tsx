import styled from "styled-components";
import { useState } from "react";

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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleData = (e: any) => {
    if (e.target.type === "email") {
      setEmail(e.target.value);
    } else if (e.target.type === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FieldsetArea>
        <legend>로그인</legend>
        <input type='email' placeholder='email' required onChange={handleData} value={email} />
        <input
          type='password'
          placeholder='password'
          required
          onChange={handleData}
          value={password}
        />
        <button type='submit'>로그인</button>
      </FieldsetArea>
    </FormContainer>
  );
}

export default Login;
