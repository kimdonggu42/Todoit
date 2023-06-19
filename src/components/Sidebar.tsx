import styled from "styled-components";
import { useLogout } from "../hooks/useLogout";

import { IoClose } from "react-icons/io5";
import { FcPlanner, FcIdea, FcOpenedFolder, FcLeft } from "react-icons/fc";

const BackDrop = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);

  > .displayNone {
    z-index: 999;
    background-color: #f7f9fb;
    height: 100%;
    width: 17rem;
    left: -200px;
    position: fixed;
    transition: 0.2s ease;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.19), 0 10px 10px rgba(0, 0, 0, 0.1);
  }

  > .open {
    left: 0;
  }

  @media screen and (min-width: 741px) {
    display: none;
  }
`;

const SideHeader = styled.div`
  display: flex;
  align-items: center;
  height: 2.5rem;
  background-color: #1b9c85;
`;

const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.8rem;
  height: 1.8rem;
  margin-left: 1rem;
  border: none;
  border-radius: 0.3rem;
  color: white;
  background-color: transparent;
  /* margin: 1rem 2rem 1rem 2rem; */

  &:hover {
    background-color: #56b09e;
  }

  @media screen and (max-width: 450px) {
    /* margin: 0.5rem 1rem 0.5rem 1rem; */
  }
`;

const MenuListArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 2.5rem);
  color: #353535;
  padding: 3rem 1rem 1rem 1rem;
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
    padding: 0 1rem 0 1rem;
    border-radius: 0.5rem;
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
  padding: 0 1rem 0 1rem;
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

function SideBar({
  isOpen,
  setIsOpen,
  currentMenu,
  setCurrentMenu,
  todayCount,
  upComingCount,
  pastCount,
}: any) {
  const sideBarCloseHandle = () => {
    setIsOpen(false);
    // 모달 창 오픈 시 뒷 페이지 스크롤 방지 해제
    const scrollY = document.body.style.top;
    document.body.style.cssText = "";
    window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
  };

  const { logout } = useLogout();

  const selectMenuHandler = (index: number) => {
    setCurrentMenu(index);
    setIsOpen(false);
  };

  return (
    <BackDrop>
      <div className={`displayNone ${isOpen ? "open" : null}`}>
        <SideHeader>
          <CloseButton onClick={sideBarCloseHandle}>
            <IoClose size={24} />
          </CloseButton>
        </SideHeader>
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
      </div>
    </BackDrop>
  );
}

export default SideBar;
