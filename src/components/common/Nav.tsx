import styled from "styled-components";

const NavContainer = styled.div`
  background-color: #f4f8ff;
  width: 100vw;
  max-width: 20rem;
  min-width: 15rem;
  height: 100vh;
  padding: 7rem 3rem 7rem 3rem;
  font-size: 1rem;
  border: 1px solid red;
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  color: #353535;
  font-weight: 500;
  border: 1px solid blue;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  height: 2rem;
  border: 1px solid green;
  cursor: pointer;
`;

function Nav() {
  return (
    <NavContainer>
      <MenuList>
        <MenuItem>Today</MenuItem>
        <MenuItem>Upcoming</MenuItem>
        <MenuItem>Past</MenuItem>
      </MenuList>
    </NavContainer>
  );
}

export default Nav;
