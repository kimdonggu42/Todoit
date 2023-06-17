import styled from "styled-components";

const AsideContainer = styled.aside`
  width: 25rem;
  font-size: 1rem;
  padding: 4rem 2rem 4rem 2rem;
  border-left: 1px solid #e3e7f7;
  overflow-y: auto;

  @media screen and (max-width: 1300px) {
    display: none;
  }
`;

const AsideTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
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
  row-gap: 0.5rem;
  width: 20rem;
  min-height: 5rem;
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: #fff8d6;
  box-shadow: 2px 2px 4px 0px rgba(235, 235, 235, 1);
  transition: 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

function Aside({ importantTodoData }: any) {
  return (
    <AsideContainer>
      <AsideTitle>중요한 할 일</AsideTitle>
      <AsideList>
        {importantTodoData
          .filter((value: any) => value.isImportant)
          .map((value: any, index: number) => {
            return (
              <AsideItem key={index}>
                <div>{value.todoBody}</div>
                <div>{value.todoDate}</div>
              </AsideItem>
            );
          })}
      </AsideList>
    </AsideContainer>
  );
}

export default Aside;
