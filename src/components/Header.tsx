import styled from "styled-components";

import { FiPlus } from "react-icons/fi";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 1rem;
  position: relative;
  width: 100%;
  height: 2rem;
  background-color: transparent;
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
`;

const Nickname = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  /* border: 1px solid red; */
`;

function Header({ addModalOpen, setAddModalOpen, displayName }: any) {
  // task 추가 모달 오픈
  const openAddModalHandler = () => {
    setAddModalOpen(!addModalOpen);
  };

  return (
    <HeaderContainer>
      <AddTodoBtn onClick={openAddModalHandler}>
        <FiPlus size={25} />
      </AddTodoBtn>
      <Nickname>{`${displayName} 님`}</Nickname>
    </HeaderContainer>
  );
}

export default Header;
