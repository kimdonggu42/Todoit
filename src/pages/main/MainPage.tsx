import styled from "styled-components";
import Nav from "../../components/Nav";
import TodoMain from "./TodoMain";
import { useState } from "react";
import Header from "../../components/Header";

const MainPageContainer = styled.div`
  display: flex;
`;

function MainPage() {
  const [currentMenu, setCurrentMenu] = useState<number>(0);
  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <>
      <Header addModalOpen={addModalOpen} setAddModalOpen={setAddModalOpen} />
      <MainPageContainer>
        <Nav setCurrentMenu={setCurrentMenu} />
        <TodoMain
          currentMenu={currentMenu}
          addModalOpen={addModalOpen}
          setAddModalOpen={setAddModalOpen}
        />
      </MainPageContainer>
    </>
  );
}

export default MainPage;
