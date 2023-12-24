import { Link, NavLink, Outlet } from 'react-router-dom'
import { getCookie } from '../../helpers/cookie'
import { Button, Layout } from 'antd';
import { useSelector } from 'react-redux';
import "./LayoutDefault.scss"

const { Footer, Content } = Layout;

function LayoutDefault() {
    const token = getCookie("token")
    const isLogin = useSelector(state => state.loginReducer)
    return (
        <>
            <Layout className='layout-default'>
                <header className="layout-default__header">
                    <div className="layout-default__logo">
                        <Link to="/">Quiz</Link>
                    </div>
                    <div className='layout-default__menu'>
                        <NavLink to="/">Home</NavLink>
                        {token && (
                            <>
                                <NavLink to="/topics">Topic</NavLink>
                                <NavLink to="/answers">Answers</NavLink>
                            </>
                        )}
                    </div>
                    <div className='layout-default__account'>
                        {token ? (
                            <Button type='text'>
                                <NavLink to='/logout'>Logout</NavLink>
                            </Button>
                        ) : (
                            <>
                                <Button type='text'>
                                    <NavLink to="/login">Đăng nhập</NavLink>
                                </Button>
                                <Button type='text'>
                                    <NavLink to="/register">Đăng ký</NavLink>
                                </Button>
                            </>
                        )}
                    </div>
                </header>
                <Layout>
                    <Content className='layout-default__main'>
                        <Outlet />
                    </Content>
                </Layout>
                <Footer className='layout-default__footer'>
                    copyright @ 2023 by Tran Cong Hung
                </Footer>
            </Layout>
        </>
    )
}

export default LayoutDefault