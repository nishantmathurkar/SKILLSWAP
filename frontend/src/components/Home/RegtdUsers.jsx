import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useAlert } from '../utils/AlertProvider'

export default function RegtdUsers() {
    const [users, setUsers] = useState('⌛')
    const { setAlert } = useAlert()

    useEffect(() => {
        const fetchRegtdUsers = async () => {
            try {
                const baseURL = import.meta.env.VITE_BACKEND_URL

                if (!baseURL) {
                    throw new Error("VITE_BACKEND_URL is missing in .env")
                }

                const response = await Axios.get(`${baseURL}/home`)

                if (response.status === 200) {
                    setUsers(response.data)
                }

            } catch (err) {
                console.error("Couldn't fetch users:", err.message)
                setAlert({
                    message: "Couldn't fetch no. of registered users"
                })
            }
        }

        fetchRegtdUsers()
    }, [])

    return (
        <div className="flex justify-center items-center">
            Registered <b>{users}</b> users
        </div>
    )
}