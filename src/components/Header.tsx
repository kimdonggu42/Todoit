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

const HeaderBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  border: none;
  color: black;
  margin-right: 1.2rem;
  /* border: 1px solid red; */
`;

function Header({ addModalOpen, setAddModalOpen }: any) {
  // task 추가 모달 오픈
  const openAddModalHandler = () => {
    setAddModalOpen(!addModalOpen);
  };

  return (
    <HeaderContainer>
      <HeaderBtn onClick={openAddModalHandler}>
        <FiPlus size={28} />
      </HeaderBtn>
    </HeaderContainer>
  );
}

export default Header;
