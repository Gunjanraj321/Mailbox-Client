import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Welcome from './components/Welcome';
import Home from './components/Home/Home';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div >
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
