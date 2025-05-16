import './App.css'
import Navbar from './components/navbar';
import Profile from './pages/profile';
import Topartists from './pages/topartists';
import Toptracks from './pages/toptracks';
import Recents from './pages/recents';
import Playlists from './pages/playlists';
import Login from './pages/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='app-container'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Profile />} />
          <Route path='/Topartists' element={<Topartists />} />
          <Route path='/Toptracks' element={<Toptracks />} />
          <Route path='/Recents' element={<Recents />} />
          <Route path='/Playlists' element={<Playlists />} />
        </Routes>
      </div >
    </Router>

  )
}
export default App