import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Home from "./Pages/Home"
import {BrowserRouter, Route, Routes,} from 'react-router-dom'
import Logout from "./Pages/Logout"
import Signout from "./Pages/Signout"
import PrivateRoute from './Components/PrivateRoute'

function App() {  
  return (
    <BrowserRouter>
      <Routes path={"/"}>
        <Route path="login" element={<Login />}/>
        <Route path="signup" element={<Signup />}/>

        <Route path="" element={<PrivateRoute/>}>
          <Route path="" element={<Home/>}/>
          <Route path="logout" element={<Logout/>}/>
          <Route path="signout" element={<Signout/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
