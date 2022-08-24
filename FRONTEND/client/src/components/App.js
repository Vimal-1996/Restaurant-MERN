import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home/Home'
import Signin from './Signin/Signin'
import Signup from './Signup/Signup'
import NotFound from './NotFound/NotFound'
import AdminDashboard from './Admin/AdminDashboard';
import UserDashboard from './User/UserDashboard'
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>

          <Route exact path="/" element={<Home />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />

          <Route element={<ProtectedRoutes/>}>
              <Route exact path='/admin/dashboard' element={<AdminDashboard/>} />
              <Route exact path='/user/dashboard' element={<UserDashboard/>} />
          </Route>
          
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>

  )


}

export default App;
