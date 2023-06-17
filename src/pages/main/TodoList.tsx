import styled from "styled-components";
import EditTodoModal from "../../components/EditTodoModal";
import DeleteModal from "../../components/DeleteModal";
import { useState, useEffect, useRef } from "react";
import { useFireStore } from "../../hooks/useFirestore";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

const TodoListContainer = styled.li`
  display: flex;
  align-items: center;
  min-height: 4.5rem;
  border-bottom: 1px solid #f0f0f0;
`;

const CheckboxArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 3rem;
  /* border: 1px solid red; */

  > input {
    width: 1.1rem;
    height: 1.1rem;
    accent-color: #1b9c85;
    cursor: pointer;
  }
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 0.5rem;
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
  padding-left: 1rem;
  column-gap: 1rem;
  min-width: 7rem;
  /* border: 1px solid green; */
`;

const ImportantBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  color: #ffe79b;
  background-color: transparent;
  border: none;
  /* border: 1px solid red; */
`;

const EditDropdownBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  background-color: transparent;
  border: none;
  /* border: 1px solid red; */
`;

const Dropdown = styled.ul`
  display: flex;
  flex-direction: column;
  width: 7rem;
  border-radius: 0.3rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
  background-color: white;
  position: absolute;
  top: 2rem;
  right: 1rem;
  list-style: none;
  z-index: 999;
  cursor: pointer;

  > li {
    padding: 0.5rem 0.8rem 0.5rem 0.8rem;
    /* border: 1px solid red; */

    &:hover {
      border-radius: 0.3rem;
      background-color: #f7f7f7;
    }
  }
`;

function TodoList({ list }: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const dropMenuRef = useRef<HTMLDivElement | null>(null);
  const { updateDocument, response } = useFireStore("todo");

  // 완료한 todo 체크
  const changeCheck = async (id: string) => {
    const updatedFields = {
      isCheck: !list.isCheck,
    };
    updateDocument(id, updatedFields);
  };

  // 중요한 todo 체크
  const changeImportant = async (id: string) => {
    const updatedFields = {
      isImportant: !list.isImportant,
    };
    updateDocument(id, updatedFields);
  };

  // 드롬다운 오픈
  const openDropdown = (e: any) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleOutsideClose = (e: any) => {
      if (isOpen && !dropMenuRef.current?.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("click", handleOutsideClose);
    return () => document.removeEventListener("click", handleOutsideClose);
  }, [isOpen]);

  // 수정 모달 오픈 이벤트 핸들러
  const openEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  // 삭제 모달 오픈 이벤트 핸들러
  const openDeleteModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  // console.log(list);

  return (
    <TodoListContainer>
      <CheckboxArea>
        <input type='checkbox' checked={list.isCheck} onChange={() => changeCheck(list.id)} />
      </CheckboxArea>
      <TextArea>
        <div className='content'>{list.todoBody}</div>
        <div className='date'>{list.todoDate}</div>
      </TextArea>
      <BtnArea>
        {list.isImportant === true ? (
          <ImportantBtn onClick={() => changeImportant(list.id)}>
            <AiFillStar size={22} />
          </ImportantBtn>
        ) : (
          <ImportantBtn onClick={() => changeImportant(list.id)}>
            <AiOutlineStar size={22} />
          </ImportantBtn>
        )}
        <EditDropdownBtn onClick={openDropdown}>
          <BsThreeDotsVertical size={17} />
        </EditDropdownBtn>
        <div className='test' ref={dropMenuRef}>
          {isOpen ? (
            <Dropdown>
              <li onClick={openEditModal}>Edit</li>
              {editModalOpen ? (
                <EditTodoModal
                  list={list}
                  editModalOpen={editModalOpen}
                  setEditModalOpen={setEditModalOpen}
                />
              ) : null}
              <li onClick={openDeleteModal}>Delete</li>
              {deleteModalOpen ? (
                <DeleteModal
                  list={list}
                  deleteModalOpen={deleteModalOpen}
                  setDeleteModalOpen={setDeleteModalOpen}
                />
              ) : null}
            </Dropdown>
          ) : null}
        </div>
      </BtnArea>
    </TodoListContainer>
  );
}

export default TodoList;
