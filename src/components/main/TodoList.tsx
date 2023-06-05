import styled from "styled-components";
import axios from "axios";
import { useState } from "react";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

const TodoListContainer = styled.li`
  display: flex;
  align-items: center;
  height: 4rem;
`;

const CheckboxArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 3rem;
  height: 100%;
  /* border: 1px solid red; */

  > input {
    width: 1.1rem;
    height: 1.1rem;
    cursor: pointer;
  }
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100% - 10rem);
  max-height: 4rem;
  padding: 0 1rem 0 1rem;
  /* border: 1px solid orange; */

  > .content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /* border: 1px solid red; */
  }

  > .date {
    font-size: 0.8rem;
    /* border: 1px solid red; */
  }
`;

const BtnArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  column-gap: 1rem;
  min-width: 7rem;
  height: 100%;
  /* border: 1px solid green; */
`;

const ImportantBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  color: #faae05;
  /* border: 1px solid red; */
`;

const EditDropdownBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  /* border: 1px solid red; */
`;

const Dropdown = styled.ul`
  display: flex;
  flex-direction: column;
  width: 6rem;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
  background-color: white;
  position: absolute;
  top: 3.4rem;
  right: 1rem;
  list-style: none;
  cursor: pointer;

  > li {
    padding: 0.5rem 0.8rem 0.5rem 0.8rem;
    /* border: 1px solid red; */

    &:hover {
      border-radius: 4px;
      background-color: lightgray;
    }
  }
`;

function TodoList({ todayTodoData, getTodoData }: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 중요 todo Patch
  const changeImportant = async (todoId: number) => {
    const editTodoList = {
      important: !todayTodoData.important,
    };
    const res = await axios.patch(`http://localhost:3001/todos/${todoId}`, editTodoList);
    getTodoData(res.data);
  };

  // 드롬다운 오픈 이벤트 핸들러
  const openDropdown = (e: any) => {
    setIsOpen(!isOpen);
  };

  return (
    <TodoListContainer>
      <CheckboxArea>
        <input type='checkbox' id={todayTodoData.id} />
      </CheckboxArea>
      <TextArea>
        <div className='content'>{todayTodoData.content}</div>
        <div className='date'>{todayTodoData.createdAt}</div>
      </TextArea>
      <BtnArea>
        {todayTodoData.important === true ? (
          <ImportantBtn onClick={() => changeImportant(todayTodoData.id)}>
            <AiFillStar size={23} />
          </ImportantBtn>
        ) : (
          <ImportantBtn onClick={() => changeImportant(todayTodoData.id)}>
            <AiOutlineStar size={23} />
          </ImportantBtn>
        )}
        <EditDropdownBtn onClick={openDropdown}>
          <BsThreeDotsVertical size={17} />
        </EditDropdownBtn>
        {isOpen ? (
          <Dropdown>
            <li>Edit</li>
            <li>Delete</li>
          </Dropdown>
        ) : null}
      </BtnArea>
    </TodoListContainer>
  );
}

export default TodoList;
