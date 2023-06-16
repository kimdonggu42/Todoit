import styled from "styled-components";
import { useLogout } from "../hooks/useLogout";
import { useState, useEffect, useRef } from "react";
import todoIcon from "../../src/assets/images/todoIcon.png";

import { FiPlus } from "react-icons/fi";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 1rem;
  position: relative;
  width: 100%;
  height: 3rem;
  padding: 0 3rem 0 3rem;
  background-color: #fed049;

  @media screen and (max-width: 450px) {
    padding: 0 1.5rem 0 1.5rem;
  }
`;

const HeaderBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  border: none;
  color: white;
  margin-right: 1.2rem;
  /* border: 1px solid red; */
`;

const UserIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.8rem;
  height: 1.8rem;
  background-color: #f7c04a;
  border-radius: 5rem;
  cursor: pointer;
`;

const UserImage = styled.img`
  width: 1rem;
  height: 1rem;
`;

const Dropdown = styled.ul`
  display: flex;
  flex-direction: column;
  width: 9rem;
  border-radius: 0.3rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
  background-color: white;
  position: absolute;
  top: 2.8rem;
  right: 4.5rem;
  list-style: none;
  z-index: 999;
  cursor: pointer;

  > li {
    padding: 0.5rem 0.8rem 0.5rem 0.8rem;

    &:hover {
      border-radius: 0.3rem;
      background-color: #f7f7f7;
    }
  }

  @media screen and (max-width: 450px) {
    right: 2.5rem;
  }
`;

function Header({ addModalOpen, setAddModalOpen }: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropMenuRef = useRef<HTMLDivElement | null>(null);
  const { logout } = useLogout();

  // task 추가 모달 오픈
  const openAddModalHandler = () => {
    setAddModalOpen(!addModalOpen);
  };

  // 드론다운 오픈
  const openDropdown = (e: any) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleOutsideClose = (e: any) => {
      if (isOpen && !dropMenuRef.current?.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("click", handleOutsideClose);
    return () => document.removeEventListener("click", handleOutsideClose);
  }, [isOpen]);

  return (
    <HeaderContainer>
      <HeaderBtn onClick={openAddModalHandler}>
        <FiPlus size={28} />
      </HeaderBtn>
      <UserIcon onClick={openDropdown}>
        <UserImage src={todoIcon} alt='userimage' />
      </UserIcon>
      <div ref={dropMenuRef}>
        {isOpen ? (
          <Dropdown>
            <li onClick={logout}>Logout</li>
          </Dropdown>
        ) : null}
      </div>
    </HeaderContainer>
  );
}

export default Header;
