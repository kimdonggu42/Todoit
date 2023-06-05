function PastTodoList({ pastTodoData }: any) {
  return (
    <li>
      <div>{pastTodoData.content}</div>
      <div>{pastTodoData.createdAt}</div>
    </li>
  );
}

export default PastTodoList;
