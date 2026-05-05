import { useEffect } from 'react'
import GetStartedBtn from './GetStartedBtn'
import { defaultUser } from '../utils/defaultUser'
import api from "../../axios";
import { useAlert } from '../utils/AlertProvider'
import { checkToken } from '../utils/checkToken'
import { useUser } from '../utils/UserProvider'
import { useLoading } from '../utils/LoadingProvider'
import MainHeading from './MainHeading'
import RegtdUsers from './RegtdUsers'
import Slogan from './Slogan'

export default function Home() {
    const { setUserData } = useUser()
    const { setIsLoading } = useLoading()
    const { setAlert } = useAlert()

    useEffect(() => {
        const logoutPrevUser = async () => {
            try {
                setIsLoading(true)

                const isValid = await checkToken()

                if (isValid) {
                    const response = await api.post("/user/logout")

                    if (response.status === 200) {
                        setUserData({ ...defaultUser })
                        console.log("Previous user logged out.")
                    }
                }
            } catch (err) {
                console.log("Logout error:", err.message)

                setAlert({
                    message: "Something went wrong while logging out"
                })

            } finally {
                setIsLoading(false)
            }
        }

        logoutPrevUser()
    }, [])

    return (
        <>
            <div className='flex flex-col select-none'>
                <div className='flex justify-center'>
                    <Slogan />
                </div>

                <div className='w-full justify-center flex items-center flex-col sm:flex-row'>
                    <div className='m-8'>
                        <MainHeading />
                    </div>

                    <div className='flex flex-col justify-center mt-8'>
                        <RegtdUsers />
                        <GetStartedBtn />
                    </div>
                </div>
            </div>
        </>
    )
}