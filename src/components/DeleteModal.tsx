import styled from "styled-components";
import { useFireStore } from "../hooks/useFirestore";

const DeleteModalBackdrop = styled.div`
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

const DeleteModalView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 0.8rem;
  font-size: 1rem;
  border-radius: 0.3rem;
  background-color: white;
  width: 90vw;
  max-width: 30rem;
  padding: 2rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.19), 0 10px 10px rgba(0, 0, 0, 0.1);

  > .modal-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #353535;
  }

  > .warning-text {
    font-weight: 500;
  }
`;

const DeleteModalButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 0.8rem;
  /* border: 1px solid red; */

  > button {
    font-size: 1rem;
    font-weight: 500;
    white-space: nowrap;
    padding: 0.5rem 0.7rem 0.5rem 0.7rem;
    border-radius: 0.3rem;
    border: none;
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

function DeleteModal({ list, deleteModalOpen, setDeleteModalOpen }: any) {
  const { deleteDocument, response } = useFireStore("todo");

  // firestore 데이터 삭제
  const deleteTodo = async (id: string) => {
    deleteDocument(id);
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  return (
    <DeleteModalBackdrop>
      <DeleteModalView>
        <div className='modal-title'>Delete Task</div>
        <div className='warning-text'>정말 삭제하시겠습니까?</div>
        <DeleteModalButtonArea>
          <button
            className='submit-button'
            onClick={() => {
              deleteTodo(list.id);
              openDeleteModal();
            }}
          >
            Delete Task
          </button>
          <button className='cancel-button' onClick={openDeleteModal}>
            Cancel
          </button>
        </DeleteModalButtonArea>
      </DeleteModalView>
    </DeleteModalBackdrop>
  );
}

export default DeleteModal;
