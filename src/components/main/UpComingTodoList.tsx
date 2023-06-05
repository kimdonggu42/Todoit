import axios from "axios";
import { useState } from "react";
import * as TodoList from "./TodoList";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

function UpComingTodoList({ upComingTodoData, getTodoData }: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 완료한 todo Patch
  const changeCheck = async (todoId: number) => {
    const editCheck = {
      isCheck: !upComingTodoData.isCheck,
    };
    const res = await axios.patch(`http://localhost:3001/todos/${todoId}`, editCheck);
    getTodoData(res.data);
  };

  // 중요 todo Patch
  const changeImportant = async (todoId: number) => {
    const editTodoList = {
      important: !upComingTodoData.important,
    };
    const res = await axios.patch(`http://localhost:3001/todos/${todoId}`, editTodoList);
    getTodoData(res.data);
  };

  // 드롬다운 오픈 이벤트 핸들러
  const openDropdown = (e: any) => {
    setIsOpen(!isOpen);
  };

  return (
    <TodoList.TodoListContainer>
      <TodoList.CheckboxArea>
        <input
          type='checkbox'
          checked={upComingTodoData.isCheck}
          onClick={() => changeCheck(upComingTodoData.id)}
        />
      </TodoList.CheckboxArea>
      <TodoList.TextArea>
        <div className='content'>{upComingTodoData.content}</div>
        <div className='date'>{upComingTodoData.createdAt}</div>
      </TodoList.TextArea>
      <TodoList.BtnArea>
        {upComingTodoData.important === true ? (
          <TodoList.ImportantBtn onClick={() => changeImportant(upComingTodoData.id)}>
            <AiFillStar size={23} />
          </TodoList.ImportantBtn>
        ) : (
          <TodoList.ImportantBtn onClick={() => changeImportant(upComingTodoData.id)}>
            <AiOutlineStar size={23} />
          </TodoList.ImportantBtn>
        )}
        <TodoList.EditDropdownBtn onClick={openDropdown}>
          <BsThreeDotsVertical size={17} />
        </TodoList.EditDropdownBtn>
        {isOpen ? (
          <TodoList.Dropdown>
            <li>Edit</li>
            <li>Delete</li>
          </TodoList.Dropdown>
        ) : null}
      </TodoList.BtnArea>
    </TodoList.TodoListContainer>
  );
}

export default UpComingTodoList;
