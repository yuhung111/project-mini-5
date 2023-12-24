import { Button, Col, Form, Input, Row, message } from 'antd'
import "./Login.scss"
import { login } from '../../services/userService'
import { useNavigate } from 'react-router-dom'
import { setCookie } from '../../helpers/cookie'
import { useDispatch } from 'react-redux'
import { checkLogin } from '../../actions/index'

function Login() {
    const [messageApi, contextHolder] = message.useMessage()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = async (values) => {
        let email = values.email
        let password = values.password
        const result = await login(email, password)
        if (result.length > 0) {
            messageApi.open({
                type: 'success',
                content: 'Đăng nhập thành công',
            });
            setCookie("id", result[0].id, 1)
            setCookie("fullName", result[0].fullName, 1)
            setCookie("email", result[0].email, 1)
            setCookie("token", result[0].token, 1)
            navigate("/")
            dispatch(checkLogin(true))
        } else {
            messageApi.open({
                type: 'error',
                content: 'Đăng nhập thất bại',
            });
        }
    }
    const rules = [
        {
        required: true,
        message: 'Bắt buộc!',
        },
    ]
    return (
        <>
            {contextHolder}
            <Row>
                <Col span={8} offset={8}>
                    <h3 className='form-login__heading'>Đăng nhập</h3>
                    <Form className='form-login' layout='vertical' onFinish={handleSubmit} >
                        <Form.Item label='email' name='email' rules={rules}>
                            <Input/>
                        </Form.Item>
                        <Form.Item  label='Mật khẩu' name='password' rules={rules}>
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default Login