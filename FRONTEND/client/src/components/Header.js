import React, { Fragment } from 'react'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { logout } from '../helpers/auth'

const Header = () => {
  let location = useLocation()
  let navigate = useNavigate()

  const handleLogout=(event)=>{
    logout(()=>{
      navigate("/signin")
    })

  }

  const showNavigationBar = () => {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-secondary ">
          <Link className="navbar-brand" to="/">MY RESTAURANT</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              {location.pathname !== "/admin/dashboard" && location.pathname !== "/user/dashboard" ?

                <Fragment>
                  <li className="nav-item active">
                    <Link className="nav-link" to="/"><i class="fas fa-home"></i> Home</Link>
                  </li>

                  <li className="nav-item active">
                    <Link className="nav-link" to="/signin">Sign in</Link>
                  </li>

                  <li className="nav-item active">
                    <Link className="nav-link" to="/signup">Sign up</Link>
                  </li>
                </Fragment>
                :
                <Fragment>
                  
                  <li className="nav-item active">
                    <Link className="nav-link" to="/signup">Dashboard</Link>
                  </li>
                  <li className="nav-item active">
                    <Button className="btn btn-dark"  onClick={handleLogout}>Logout</Button>
                  </li>
                 
                  
                </Fragment>


              }





            </ul>
          </div>

        </nav>
      </>
    )
  }

  return (
    <>
      {showNavigationBar()}
    </>
  )
}

export default (Header)