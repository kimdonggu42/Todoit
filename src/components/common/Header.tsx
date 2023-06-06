import styled from "styled-components";

import { FiPlus } from "react-icons/fi";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 4rem;
  padding: 0 3rem 0 3rem;
  font-size: 1rem;
  /* border: 1px solid blue; */

  @media screen and (max-width: 450px) {
    padding: 0 1rem 0 1rem;
  }
`;

const AddTodoBtn = styled.button`
  color: #353535;
  /* border: 1px solid red; */
  cursor: pointer;
`;

function Header({ addModalOpen, setAddModalOpen }: any) {
  const openAddModalHandler = () => {
    setAddModalOpen(!addModalOpen);
  };

  return (
    <HeaderContainer>
      <AddTodoBtn onClick={openAddModalHandler}>
        <FiPlus size={28} />
      </AddTodoBtn>
    </HeaderContainer>
  );
}

export default Header;
