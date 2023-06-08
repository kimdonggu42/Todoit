import styled from "styled-components";

const AsideContainer = styled.aside`
  width: 25rem;
  height: calc(100vh - 3rem);
  font-size: 1rem;
  padding: 3rem 2rem 3rem 2rem;
  border-left: 1px solid #e3e7f7;
  overflow-y: scroll;

  @media screen and (max-width: 1300px) {
    display: none;
  }
`;

const AsideTitle = styled.div`
  font-size: 1.7rem;
  font-weight: 500;
  color: #5d616b;
  margin-bottom: 2.5rem;
  /* border: 1px solid lime; */
`;

const AsideList = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #353535;
  row-gap: 1.5rem;
  list-style: none;
  /* border: 1px solid blue; */
`;

const AsideItem = styled.li`
  display: flex;
  flex-direction: column;
  width: 19rem;
  height: 9rem;
  padding: 1.5rem;
  background-color: #ffeeaf;
  border-radius: 1rem;
  box-shadow: 2px 2px 4px 0px rgba(235, 235, 235, 1);
  transition: 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

function Aside({ todayTodoData }: any) {
  return (
    <AsideContainer>
      <AsideTitle>Today Important</AsideTitle>
      <AsideList>
        {todayTodoData
          .filter((value: any) => value.important === true)
          .map((value: any, index: number) => {
            return (
              <AsideItem key={index}>
                <div>{value.content}</div>
                <div>{value.createdAt}</div>
              </AsideItem>
            );
          })}
      </AsideList>
    </AsideContainer>
  );
}

export default Aside;
