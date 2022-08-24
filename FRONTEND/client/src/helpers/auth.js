import { getCookies, setCookies,deleteCookie } from "./cookies"
import { getLocalStorage, setLocalStorage,deleteStorage } from "./localStorage"

export const setAuthentication = (token, user) => {
    setCookies("token", token)
    setLocalStorage("user", user)
}

export const isAuthenticated=()=>{
    if(getCookies("token") && getLocalStorage("user")){
        return getLocalStorage("user")
    }else{
        return false
    }
}

export const logout=(callback)=>{
    deleteCookie('token')
    deleteStorage('user')
    callback()
}