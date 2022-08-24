import React, { useState,useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import { signin } from '../../api/auth'
import { showLoading } from '../../helpers/loading'
import { showErrorAlertMessages } from '../../helpers/messages'
import { isAuthenticated, setAuthentication } from '../../helpers/auth'

const Signin = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    if(isAuthenticated() && isAuthenticated().role === 1){
      navigate("/admin/dashboard")
    }else if(isAuthenticated() && isAuthenticated().role === 0){
      navigate("/user/dashboard")
    }else{
      navigate("/signin")
    }
  },[navigate])


  const [formData, setFormData] = useState({
    email: '',
    password: '',
    errorMsg: false,
    loading: false
  })

  const { email, password, errorMsg, loading} = formData
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      errorMsg: ''
    })
  }

  const onSubmitfunction = (e) => {
    e.preventDefault()
    if (isEmpty(email) || isEmpty(password)) {
      setFormData({
        ...formData,
        errorMsg: "all fields are required"
      })
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "please enter valid email"
      })
    } else {
      setFormData({
        ...formData,
        loading: true
      })
      const { email, password } = formData;
      const data = { email, password }

      signin(data)
      .then((responseAfterAuth)=>{
        setAuthentication(responseAfterAuth.data.token, responseAfterAuth.data.user)
        if(isAuthenticated() && isAuthenticated().role === 1){
          navigate("/admin/dashboard")
        }else if(isAuthenticated() && isAuthenticated().role === 0){
          navigate("/user/dashboard")
        }else{
          navigate("/signin")
        }
      })
      .catch((rejectAfterAuth)=>{
        setFormData({
          ...formData,
          loading:false,
          errorMsg:rejectAfterAuth.response.data.errorMessage
        })
      })
    }

  }
  /**
   * Views
   */
  const showSigninForm = () => {
    return (
      <Container>
        <Row className='d-flex justify-content-center'>
          <Col className="col-lg-7 p-4 mt-4 ">
            <div className='d-flex justify-content-center'>
              {loading && showLoading()}
            </div>

            {errorMsg && showErrorAlertMessages(errorMsg)}
            <form onSubmit={onSubmitfunction} noValidate>
              <div className="form-group">
                <label ><h4>Email address</h4></label>
                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter email address" name='email' value={email} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label ><h4>Password</h4></label>
                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter password" name='password' value={password} onChange={handleChange} />
              </div>

              <Button type='submit' className='btn btn-dark'>
                Signin
              </Button>
              <p>Don't have an account.? <Link to="/signup">Register me</Link></p>
            </form>
          </Col>
        </Row>
      </Container>
    )

  }
  return (
    <div className='signincontainer' >
      {showSigninForm()}
    </div>
  )
}

export default Signin