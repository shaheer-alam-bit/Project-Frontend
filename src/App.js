import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import OrganizerDashboard from './components/OrganizerDashboard';
import CreateEventForm from './components/CreateEventForm';
import Navbar from './components/Navbar';
import EventDetail from './components/EventDetail';
import ForgetPassword from './components/ForgetPassword';


function App() {
  return (
    <Router>
      <div className="App">
          <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/signup' element={<Signup/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/dashboard' element={<Dashboard/>}/>
          <Route exact path='/organizer-dashboard' element={<OrganizerDashboard/>}></Route>
          <Route exact path='/createEvent' element={<CreateEventForm/>}></Route>
          <Route exact path='/event/:id' element={<EventDetail/>}></Route>
          <Route exact path='/forgetPassword' element={<ForgetPassword/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
