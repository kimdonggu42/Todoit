import styled from "styled-components";
import Sidebar from "./Sidebar";
import { useState } from "react";

import { FiPlus, FiMenu } from "react-icons/fi";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  width: 100%;
  height: 2.5rem;
  padding: 0 2.5rem 0 2.5rem;
  background-color: #1b9c85;
  /* border: 1px solid red; */

  @media screen and (max-width: 740px) {
    padding: 0 1rem 0 1rem;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  /* border: 1px solid red; */

  @media screen and (max-width: 740px) {
    display: none;
  }
`;

const SidebarOpenBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.8rem;
  height: 1.8rem;
  border: none;
  border-radius: 0.3rem;
  color: white;
  background-color: transparent;

  &:hover {
    background-color: #56b09e;
  }

  @media screen and (min-width: 741px) {
    display: none;
  }
`;

const BtnArea = styled.div`
  display: flex;
  align-items: center;
  /* border: 1px solid red; */
`;

const AddTodoBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.8rem;
  height: 1.8rem;
  border: none;
  border-radius: 0.3rem;
  color: white;
  background-color: transparent;
  margin-right: 1.2rem;

  &:hover {
    background-color: #56b09e;
  }
`;

const Nickname = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  color: white;
  /* border: 1px solid red; */
`;

function Header({
  addModalOpen,
  setAddModalOpen,
  displayName,
  currentMenu,
  setCurrentMenu,
  todayCount,
  upComingCount,
  pastCount,
}: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const sidebarOpen = () => {
    setIsOpen(true);
    // 모달 창 오픈 시 뒷 페이지 스크롤 방지
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
  };

  // task 추가 모달 오픈
  const openAddModalHandler = () => {
    setAddModalOpen(!addModalOpen);
  };

  return (
    <HeaderContainer>
      <Logo>Todo!t</Logo>
      <SidebarOpenBtn onClick={sidebarOpen}>
        <FiMenu size={24} />
      </SidebarOpenBtn>
      {isOpen ? (
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          currentMenu={currentMenu}
          setCurrentMenu={setCurrentMenu}
          todayCount={todayCount}
          upComingCount={upComingCount}
          pastCount={pastCount}
        />
      ) : null}
      <BtnArea>
        <AddTodoBtn onClick={openAddModalHandler}>
          <FiPlus size={25} />
        </AddTodoBtn>
        <Nickname>{`${displayName} 님`}</Nickname>
      </BtnArea>
    </HeaderContainer>
  );
}

export default Header;
