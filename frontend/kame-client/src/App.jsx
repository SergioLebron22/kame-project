import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/Login"
import DataEntryHome from "./pages/DataEntryHome"
import LandingPage from "./pages/LandingPage"
import NoPage from "./pages/NoPage"
import AdminPage from "./pages/AdminPage"
import EmployeeCreation from "./pages/RegisterEmployeePage"
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />}/>
          <Route path="/dashboard" element={<AdminPage />}/>
          <Route path="/dashboard/register-employee" element={<EmployeeCreation />}/>
          <Route path="/auth/login" element={<LoginPage />}/>
          <Route path="/home/" element={<DataEntryHome />} />
          <Route path="*" element={<NoPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
