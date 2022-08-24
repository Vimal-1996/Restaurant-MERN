import axios from 'axios'
import { resolve } from 'promise'

const config = {
    headers: {'Context-Type': 'application-json'}
}

export const createCategory = async (formdata) => {  
    console.log("inside create category") 
    return await new Promise((resolve, reject) => {
        axios.post('http://localhost:4000/api/category/', formdata, config)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
    })
}