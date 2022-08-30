import axios from 'axios'
import { resolve } from 'promise'

const config = {
    headers: {
        'Content-Type': 'application/json'
    },
}

const headers={
    'Content-Type': 'application/json'
}

export const createCategory = async (formdata) => {   
    return await new Promise((resolve, reject) => {
        axios.post('/api/category/', formdata,{
            headers:headers
        })
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const getCategories = async()=>{
    return await new Promise((resolve,reject)=>{
        axios.get('/api/category/')
        .then((response)=>{
            resolve(response)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}