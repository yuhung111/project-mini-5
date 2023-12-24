import { useNavigate } from 'react-router-dom'
import { deleteAllCookie } from '../../helpers/cookie'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkLogin } from '../../actions'

function Logout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLogin = useSelector(state => state.loginReducer)
    deleteAllCookie()
    useEffect(() => {
        dispatch(checkLogin(false))
        navigate("/login")
    }, [])
    return (
        <>
        </>
    )
}

export default Logout