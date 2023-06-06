import GlobalStyle from "./assets/globalStyle";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MainPage from "./pages/MainPage";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const isLogin = JSON.parse(localStorage.getItem("accessToken")!);

  return (
    <div className='App'>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={isLogin ? <Navigate to='/todo' /> : <Navigate to='/login' />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/todo' element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
