import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import equals from 'validator/lib/equals'
import { showErrorAlertMessages, showSuccessAlertMessages } from '../../helpers/messages'
import { showLoading } from '../../helpers/loading'
import { signup } from '../../api/auth'


const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    successMsg: false,
    errorMsg: false,
    loading: false
  })
  const { username, email, password, confirmPassword, successMsg, errorMsg, loading } = formData;

  const onSubmitfunction = (e) => {
    e.preventDefault()

    //client side validation
    if (isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(confirmPassword)) {
      setFormData(
        {
          ...formData,
          errorMsg: "All fields are required"
        })
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Email can't be empty"
      })
    } else if (!equals(password, confirmPassword)) {
      setFormData(
        {
          ...formData,
          errorMsg: "passwords should be the same"
        }
      )
    } else {
      const { username, email, password } = formData;
      const data = { username, email, password }
      setFormData({
        ...formData,
        errorMsg: false,
        loading: true
      })
      signup(data)
        .then((res) => {
          setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            successMsg: res.data.successMessage,
            errorMsg: false,
            loading: false
          })
          navigate("/signin")


        }).catch((err) => {
          console.log('error ocuured', err);
          setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            successMsg: false,
            errorMsg: err.errorMessage,
            loading: false
          })
        })
    }

  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      successMsg: '',
      errorMsg: ''
    })
  }

  const showSignupForm = () => {
    return (
      <Container>
        <Row className='d-flex justify-content-center'>
          <Col className="col-lg-7 p-4 mt-4 ">
            <div className='d-flex justify-content-center'>
              {loading && showLoading()}
            </div>
            {successMsg && showSuccessAlertMessages(successMsg)}
            {errorMsg && showErrorAlertMessages(errorMsg)}
            <form onSubmit={onSubmitfunction} noValidate>
              <div className="form-group">
                <label  ><h4>User name</h4></label>
                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter User name" name='username' value={username} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label ><h4>Email address</h4></label>
                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter email address" name='email' value={email} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label ><h4>Password</h4></label>
                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter password" name='password' value={password} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label ><h4>Confirm password</h4></label>
                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Confirm password" name='confirmPassword' value={confirmPassword} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label ><h6>Already have an account ?<div className='float-right ml-2' >
                  <Link to="/signin" className='btn btn-success text-white'>Log in</Link>
                </div></h6></label>
              </div>

              <Button type='submit' className='btn btn-dark '>
                Submit
              </Button>
            </form>
          </Col>
        </Row>
      </Container>
    )

  }


  return (
    <div className='signupcontainer' >
      {showSignupForm()}
    </div>
  )
}

export default Signup