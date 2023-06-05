import styled from "styled-components";
import TodoList from "./TodoList";
import UpComingTodoList from "./UpComingTodoList";
import PastTodoList from "./PastTodoList";
import { useState, useEffect } from "react";
import axios from "axios";

const TodoMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 45rem);
  font-size: 1rem;
  // flex item의 최소 크기는 자식 요소의 크기보다 더 줄어들 수 없기 때문에
  // 부모 요소인 flex item 의 최소 크기를 0 으로 변경해야 flex 상태에서 말줄임 적용됨
  min-width: 30rem;
  /* border: 1px solid red; */

  @media screen and (max-width: 1300px) {
    width: 100vw;
  }

  @media screen and (max-width: 450px) {
    min-width: 0;
  }
`;

const TodoMainArea = styled.div`
  width: 100%;
  padding: 5rem 3rem 5rem 3rem;
  /* border: 1px solid skyblue; */

  @media screen and (max-width: 450px) {
    padding: 3rem 1rem 3rem 1rem;
  }
`;

const TodoTitle = styled.div`
  font-size: 2.2rem;
  font-weight: 500;
  color: #353535;
  /* border: 1px solid lime; */
`;

const TodoMainList = styled.ul`
  width: 100%;
  list-style: none;
  /* border: 1px solid blue; */
`;

function TodoMain({ currentMenu }: any) {
  const [todoData, setTodoData] = useState<any>([]);

  const getTodoData = async () => {
    const res = await axios.get("http://localhost:3001/todos");
    setTodoData(res.data);
  };
  useEffect(() => {
    getTodoData();
  }, []);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const dateFormat =
    year + "-" + ("00" + month.toString()).slice(-2) + "-" + ("00" + day.toString()).slice(-2);

  // 투두데이터 중 오늘 날짜의 투두만 보이도록 필터링한 데이터
  const todayTodoData = todoData.filter((value: any) => value.createdAt === dateFormat);
  // 투두데이터 중 오늘 이후 날짜의 투두만 보이도록 필터링한 데이터
  const upComingTodoData = todoData.filter((value: any) => value.createdAt > dateFormat);
  // 투두데이터 중 오늘 이전 날짜의 투두만 보이도록 필터링한 데이터
  const pastTodoData = todoData.filter((value: any) => value.createdAt < dateFormat);

  // console.log(dateFormat);

  return (
    <TodoMainContainer>
      {currentMenu === 0 ? (
        <TodoMainArea>
          <TodoTitle>Today Tasks</TodoTitle>
          <TodoMainList>
            {todayTodoData.map((value: any) => {
              return <TodoList key={value.id} todayTodoData={value} getTodoData={getTodoData} />;
            })}
          </TodoMainList>
        </TodoMainArea>
      ) : currentMenu === 1 ? (
        <TodoMainArea>
          <TodoTitle>Upcoming Tasks</TodoTitle>
          <TodoMainList>
            {upComingTodoData.map((value: any) => {
              return <UpComingTodoList key={value.id} upComingTodoData={value} />;
            })}
          </TodoMainList>
        </TodoMainArea>
      ) : (
        <TodoMainArea>
          <TodoTitle>Past Tasks</TodoTitle>
          <TodoMainList>
            {pastTodoData.map((value: any) => {
              return <PastTodoList key={value.id} pastTodoData={value} />;
            })}
          </TodoMainList>
        </TodoMainArea>
      )}
    </TodoMainContainer>
  );
}

export default TodoMain;
