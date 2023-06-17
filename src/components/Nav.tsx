import styled from "styled-components";
import { useLogout } from "../hooks/useLogout";

import { FaRegLightbulb, FaRegStickyNote } from "react-icons/fa";
import { BsCalendar } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

const NavContainer = styled.div`
  width: 100vw;
  max-width: 19rem;
  padding: 6rem 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 500;
  background-color: #f4f8ff;
  border-right: 1px solid #e3e7f7;

  @media screen and (max-width: 750px) {
    display: none;
  }
`;

const MenuListArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  color: #353535;
  /* border: 1px solid red; */
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  /* border: 1px solid blue; */
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  height: 3rem;
  padding: 0 3rem 0 3rem;
  cursor: pointer;
  /* border: 1px solid green; */

  > .nav-name {
    margin-left: 1rem;
  }

  &:hover {
    background-color: #e3e7f7;
  }
`;

const Logout = styled.button`
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  height: 3rem;
  padding: 0 3rem 0 3rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  /* border: 1px solid green; */

  > .nav-name {
    margin-left: 1rem;
  }

  &:hover {
    background-color: #e3e7f7;
  }
`;

function Nav({ setCurrentMenu }: any) {
  const { logout } = useLogout();

  const selectMenuHandler = (index: number) => {
    setCurrentMenu(index);
  };

  return (
    <NavContainer>
      <MenuListArea>
        <MenuList>
          <MenuItem onClick={() => selectMenuHandler(0)}>
            <FaRegLightbulb />
            <span className='nav-name'>오늘 할 일</span>
          </MenuItem>
          <MenuItem onClick={() => selectMenuHandler(1)}>
            <BsCalendar />
            <span className='nav-name'>해야 할 일</span>
          </MenuItem>
          <MenuItem onClick={() => selectMenuHandler(2)}>
            <FaRegStickyNote />
            <span className='nav-name'>지나간 할 일</span>
          </MenuItem>
        </MenuList>
        <Logout onClick={logout}>
          <BiLogOut />
          <span className='nav-name'>로그아웃</span>
        </Logout>
      </MenuListArea>
    </NavContainer>
  );
}

export default Nav;
