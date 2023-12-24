import { Button, Col, Form, Input, Row, message } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setCookie } from "../../helpers/cookie"
import { generateToken } from "../../helpers/generateToken"
import { checkExits, register } from "../../services/userService"

function Register() {
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate()
    const handleSubmit = async (values) => {
        const fullName = values.fullName
        const email = values.email
        const password = values.password
        const checkExitsEmail = await checkExits("email", email)
        if (checkExitsEmail.length > 0) {
            messageApi.open({
                type: 'error',
                content: 'Email đã tồn tại',
            });
        } else {
            const options = {
                fullName: fullName,
                email: email,
                password: password,
                token: generateToken()
            }
            const result = await register(options)
            if (result) {
                messageApi.open({
                    type: 'success',
                    content: 'Đăng ký thành công',
                });
                navigate("/login")
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'Đăng ký không thành công',
                });
            }
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
                    <h3 className='form-login__heading'>Đăng ký</h3>
                    <Form className='form-login' layout='vertical' onFinish={handleSubmit} >
                        <Form.Item label='Họ và tên' name='fullName' rules={rules}>
                            <Input/>
                        </Form.Item>
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

export default Register