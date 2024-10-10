import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/Login"
import LandingPage from "./pages/LandingPage"
import NoPage from "./pages/NoPage"

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />}/>
          <Route path="/auth/login" element={<LoginPage />}/>
          <Route path="*" element={<NoPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App