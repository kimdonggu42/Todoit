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
import { MainTabArrInterface } from "../../util/type";

export default function TodoMain() {
  const [currentMenu, setCurrentMenu] = useState<number>(0);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);

  const { user }: any = useContext(AuthContext);
  const { documents, error } = useCollection("todo", ["uid", "==", user.uid]);

  const tabArr: MainTabArrInterface[] = [{ name: "전체" }, { name: "완료" }, { name: "미완료" }];

  const selectTabHandler = (index: number) => {
    setCurrentTab(index);
  };

  let dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const week = today.getDay();
  const dateFormat =
    year + "-" + ("00" + month.toString()).slice(-2) + "-" + ("00" + day.toString()).slice(-2);

  const todayFormat: string = `${("00" + month.toString()).slice(-2)}월 ${(
    "00" + day.toString()
  ).slice(-2)}일 ${dayOfWeek[week]}요일`;

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

  // important todo
  const importantTodoData = documents.filter(
    (value: any) => value.isImportant && value.isCheck === false
  );

  // console.log(documents);

  return (
    <>
      <Header
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
        displayName={user.displayName}
        currentMenu={currentMenu}
        setCurrentMenu={setCurrentMenu}
        todayCount={todayTodoData.length}
        upComingCount={upComingTodoData.length}
        pastCount={pastTodoData.length}
      />
      <TodoMainContainer>
        <Nav
          currentMenu={currentMenu}
          setCurrentMenu={setCurrentMenu}
          todayCount={todayTodoData.length}
          upComingCount={upComingTodoData.length}
          pastCount={pastTodoData.length}
        />
        <TodoMainContent>
          {currentMenu === 0 ? (
            <TodoMainArea>
              <TodoTitle>
                <div>오늘 할 일</div>
                <div className='todaydate'>{todayFormat}</div>
              </TodoTitle>
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
              <TodoTitle>해야 할 일</TodoTitle>
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
              <TodoTitle>지나간 할 일</TodoTitle>
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
        <Aside importantTodoData={importantTodoData} />
      </TodoMainContainer>
    </>
  );
}

const TodoMainContainer = styled.div`
  display: flex;
  height: calc(100vh - 2.5rem);
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

  @media screen and (max-width: 1300px) {
    width: 100vw;
  }

  @media screen and (max-width: 480px) {
    min-width: 10rem;
    padding: 1rem 1rem 2rem 1rem;
  }
`;

const TodoMainArea = styled.div`
  width: 100%;
  max-width: 50rem;
  /* border: 1px solid skyblue; */
`;

const TodoTitle = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  font-size: 1.6rem;
  font-weight: 600;
  color: #353535;
  margin-top: 1rem;
  /* border: 1px solid lime; */

  > .todaydate {
    font-weight: 500;
    font-size: 1rem;
    color: #878787;
  }
`;

const ListTab = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  column-gap: 1rem;
  font-weight: 500;
  margin: 1rem 0 1rem 0;
  color: #8e92a4;
  border-bottom: 1px solid #dddddd;
  /* border: 1px solid red; */

  > .tab {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 0.2rem;
    width: 100vw;
    padding: 0.5rem 0 0.5rem 0;
    text-align: center;
    cursor: pointer;
    /* border: 1px solid blue; */

    > .todocount {
      font-size: 0.8rem;
    }
  }

  > .focused {
    font-weight: 600;
    color: #1b9c85;
    border-bottom: 2px solid #1b9c85;
  }
`;

const TodoMainList = styled.ul`
  width: 100%;
  list-style: none;
  /* border: 1px solid blue; */

  li:last-child {
    border: none;
  }
`;
