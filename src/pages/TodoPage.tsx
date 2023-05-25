import SideBar from "../components/nav/SideBar";
import TodoMain from "../components/todo/TodoMain";
import Schedule from "../components/nav/Schedule";

function TodoPage() {
  return (
    <div className='flex h-screen'>
      <SideBar />
      <TodoMain />
      <Schedule />
    </div>
  );
}

export default TodoPage;
