import * as AddTodoModal from "./AddTodoModal";
import { useState } from "react";
import { useFireStore } from "../hooks/useFirestore";
import { toast } from "react-toastify";

export default function EditTodoModal({ list, editModalOpen, setEditModalOpen }: any) {
  const [editTodoBody, setEditTodoBody] = useState<string>(list.todoBody);
  const [editTodoDate, setEditTodoDate] = useState<string>(list.todoDate);

  const { updateDocument } = useFireStore("todo");

  // firestore 데이터 수정
  const editTodoPatch = async (id: string) => {
    if (editTodoBody && editTodoDate) {
      const updatedFields = {
        todoBody: editTodoBody,
        todoDate: editTodoDate,
      };
      updateDocument(id, updatedFields);
      toast.success("할 일이 수정되었습니다.");
      setEditModalOpen(!editModalOpen);
    } else if (editTodoBody.length === 0) {
      toast.error("할 일을 입력해주세요.");
    } else if (editTodoDate.length === 0) {
      toast.error("완료 기한을 선택해주세요.");
    }
  };

  const changeEditContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodoBody(e.target.value);
  };

  const changeEditCreatedAt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodoDate(e.target.value);
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
          value={editTodoBody}
          placeholder='할 일을 입력해주세요'
          onChange={changeEditContent}
        />
        <AddTodoModal.DateInput
          className='createdAt-input'
          type='date'
          value={editTodoDate}
          onChange={changeEditCreatedAt}
        />
        <AddTodoModal.AddModalButtonArea>
          <button
            className='submit-button'
            onClick={() => {
              editTodoPatch(list.id);
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
