import styled from "styled-components";
import { useState } from "react";
import { useFireStore } from "../hooks/useFirestore";

export const AddModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

export const AddModalView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 0.8rem;
  font-size: 1rem;
  border-radius: 0.3rem;
  background-color: white;
  width: 90vw;
  max-width: 50rem;
  padding: 2rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.19), 0 10px 10px rgba(0, 0, 0, 0.1);

  > .modal-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #353535;
  }
`;

export const ContentInput = styled.input`
  font-size: 1rem;
  width: 100%;
  height: 3rem;
  padding: 0.5rem 0.7rem 0.5rem 0.7rem;
  border: 1px solid #dddddd;
  border-radius: 0.3rem;
  font-weight: 500;
  color: #353535;

  &:focus {
    outline: none;
  }
`;

export const DateInput = styled.input`
  font-size: 0.9rem;
  border-radius: 0.3rem;
  padding: 0.5rem 0.7rem 0.5rem 0.7rem;
  border: 1px solid #dddddd;
  width: 100%;
  max-width: 11rem;
  color: #353535;

  &:focus {
    outline: none;
  }
`;

export const AddModalButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 0.8rem;
  /* border: 1px solid red; */

  > button {
    font-weight: 500;
    white-space: nowrap;
    padding: 0.4rem 0.7rem 0.4rem 0.7rem;
    border-radius: 0.3rem;
    border: none;
  }

  > .submit-button {
    color: white;
    background-color: #fed049;
  }

  > .cancel-button {
    color: #353535;
    border: 1px solid #dddddd;
    background-color: white;
  }
`;

function AddTodoModal({ addModalOpen, setAddModalOpen, uid }: any) {
  const [todoBody, setTodoBody] = useState(""); // 작성한 텍스트 값이 담긴 변수
  const [todoDate, setTodoDate] = useState(""); // 선택한 날짜 값이 담긴 변수

  const { addDocument, response } = useFireStore("todo");

  // firestore에 데이터 추가
  const addTodoSubmit = () => {
    addDocument({ uid, todoBody, todoDate, isCheck: false, isImportant: false });
  };

  const changeAddContent = (e: any) => {
    setTodoBody(e.target.value);
  };

  const changeAddCreatedAt = (e: any) => {
    setTodoDate(e.target.value);
  };

  const openAddModal = () => {
    setAddModalOpen(!addModalOpen);
  };

  return (
    <AddModalBackdrop>
      <AddModalView>
        <div className='modal-title'>Add Task</div>
        <ContentInput
          className='content-input'
          type='text'
          placeholder='할 일을 입력해주세요'
          onChange={changeAddContent}
        />
        <DateInput className='createdAt-input' type='date' onChange={changeAddCreatedAt} />
        <AddModalButtonArea>
          <button
            className='submit-button'
            onClick={() => {
              addTodoSubmit();
              openAddModal();
            }}
          >
            Add Task
          </button>
          <button className='cancel-button' onClick={openAddModal}>
            Cancel
          </button>
        </AddModalButtonArea>
      </AddModalView>
    </AddModalBackdrop>
  );
}

export default AddTodoModal;
