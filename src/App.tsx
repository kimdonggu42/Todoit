import Router from "./Router";
import { ToastAlert } from "./assets/style/toastStyle";
import { GlobalStyle } from "./assets/style/globalStyle";
import { AuthContextProvider } from "./context/AuthContext";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <AuthContextProvider>
        <Router />
        <ToastAlert hideProgressBar={false} autoClose={2000} pauseOnFocusLoss={true} />
      </AuthContextProvider>
    </>
  );
}
