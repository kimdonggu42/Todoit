import axios from "axios";
import * as AddTodoModal from "./AddTodoModal";
import { useState } from "react";

function EditTodoModal({ list, getTodoData, editModalOpen, setEditModalOpen }: any) {
  const [editTodoContent, setEditTodoContent] = useState(list.content);
  const [editTodoCreatedAt, setEditTodoCreatedAt] = useState(list.createdAt);

  // Patch
  const editTodoPatch = async (patchId: any) => {
    const editTodo = {
      createdAt: editTodoCreatedAt,
      content: editTodoContent,
    };
    const res = await axios.patch(`http://localhost:3001/todos/${patchId}`, editTodo);
    getTodoData(res.data);
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
