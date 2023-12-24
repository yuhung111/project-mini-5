import { Button } from "antd"
import { useNavigate } from "react-router-dom"
import './Home.scss'
import { getCookie } from "../../helpers/cookie"

function Home() {
    const navigate = useNavigate()
    const token = getCookie("token")
    const handleClick = () => {
        if (token) {
            navigate("topics")
        } else {
            navigate("login")
        }
    }
    // const token = getCookie("token")
    return (
        <>
            <Button className="button" type="primary" onClick={handleClick}>
                Get starting
            </Button>
        </>
    )
}

export default Home