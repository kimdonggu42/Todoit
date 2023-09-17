import styled from "styled-components";

export default function Aside({ importantTodoData }: any) {
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

const AsideContainer = styled.aside`
  width: 25rem;
  font-size: 1rem;
  padding: 1rem 2rem 1rem 2rem;
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
  margin: 1rem 0 2rem 0;

  > .importantCount {
    font-weight: 500;
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
