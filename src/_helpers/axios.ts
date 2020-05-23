import axios, { AxiosRequestConfig } from 'axios'

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
})

instance.interceptors.request.use((config: AxiosRequestConfig) => {
    const userStr = localStorage.getItem('user')
    if (!userStr) {
        return config
    }
    const user = JSON.parse(userStr)
    const token = user.token
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default instance