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

function App() {

  return (
    <div className='bg-blue-50'>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/myprofile' element={<UserProfile></UserProfile>}></Route>
        <Route path='/requests' element={<Requests></Requests>}></Route>
        <Route path='/suggestions' element={<Suggestions></Suggestions>}></Route>
        <Route path='/profile/:id' element={<OneUserProfile></OneUserProfile>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
      </Routes>
    </div>
  )
}

export default App
