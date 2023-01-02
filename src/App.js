import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router ,Routes, Route, Navigate} from "react-router-dom";
import NavBar from './components/navbar';
import { Home } from './pages/Home/Home';
import Exercises from './pages/Exercises/Exercises';
import Profile from './pages/Profile/Profile';
import Routines from './pages/Routines/Routines';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import {useAuthContext} from './hooks/useAuthContext'
import Exercise from './pages/Exercises/Exercise';
import Routine from './pages/Routines/Routine';
import CreateRoutine from './pages/Routines/CreateRoutine';

function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
          <Route exact path='/' element={user ? <Home/> : <Navigate to='/login'/>}/>
          <Route exact path='/login' element={!user ? <Login/> : <Navigate to='/'/>}/>
          <Route exact path='/profile' element={user ? <Profile/> : <Navigate to='/login'/>}/>
          <Route exact path='/exercises' element={user ? <Exercises/> : <Navigate to='/login'/>}/>
          <Route exact path='/routines' element={user ? <Routines/> : <Navigate to='/login'/>}/> 
          <Route exact path='/register' element={!user ? <Register/> : <Navigate to='/'/>}/>
          <Route path='/exercise/:exercise_id' element={user ? <Exercise/> : <Navigate to='/login'/>}/>
          <Route path='/routines/:routine_id' element={user ? <Routine/> : <Navigate to='/login'/>}/>
          <Route path='/routines/createRoutine' element={user ? <CreateRoutine/> : <Navigate to='/login'/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
