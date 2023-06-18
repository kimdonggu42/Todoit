import styled from "styled-components";
import Sidebar from "./Sidebar";
import { useState } from "react";

import { FiPlus, FiMenu } from "react-icons/fi";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 1rem;
  position: relative;
  width: 100%;
  height: 2rem;
  background-color: transparent;
  /* border: 1px solid red; */

  @media screen and (max-width: 740px) {
    justify-content: space-between;
  }
`;

const SidebarOpenBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.8rem;
  height: 1.8rem;
  border: none;
  background-color: transparent;

  &:hover {
    opacity: 0.5;
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
  background-color: transparent;
  border: none;
  color: black;
  margin-right: 1.2rem;
  /* border: 1px solid red; */

  &:hover {
    opacity: 0.5;
  }
`;

const Nickname = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
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
  const [isOpen, setIsOpen] = useState(false);

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
      <SidebarOpenBtn onClick={sidebarOpen}>
        <FiMenu size={23} />
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
          <FiPlus size={23} />
        </AddTodoBtn>
        <Nickname>{`${displayName} 님`}</Nickname>
      </BtnArea>
    </HeaderContainer>
  );
}

export default Header;
