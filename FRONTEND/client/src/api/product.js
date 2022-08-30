import axios from "axios"


const headers={
    'Content-Type': 'application/json'
}

export const createProduct = async (formData) => {
    return await new Promise((resolve, reject) => {
        axios.post('/api/product/', formData,{headers:headers})
        .then((response)=>{
            console.log(response)
            resolve(response)
        })
        .catch((err)=>{
            reject(err)
        })
    })
    
}