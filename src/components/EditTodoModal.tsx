import * as AddTodoModal from "./AddTodoModal";
import { useState } from "react";
import { useFireStore } from "../hooks/useFirestore";

function EditTodoModal({ list, editModalOpen, setEditModalOpen }: any) {
  const [editTodoContent, setEditTodoContent] = useState<string>(list.todoBody);
  const [editTodoCreatedAt, setEditTodoCreatedAt] = useState<string>(list.todoDate);

  const { updateDocument } = useFireStore("todo");

  // firestore 데이터 수정
  const editTodoPatch = async (id: string) => {
    const updatedFields = {
      todoBody: editTodoContent,
      todoDate: editTodoCreatedAt,
    };
    updateDocument(id, updatedFields);
  };

  const changeEditContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodoContent(e.target.value);
  };

  const changeEditCreatedAt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodoCreatedAt(e.target.value);
  };

  const openEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  return (
    <AddTodoModal.AddModalBackdrop>
      <AddTodoModal.AddModalView>
        <div className='modal-title'>할 일 수정</div>
        <AddTodoModal.ContentInput
          className='content-input'
          type='text'
          value={editTodoContent}
          placeholder='할 일을 입력해주세요'
          onChange={changeEditContent}
        />
        <AddTodoModal.DateInput
          className='createdAt-input'
          type='date'
          value={editTodoCreatedAt}
          onChange={changeEditCreatedAt}
        />
        <AddTodoModal.AddModalButtonArea>
          <button
            className='submit-button'
            onClick={() => {
              editTodoPatch(list.id);
              openEditModal();
            }}
          >
            수정
          </button>
          <button className='cancel-button' onClick={openEditModal}>
            취소
          </button>
        </AddTodoModal.AddModalButtonArea>
      </AddTodoModal.AddModalView>
    </AddTodoModal.AddModalBackdrop>
  );
}

export default EditTodoModal;
