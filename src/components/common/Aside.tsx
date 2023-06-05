import styled from "styled-components";

const AsideContainer = styled.div`
  border: 1px solid blue;
  width: 100vw;
  max-width: 25rem;
  height: 100vh;
  font-size: 1rem;
`;

function Aside() {
  return <AsideContainer>Aside</AsideContainer>;
}

export default Aside;
