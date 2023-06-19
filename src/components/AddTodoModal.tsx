import styled from "styled-components";
import { useState } from "react";
import { useFireStore } from "../hooks/useFirestore";
import { toast } from "react-toastify";

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
  border-radius: 0.5rem;
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
  column-gap: 0.5rem;
  /* border: 1px solid red; */

  > button {
    font-size: 1rem;
    font-weight: 500;
    white-space: nowrap;
    padding: 0.5rem 1rem 0.5rem 1rem;
    border-radius: 0.3rem;
    border: none;

    &:hover {
      opacity: 0.8;
    }
  }

  > .submit-button {
    color: white;
    background-color: #1b9c85;
  }

  > .cancel-button {
    color: #1b9c85;
    border: 1px solid #1b9c85;
    background-color: transparent;
  }
`;

function AddTodoModal({ addModalOpen, setAddModalOpen, uid }: any) {
  const [todoBody, setTodoBody] = useState<string>(""); // 작성한 텍스트 값이 담긴 변수
  const [todoDate, setTodoDate] = useState<string>(""); // 선택한 날짜 값이 담긴 변수

  const { addDocument } = useFireStore("todo");

  // firestore에 데이터 추가
  const addTodoSubmit = () => {
    if (todoBody && todoDate) {
      addDocument({ uid, todoBody, todoDate, isCheck: false, isImportant: false });
      toast.success("새로운 할 일이 등록되었습니다.");
      setAddModalOpen(!addModalOpen);
    } else if (todoBody.length === 0) {
      toast.error("할 일을 입력해주세요.");
    } else if (todoDate.length === 0) {
      toast.error("완료 기한을 선택해주세요.");
    }
  };

  const changeAddContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoBody(e.target.value);
  };

  const changeAddCreatedAt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoDate(e.target.value);
  };

  const openAddModal = () => {
    setAddModalOpen(!addModalOpen);
  };

  return (
    <AddModalBackdrop>
      <AddModalView>
        <div className='modal-title'>할 일 등록</div>
        <ContentInput
          className='content-input'
          type='text'
          placeholder='할 일을 입력해주세요'
          onChange={changeAddContent}
        />
        <DateInput className='createdAt-input' type='date' onChange={changeAddCreatedAt} />
        <AddModalButtonArea>
          <button className='submit-button' onClick={addTodoSubmit}>
            등록
          </button>
          <button className='cancel-button' onClick={openAddModal}>
            취소
          </button>
        </AddModalButtonArea>
      </AddModalView>
    </AddModalBackdrop>
  );
}

export default AddTodoModal;
