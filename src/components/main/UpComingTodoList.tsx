function UpComingTodoList({ upComingTodoData }: any) {
  return (
    <li>
      <div>{upComingTodoData.content}</div>
      <div>{upComingTodoData.createdAt}</div>
    </li>
  );
}

export default UpComingTodoList;
