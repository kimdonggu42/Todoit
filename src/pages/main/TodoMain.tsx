import styled from "styled-components";
import TodoList from "./TodoList";
import Aside from "../../components/Aside";
import { useState } from "react";
import AddTodoModal from "../../components/AddTodoModal";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useCollection } from "../../hooks/useCollection";
import Nav from "../../components/Nav";
import Header from "../../components/Header";

const TodoMainContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const TodoMainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100vw - 44rem);
  font-size: 1rem;
  // flex item의 최소 크기는 자식 요소의 크기보다 더 줄어들 수 없기 때문에
  // 부모 요소인 flex item 의 최소 크기를 0 으로 변경해야 flex 상태에서 말줄임 적용됨
  min-width: 30rem;
  padding: 1rem 2rem 2rem 2rem;
  overflow-y: auto;
  /* border: 1px solid red; */

  @media screen and (max-width: 1300px) {
    width: 100vw;
  }

  @media screen and (max-width: 450px) {
    min-width: 0;
    padding: 1rem 1rem 2rem 1rem;
  }
`;

const TodoMainArea = styled.div`
  width: 100%;
  max-width: 50rem;
  /* border: 1px solid skyblue; */
`;

const TodoTitle = styled.div`
  font-size: 2rem;
  font-weight: 500;
  color: #353535;
  /* border: 1px solid lime; */

  @media screen and (max-width: 450px) {
    font-size: 1.7rem;
  }
`;

const ListTab = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  column-gap: 1rem;
  font-weight: 500;
  margin: 1.5rem 0 1.5rem 0;
  color: #8e92a4;
  border-bottom: 1px solid #dddddd;
  /* border: 1px solid red; */

  > .tab {
    width: 100vw;
    padding: 0.5rem 0 0.5rem 0;
    text-align: center;
    cursor: pointer;
    /* border: 1px solid blue; */
  }

  > .focused {
    color: #1b9c85;
    border-bottom: 2px solid #1b9c85;
  }
`;

const TodoMainList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  width: 100%;
  list-style: none;
  /* border: 1px solid blue; */
`;

function TodoMain() {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<number>(0);

  const { user }: any = useContext(AuthContext);
  const { documents, error } = useCollection("todo", ["uid", "==", user.uid]);

  const tabArr = [{ name: "All" }, { name: "Complete" }, { name: "Incomplete" }];

  const selectTabHandler = (index: number) => {
    setCurrentTab(index);
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const dateFormat =
    year + "-" + ("00" + month.toString()).slice(-2) + "-" + ("00" + day.toString()).slice(-2);

  // today todo
  const todayTodoData = documents.filter((value: any) => value.todoDate === dateFormat);
  const todayCompleteTodo = todayTodoData.filter((value: any) => value.isCheck);
  const todayInCompleteTodo = todayTodoData.filter((value: any) => value.isCheck === false);

  // tomorrow todo
  const upComingTodoData = documents.filter((value: any) => value.todoDate > dateFormat);
  const upComingCompleteTodo = upComingTodoData.filter((value: any) => value.isCheck);
  const upComingInCompleteTodo = upComingTodoData.filter((value: any) => value.isCheck === false);

  // yesterday todo
  const pastTodoData = documents.filter((value: any) => value.todoDate < dateFormat);
  const pastCompleteTodo = pastTodoData.filter((value: any) => value.isCheck);
  const pastInCompleteTodo = pastTodoData.filter((value: any) => value.isCheck === false);

  // console.log(documents);

  return (
    <TodoMainContainer>
      <Nav setCurrentMenu={setCurrentMenu} />
      <TodoMainContent>
        <Header addModalOpen={addModalOpen} setAddModalOpen={setAddModalOpen} />
        {currentMenu === 0 ? (
          <TodoMainArea>
            <TodoTitle>Today Tasks</TodoTitle>
            <ListTab>
              {tabArr.map((tab, index) => {
                return (
                  <li
                    key={index}
                    className={currentTab === index ? "tab focused" : "tab"}
                    onClick={() => selectTabHandler(index)}
                  >
                    {tab.name}
                  </li>
                );
              })}
            </ListTab>
            {currentTab === 0 ? (
              <TodoMainList>
                {todayTodoData.map((value: any) => {
                  return <TodoList key={value.id} list={value} />;
                })}
                {error && <strong>{error}</strong>}
              </TodoMainList>
            ) : currentTab === 1 ? (
              <TodoMainList>
                {todayCompleteTodo.map((value: any) => {
                  return <TodoList key={value.id} list={value} />;
                })}
                {error && <strong>{error}</strong>}
              </TodoMainList>
            ) : (
              <TodoMainList>
                {todayInCompleteTodo.map((value: any) => {
                  return <TodoList key={value.id} list={value} />;
                })}
                {error && <strong>{error}</strong>}
              </TodoMainList>
            )}
          </TodoMainArea>
        ) : currentMenu === 1 ? (
          <TodoMainArea>
            <TodoTitle>Upcoming Tasks</TodoTitle>
            <ListTab>
              {tabArr.map((tab, index) => {
                return (
                  <li
                    key={index}
                    className={currentTab === index ? "tab focused" : "tab"}
                    onClick={() => selectTabHandler(index)}
                  >
                    {tab.name}
                  </li>
                );
              })}
            </ListTab>
            {currentTab === 0 ? (
              <TodoMainList>
                {upComingTodoData.map((value: any) => {
                  return <TodoList key={value.id} list={value} />;
                })}
                {error && <strong>{error}</strong>}
              </TodoMainList>
            ) : currentTab === 1 ? (
              <TodoMainList>
                {upComingCompleteTodo.map((value: any) => {
                  return <TodoList key={value.id} list={value} />;
                })}
                {error && <strong>{error}</strong>}
              </TodoMainList>
            ) : (
              <TodoMainList>
                {upComingInCompleteTodo.map((value: any) => {
                  return <TodoList key={value.id} list={value} />;
                })}
                {error && <strong>{error}</strong>}
              </TodoMainList>
            )}
          </TodoMainArea>
        ) : (
          <TodoMainArea>
            <TodoTitle>Past Tasks</TodoTitle>
            <ListTab>
              {tabArr.map((tab, index) => {
                return (
                  <li
                    key={index}
                    className={currentTab === index ? "tab focused" : "tab"}
                    onClick={() => selectTabHandler(index)}
                  >
                    {tab.name}
                  </li>
                );
              })}
            </ListTab>
            {currentTab === 0 ? (
              <TodoMainList>
                {pastTodoData.map((value: any) => {
                  return <TodoList key={value.id} list={value} />;
                })}
                {error && <strong>{error}</strong>}
              </TodoMainList>
            ) : currentTab === 1 ? (
              <TodoMainList>
                {pastCompleteTodo.map((value: any) => {
                  return <TodoList key={value.id} list={value} />;
                })}
                {error && <strong>{error}</strong>}
              </TodoMainList>
            ) : (
              <TodoMainList>
                {pastInCompleteTodo.map((value: any) => {
                  return <TodoList key={value.id} list={value} />;
                })}
                {error && <strong>{error}</strong>}
              </TodoMainList>
            )}
          </TodoMainArea>
        )}
        {addModalOpen ? (
          <AddTodoModal
            uid={user.uid}
            addModalOpen={addModalOpen}
            setAddModalOpen={setAddModalOpen}
          />
        ) : null}
      </TodoMainContent>

      <Aside todayTodoData={todayTodoData} />
    </TodoMainContainer>
  );
}

export default TodoMain;