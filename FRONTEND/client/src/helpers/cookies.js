import Cookies from "js-cookie";

export const setCookies = (key, value) => {
    Cookies.set(key, value, { expires: 1 })
}

export const getCookies = (key) => {
    return Cookies.get(key)
}

export const deleteCookie = (key) => {
    Cookies.remove(key)
}

