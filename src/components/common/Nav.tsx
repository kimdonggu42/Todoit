import styled from "styled-components";

const NavContainer = styled.div`
  background-color: #f4f8ff;
  width: 100vw;
  max-width: 20rem;
  height: 100vh;
  padding: 7rem 3rem 7rem 3rem;
  font-size: 1rem;
  border-right: 1px solid #e3e7f7;

  @media screen and (max-width: 750px) {
    display: none;
  }
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  color: #353535;
  font-weight: 500;
  /* border: 1px solid blue; */
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  height: 2rem;
  cursor: pointer;
  /* border: 1px solid green; */
`;

function Nav({ setCurrentMenu }: any) {
  const menuArr = [{ name: "Today" }, { name: "Upcoming" }, { name: "Past" }];

  const selectMenuHandler = (index: number) => {
    setCurrentMenu(index);
  };

  return (
    <NavContainer>
      <MenuList>
        {menuArr.map((menu, index) => {
          return (
            <MenuItem key={index} onClick={() => selectMenuHandler(index)}>
              {menu.name}
            </MenuItem>
          );
        })}
      </MenuList>
    </NavContainer>
  );
}

export default Nav;
