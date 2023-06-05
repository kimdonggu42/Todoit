import styled from "styled-components";
import Header from "../components/common/Header";
import Nav from "../components/common/Nav";
import Aside from "../components/common/Aside";
import TodoMain from "../components/main/TodoMain";
import { useState } from "react";

const MainPageContainer = styled.div`
  display: flex;
`;

function MainPage() {
  const [currentMenu, setCurrentMenu] = useState<number>(0);

  return (
    <>
      {/* <Header /> */}
      <MainPageContainer>
        <Nav setCurrentMenu={setCurrentMenu} />
        <TodoMain currentMenu={currentMenu} />
        <Aside />
      </MainPageContainer>
    </>
  );
}

export default MainPage;
