import styled from "styled-components";

const AsideContainer = styled.aside`
  width: 25rem;
  font-size: 1rem;
  padding: 3rem 2rem 3rem 2rem;
  border-left: 1px solid #dddddd;
  overflow-y: auto;

  @media screen and (max-width: 1300px) {
    display: none;
  }
`;

const AsideTitle = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  font-size: 1.6rem;
  font-weight: 600;
  color: #353535;
  margin-bottom: 2.5rem;
  /* border: 1px solid lime; */

  > .importantCount {
    font-size: 1.4rem;
    color: #878787;
  }
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

  > .importantDate {
    font-size: 0.8rem;
  }

  &:hover {
    transform: scale(1.02);
  }
`;

function Aside({ importantTodoData }: any) {
  return (
    <AsideContainer>
      <AsideTitle>
        <div>중요한 일</div>
        <div className='importantCount'>{importantTodoData.length}</div>
      </AsideTitle>
      <AsideList>
        {importantTodoData
          .filter((value: any) => value.isImportant)
          .map((value: any, index: number) => {
            return (
              <AsideItem key={index}>
                <div>{value.todoBody}</div>
                <div className='importantDate'>{value.todoDate}</div>
              </AsideItem>
            );
          })}
      </AsideList>
    </AsideContainer>
  );
}

export default Aside;
