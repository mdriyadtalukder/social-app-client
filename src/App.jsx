import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import Navbar from './components/navbar/Navbar'
import UserProfile from './pages/userProfile/UserProfile'
import OneUserProfile from './pages/auser/OneUserProfile'
import Requests from './pages/requests/Requests'
import Suggestions from './pages/suggestions/Suggestions'
import Settings from './pages/settings/Settings'
import Blocked from './pages/blocked/Blocked'
import PrivateRouter from './components/router/PrivateRouter'

function App() {

  return (
    <div className='bg-blue-50'>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<PrivateRouter><Home></Home></PrivateRouter>}></Route>
        <Route path='/myprofile' element={<PrivateRouter><UserProfile></UserProfile></PrivateRouter>}></Route>
        <Route path='/requests' element={<PrivateRouter><Requests></Requests></PrivateRouter>}></Route>
        <Route path='/blocklist' element={<PrivateRouter><Blocked></Blocked></PrivateRouter>}></Route>
        <Route path='/suggestions' element={<PrivateRouter><Suggestions></Suggestions></PrivateRouter>}></Route>
        <Route path='/settings' element={<PrivateRouter><Settings></Settings></PrivateRouter>}></Route>
        <Route path='/profile/:id' element={<PrivateRouter><OneUserProfile></OneUserProfile></PrivateRouter>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
      </Routes>
    </div>
  )
}

export default App
