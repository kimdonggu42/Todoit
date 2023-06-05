import styled from "styled-components";
import Nav from "../components/common/Nav";
import Aside from "../components/common/Aside";
import TodoMain from "../components/main/TodoMain";

const MainPageContainer = styled.div`
  display: flex;
`;

function MainPage() {
  return (
    <MainPageContainer>
      <Nav />
      <TodoMain />
      <Aside />
    </MainPageContainer>
  );
}

export default MainPage;
