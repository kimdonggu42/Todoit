import styled from "styled-components";
import { useLogout } from "../hooks/useLogout";
import { FcPlanner, FcIdea, FcOpenedFolder, FcLeft } from "react-icons/fc";

export default function Nav({
  currentMenu,
  setCurrentMenu,
  todayCount,
  upComingCount,
  pastCount,
}: any) {
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
              <FcPlanner size={22} />
              <div>오늘 할 일</div>
            </div>
            <div className='todocount'>{todayCount}</div>
          </li>
          <li
            className={currentMenu === 1 ? "menu focused" : "menu"}
            onClick={() => selectMenuHandler(1)}
          >
            <div className='menutext'>
              <FcIdea size={22} />
              <div>해야 할 일</div>
            </div>
            <div className='todocount'>{upComingCount}</div>
          </li>
          <li
            className={currentMenu === 2 ? "menu focused" : "menu"}
            onClick={() => selectMenuHandler(2)}
          >
            <div className='menutext'>
              <FcOpenedFolder size={22} />
              <div>지나간 할 일</div>
            </div>
            <div className='todocount'>{pastCount}</div>
          </li>
        </MenuList>
        <Logout onClick={logout}>
          <FcLeft size={22} />
          <span className='nav-name'>로그아웃</span>
        </Logout>
      </MenuListArea>
    </NavContainer>
  );
}

const NavContainer = styled.div`
  width: 100vw;
  max-width: 19rem;
  padding: 3rem 1rem 1rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  background-color: #f7f9fb;

  @media screen and (max-width: 740px) {
    display: none;
  }
`;

const MenuListArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  color: #353535;
`;

const MenuList = styled.ul`
  list-style: none;

  > .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3rem;
    padding: 0 1rem 0 1rem;
    border-radius: 0.5rem;
    cursor: pointer;

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
  padding: 0 1rem 0 1rem;
  border-radius: 0.5rem;
  border: none;
  background-color: transparent;
  cursor: pointer;

  > .nav-name {
    margin-left: 1rem;
  }

  &:hover {
    background-color: #eeeeee;
  }
`;
