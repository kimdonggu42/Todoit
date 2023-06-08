import * as AddTodoModal from "./AddTodoModal";
import { useState } from "react";
import { useFireStore } from "../../hooks/useFirestore";

function EditTodoModal({ list, editModalOpen, setEditModalOpen }: any) {
  const [editTodoContent, setEditTodoContent] = useState(list.todoBody);
  const [editTodoCreatedAt, setEditTodoCreatedAt] = useState(list.todoDate);

  const { updateDocument, response } = useFireStore("todo");

  // firestore 데이터 수정
  const editTodoPatch = async (id: string) => {
    const updatedFields = {
      todoBody: editTodoContent,
      todoDate: editTodoCreatedAt,
    };
    updateDocument(id, updatedFields);
  };

  const changeEditContent = (e: any) => {
    setEditTodoContent(e.target.value);
  };

  const changeEditCreatedAt = (e: any) => {
    setEditTodoCreatedAt(e.target.value);
  };

  const openEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  return (
    <AddTodoModal.AddModalBackdrop>
      <AddTodoModal.AddModalView>
        <div className='modal-title'>Edit Task</div>
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
            Edit Task
          </button>
          <button className='cancel-button' onClick={openEditModal}>
            Cancel
          </button>
        </AddTodoModal.AddModalButtonArea>
      </AddTodoModal.AddModalView>
    </AddTodoModal.AddModalBackdrop>
  );
}

export default EditTodoModal;
