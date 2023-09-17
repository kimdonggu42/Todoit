import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TodoMain from "./pages/main/TodoMain";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Spinner from "./components/Spinner";

export default function Router() {
  const { user, isAuthReady }: any = useContext(AuthContext);

  return (
    <BrowserRouter>
      {isAuthReady ? (
        <Routes>
          <Route path='/' element={user ? <TodoMain /> : <Navigate to='/login' replace={true} />} />
          <Route path='/login' element={user ? <Navigate to='/' replace={true} /> : <Login />} />
          <Route path='/signup' element={user ? <Navigate to='/' replace={true} /> : <Signup />} />
        </Routes>
      ) : (
        <Spinner />
      )}
    </BrowserRouter>
  );
}
