/**
 * ====pending works====
 * change placeholder of file input 
 * when a file is inserted.
 */

import React, { Fragment, useState } from 'react'
import { Button } from 'react-bootstrap'
import { createCategory, getCategories } from '../../api/category'
import { createProduct } from '../../api/product';
import isEmpty from 'validator/lib/isEmpty';
import { showErrorAlertMessages } from '../../helpers/messages';
import { showSuccessAlertMessages } from '../../helpers/messages';
import { showLoading } from '../../helpers/loading';
import { useEffect } from 'react';

const AdminDashboard = () => {
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false)
    const [productData, setProductData] = useState({
        productImage: null,
        productName: '',
        productDesc: '',
        productPrice: '',
        productCategory: '',
        productQty: ''
    });

    useEffect(() => {
        loadCategories()
        console.log('use effect called')
    }, [loading])

    const loadCategories = async () => {
        await getCategories()
            .then((response) => {
                setCategories(response.data.categories)
            })
            .catch((err) => {
                return err
            })
    }

    const handleMessages = (event) => {
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
                .then((resp) => {
                    setLoading(false)
                    setCategory('')
                    setSuccessMsg(resp.data.successMessage)
                })
                .catch((err) => {
                    setLoading(false)
                    setCategory('')
                    setErrorMsg(err.response.data.errorMessage)
                })
        }
    }

    const handleProductSubmit = (event) => {
        event.preventDefault()
        if (productData.productImage === null) {
            setErrorMsg('Please select an image')
        } else if (isEmpty(productData.productName) || isEmpty(productData.productPrice) || isEmpty(productData.productDesc)) {
            setErrorMsg('All fields are required')
        }
        else if (isEmpty(productData.productCategory)) {
            setErrorMsg('Please select a category')
        }
        else if (isEmpty(productData.productQty)) {
            setErrorMsg('plese selct a quantity')
        } else {
            let formData = new FormData()
            formData.append('productImage', productData.productImage)
            formData.append('productName', productData.productName)
            formData.append('productDesc', productData.productDesc)
            formData.append('productPrice', productData.productPrice)
            formData.append('productCategory', productData.productCategory)
            formData.append('productQty', productData.productQty)
            setLoading(true)
            createProduct(formData)               
                .then((response) => {
                    setLoading(false)
                    setProductData({
                        productImage: null,
                        productName: '',
                        productDesc: '',
                        productPrice: '',
                        productCategory: '',
                        productQty: ''
                    })
                    setSuccessMsg(response.data.successMessage)
                })
                .catch((err) => {
                    setLoading(false)
                    setProductData({
                        productImage: null,
                        productName: '',
                        productDesc: '',
                        productPrice: '',
                        productCategory: '',
                        productQty: ''
                    })
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
                            setCategory('')
                        }}>+ Add Category</Button>
                    </div>
                    <div className="col-md-4 text-white py-2 d-flex justify-content-around">
                        <Button className='bg-warning' data-toggle="modal" data-target="#addFood" onClick={() => {
                            setLoading(false)
                            setErrorMsg('')
                            setSuccessMsg('')
                        }}>+ Add Food</Button>
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
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => {

                                }}>
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
    const handleFileChange = (event) => {
        // let imageInput = document.getElementById('labelinput')
        // console.log(imageInput)
        // imageInput.innerHTML = event.target.files[0].name

        setProductData({
            ...productData,
            [event.target.name]: event.target.files[0],


        })
    }
    const handleProductChange = (event) => {

        setProductData({
            ...productData,
            [event.target.name]: event.target.value
        })
    }
    const addFoodModal = () => {

        return (
            <div className="modal fade" id="addFood" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content" >

                        <form onSubmit={handleProductSubmit}>
                            <div className="modal-header bg-warning text-white">
                                <h5 className="modal-title" id="exampleModalCenterTitle">Add Food</h5>
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
                                            <div className="custom-file mb-2">
                                                <input type="file" className="custom-file-input" id="inputGroupFile01" name='productImage' onChange={handleFileChange} />
                                                <label className="custom-file-label" htmlFor="inputGroupFile01" id='labelinput'>Choose File</label>

                                            </div>

                                            <div className="form-group ">
                                                <label htmlFor="inputName">Name</label>
                                                <input type="text" className="form-control" id="inputName" placeholder="Name" name='productName' value={productData.productName} onChange={handleProductChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleFormControlTextarea1">Description</label>
                                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="4" name='productDesc' value={productData.productDesc} onChange={handleProductChange}></textarea>
                                            </div>

                                            <div className="form-group ">
                                                <label htmlFor="inputAddPrice">Price</label>
                                                <input type="text" className="form-control" id="inputPrice" placeholder="Price" name='productPrice' value={productData.productPrice} onChange={handleProductChange} />
                                            </div>

                                            <div className="row">
                                                <div className="col">
                                                    <label htmlFor="inputAddCategory">Category</label>
                                                    <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" name='productCategory' value={productData.productCategory} onChange={handleProductChange}>
                                                        <option value={1}>Choose...</option>
                                                        {categories && categories.map((c) => {
                                                            return <option key={c._id} value={c._id} >{c.category}</option>
                                                        })}



                                                    </select>
                                                </div>
                                                <div className="col">
                                                    <label htmlFor="inputAddQuantity">Quantity</label>
                                                    <input type="Number" className="form-control" placeholder="Enter quantity" min="0" max="1000" name='productQty' value={productData.productQty} onChange={handleProductChange} />
                                                </div>
                                            </div>
                                        </Fragment>
                                    )
                                }
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-warning" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-warning">Submit</button>
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
            {addFoodModal()}

        </div>
    )
}

export default AdminDashboard