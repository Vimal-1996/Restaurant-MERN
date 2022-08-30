import axios from "axios";
import { reject, resolve } from "promise";
import { setCookies } from "../helpers/cookies";
import { setLocalStorage } from "../helpers/localStorage";

const config = {
    headers: {
        'Content-Type': 'application/json'
    },
}
export const signup = async (data) => {
    return await new Promise((resolve, reject) => {
        axios.post('/api/auth/signup', data, config)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err.response.data)
            })
    })
}

export const signin = async (data) => {
    return  await  new Promise((resolve,reject)=>{
       axios.post('/api/auth/signin', data, config)
        .then((res) => {
            resolve(res)
        })
        .catch((error) => {
            reject(error)
        })
    })

}