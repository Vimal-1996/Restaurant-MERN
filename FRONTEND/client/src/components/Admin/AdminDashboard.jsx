import React, { Fragment, useState } from 'react'
import { Button } from 'react-bootstrap'
import { createCategory } from '../../api/category'
import isEmpty from 'validator/lib/isEmpty';
import { showErrorAlertMessages } from '../../helpers/messages';
import { showSuccessAlertMessages } from '../../helpers/messages';
import { showLoading } from '../../helpers/loading';
import { useEffect } from 'react';

const AdminDashboard = () => {
    const [category, setCategory] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false)
    const handleMessages=(event)=>{
        setCategory('')
        setErrorMsg('')
        setSuccessMsg('')
    }
    const handleCategoryChange = (event) => {
        setErrorMsg('')
        setSuccessMsg('')
        setCategory(event.target.value);

    }

    const handleCategorySubmit = (event) => {
        event.preventDefault();
        if (isEmpty(category)) {
            setErrorMsg("Please Enter a category")
        } else {
            const data = { category }
            setLoading(true)
            createCategory(data)
                .then((resp)=>{
                    setLoading(false)
                    setSuccessMsg(resp.data.successMessage)
                })
                .catch((err)=>{
                    setLoading(false)
                    setErrorMsg(err.response.data.errorMessage)
                })
        }
    }

    const showHeader = () => {
        return (
            <div className='bg-dark'>
                <div className="row">
                    <div className="col-md-6 text-white py-2">
                        <h3 className='px-4'> Admin Dashboard</h3>
                    </div>
                </div>
            </div>
        )
    }

    const showActionButtons = () => {
        return (
            <div className='bg-light'>
                <div className="row">
                    <div className="col-md-4 text-white py-2 d-flex justify-content-around" >
                        <Button className='bg-info' data-toggle="modal" data-target="#addCategory" onClick={() => {
                            setLoading(false)
                            setErrorMsg('')
                            setSuccessMsg('')
                        }}>+ Add Category</Button>
                    </div>
                    <div className="col-md-4 text-white py-2 d-flex justify-content-around">
                        <Button className='bg-info'>+ Add Food</Button>
                    </div>
                    <div className="col-md-4 text-white py-2 d-flex justify-content-around">
                        <Button className='bg-info'>+ View Orders</Button>
                    </div>
                </div>
            </div>
        )
    }
    const addCategoryModal = () => {

        return (
            <div className="modal fade" id="addCategory" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content" >


                        <form onSubmit={handleCategorySubmit}>
                            <div className="modal-header bg-info text-white">
                                <h5 className="modal-title" id="exampleModalCenterTitle">Add Category</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body my-2">
                                {errorMsg && showErrorAlertMessages(errorMsg)}
                                {successMsg && showSuccessAlertMessages(successMsg)}

                                {
                                    loading ? (
                                        showLoading()
                                    ) : (
                                        <Fragment>
                                            <label>Add Category</label>
                                            <input type="text" className="form-control" placeholder="Add Category"
                                                value={category}
                                                onChange={handleCategoryChange} />
                                        </Fragment>
                                    )
                                }
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {showHeader()}
            {showActionButtons()}
            {addCategoryModal()}

        </div>
    )
}

export default AdminDashboard