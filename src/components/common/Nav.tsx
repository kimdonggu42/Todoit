import styled from "styled-components";

import { FaRegLightbulb, FaRegStickyNote } from "react-icons/fa";
import { BsCalendar } from "react-icons/bs";

const NavContainer = styled.div`
  background-color: #f4f8ff;
  width: 100vw;
  max-width: 20rem;
  height: 100vh;
  padding: 6rem 0 6rem 0;
  font-size: 1.1rem;
  border-right: 1px solid #e3e7f7;

  @media screen and (max-width: 750px) {
    display: none;
  }
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  color: #353535;
  font-weight: 500;
  /* border: 1px solid blue; */
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  height: 3rem;
  cursor: pointer;
  padding: 0 3rem 0 3rem;
  /* border: 1px solid green; */

  > .nav-name {
    margin-left: 1rem;
  }

  &:hover {
    background-color: #e3e7f7;
  }
`;

function Nav({ setCurrentMenu }: any) {
  const selectMenuHandler = (index: number) => {
    setCurrentMenu(index);
  };

  return (
    <NavContainer>
      <MenuList>
        <MenuItem onClick={() => selectMenuHandler(0)}>
          <FaRegLightbulb size={18} />
          <span className='nav-name'>Today</span>
        </MenuItem>
        <MenuItem onClick={() => selectMenuHandler(1)}>
          <BsCalendar size={18} />
          <span className='nav-name'>Upcoming</span>
        </MenuItem>
        <MenuItem onClick={() => selectMenuHandler(2)}>
          <FaRegStickyNote size={18} />
          <span className='nav-name'>Past</span>
        </MenuItem>
      </MenuList>
    </NavContainer>
  );
}

export default Nav;
