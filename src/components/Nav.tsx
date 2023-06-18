import styled from "styled-components";
import { useLogout } from "../hooks/useLogout";

import { FaRegLightbulb, FaRegStickyNote } from "react-icons/fa";
import { BsCalendar } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

const NavContainer = styled.div`
  width: 100vw;
  max-width: 19rem;
  padding: 6rem 0 1rem 0;
  font-size: 1rem;
  font-weight: 500;
  background-color: #f7f9fb;

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
  list-style: none;
  /* border: 1px solid blue; */

  > .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3rem;
    padding: 0 2rem 0 2rem;
    cursor: pointer;
    /* border: 1px solid blue; */

    > .menutext {
      display: flex;
      align-items: center;
      column-gap: 1rem;
    }

    > .todocount {
      color: #878787;
    }

    &:hover {
      background-color: #eeeeee;
    }
  }

  > .focused {
    background-color: #eeeeee;

    > .todocount {
      color: #1b9c85;
    }
  }
`;

const Logout = styled.button`
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  height: 3rem;
  padding: 0 2rem 0 2rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  /* border: 1px solid green; */

  > .nav-name {
    margin-left: 1rem;
  }

  &:hover {
    background-color: #eeeeee;
  }
`;

function Nav({ currentMenu, setCurrentMenu, todayCount, upComingCount, pastCount }: any) {
  const { logout } = useLogout();

  const selectMenuHandler = (index: number) => {
    setCurrentMenu(index);
  };

  return (
    <NavContainer>
      <MenuListArea>
        <MenuList>
          <li
            className={currentMenu === 0 ? "menu focused" : "menu"}
            onClick={() => selectMenuHandler(0)}
          >
            <div className='menutext'>
              <FaRegLightbulb />
              <div>오늘 할 일</div>
            </div>
            <div className='todocount'>{todayCount}</div>
          </li>
          <li
            className={currentMenu === 1 ? "menu focused" : "menu"}
            onClick={() => selectMenuHandler(1)}
          >
            <div className='menutext'>
              <BsCalendar />
              <div>해야 할 일</div>
            </div>
            <div className='todocount'>{upComingCount}</div>
          </li>
          <li
            className={currentMenu === 2 ? "menu focused" : "menu"}
            onClick={() => selectMenuHandler(2)}
          >
            <div className='menutext'>
              <FaRegStickyNote />
              <div>지나간 할 일</div>
            </div>
            <div className='todocount'>{pastCount}</div>
          </li>
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
