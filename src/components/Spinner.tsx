import styled from "styled-components";
import spinner from "../assets/images/spinner.gif";

export default function Spinner() {
  return (
    <SpinnerContainer>
      <img src={spinner} alt='spinner' />
    </SpinnerContainer>
  );
}

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
