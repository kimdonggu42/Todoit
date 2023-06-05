import styled from "styled-components";

const AsideContainer = styled.div`
  width: 25rem;
  /* height: calc(100vh - 3rem); */
  height: 100vh;
  font-size: 1rem;
  border-left: 1px solid #e3e7f7;

  @media screen and (max-width: 1300px) {
    display: none;
  }
`;

function Aside() {
  return <AsideContainer>Aside</AsideContainer>;
}

export default Aside;
