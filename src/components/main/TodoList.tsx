import styled from "styled-components";
import axios from "axios";
import EditTodoModal from "../common/EditTodoModal";
import DeleteModal from "../common/DeleteModal";
import { useState } from "react";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

const TodoListContainer = styled.li`
  display: flex;
  align-items: center;
  height: 4rem;
  /* border: 1px solid red; */
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
    accent-color: #e0bfe6;

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
  z-index: 999;
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

function TodoList({ list, getTodoData }: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  // 완료한 todo Patch
  const changeCheck = async (todoId: number) => {
    const editCheck = {
      isCheck: !list.isCheck,
    };
    const res = await axios.patch(`http://localhost:3001/todos/${todoId}`, editCheck);
    getTodoData(res.data);
  };

  // 중요 todo Patch
  const changeImportant = async (todoId: number) => {
    const editImportant = {
      important: !list.important,
    };
    const res = await axios.patch(`http://localhost:3001/todos/${todoId}`, editImportant);
    getTodoData(res.data);
  };

  // 드롬다운 오픈 이벤트 핸들러
  const openDropdown = (e: any) => {
    setIsOpen(!isOpen);
  };

  // 수정 모달 오픈 이벤트 핸들러
  const openEditModal = (e: any) => {
    setEditModalOpen(!editModalOpen);
  };

  // 삭제 모달 오픈 이벤트 핸들러
  const openDeleteModal = (e: any) => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  return (
    <TodoListContainer>
      <CheckboxArea>
        <input type='checkbox' checked={list.isCheck} onChange={() => changeCheck(list.id)} />
      </CheckboxArea>
      <TextArea>
        <div className='content'>{list.content}</div>
        <div className='date'>{list.createdAt}</div>
      </TextArea>
      <BtnArea>
        {list.important === true ? (
          <ImportantBtn onClick={() => changeImportant(list.id)}>
            <AiFillStar size={23} />
          </ImportantBtn>
        ) : (
          <ImportantBtn onClick={() => changeImportant(list.id)}>
            <AiOutlineStar size={23} />
          </ImportantBtn>
        )}
        <EditDropdownBtn onClick={openDropdown}>
          <BsThreeDotsVertical size={17} />
        </EditDropdownBtn>
        {isOpen ? (
          <Dropdown>
            <li onClick={openEditModal}>Edit</li>
            {editModalOpen ? (
              <EditTodoModal
                list={list}
                getTodoData={getTodoData}
                editModalOpen={editModalOpen}
                setEditModalOpen={setEditModalOpen}
              />
            ) : null}
            <li onClick={openDeleteModal}>Delete</li>
            {deleteModalOpen ? (
              <DeleteModal
                list={list}
                getTodoData={getTodoData}
                deleteModalOpen={deleteModalOpen}
                setDeleteModalOpen={setDeleteModalOpen}
              />
            ) : null}
          </Dropdown>
        ) : null}
      </BtnArea>
    </TodoListContainer>
  );
}

export default TodoList;
