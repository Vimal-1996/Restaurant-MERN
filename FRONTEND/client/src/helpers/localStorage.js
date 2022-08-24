export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const deleteStorage = (key) => {
    localStorage.removeItem(key)
}


