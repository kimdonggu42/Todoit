import styled from "styled-components";

const Test = styled.div`
  display: flex;
  font-size: 1rem;
  margin-top: 5rem;

  > p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

function Login() {
  return (
    <Test>
      <p>일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십</p>
    </Test>
  );
}

export default Login;
