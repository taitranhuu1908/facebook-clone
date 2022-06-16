import React from 'react'
import './login.scss'
import {Box, Divider, ButtonBase, Container, InputBase, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {Link} from 'react-router-dom';

const InputLogin = styled(InputBase)`
  background-color: white;
  border-radius: 6px;
  font-size: 17px;
  padding: 10px 12px;
  width: 330px;
  border: 1px solid #dddfe2;
`

const ButtonLogin = styled(ButtonBase)`
  background-color: #1877f2;
  border: none;
  border-radius: 6px;
  font-size: 20px;
  line-height: 48px;
  padding: 0 16px;
  width: 332px;
  color: white;
  font-weight: bold;
  margin-top: 10px;
`

const ButtonCreateNew = styled(ButtonBase)`
  border: none;
  border-radius: 6px;
  font-size: 17px;
  line-height: 48px;
  padding: 0 16px;
  background-color: #42b72a;
  color: white;
  font-weight: bold;
  margin: 10px;
`

const LoginPage: React.FC = () => {
    return (
        <Box className="root__login">
            <Box className="login__top">
                <Container className="login__content">
                    <Box className="content">
                        <img src="/images/dF5SId3UHWd.svg" alt="" className="content__logo"/>
                        <Typography className="content__text">
                            Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.
                        </Typography>
                    </Box>
                    <Box>
                        <form className="login__form">
                            <InputLogin type="text" placeholder="Email hoặc số điện thoại"/>
                            <InputLogin type="password" placeholder="Mật khẩu"/>
                            <ButtonLogin>Đăng nhập</ButtonLogin>
                            <Link className="forgot__text" to="/forgot-password">Quên mật khẩu?</Link>
                            <Divider sx={{width: "332px"}}/>
                            <ButtonCreateNew>Tạo tài khoản mới</ButtonCreateNew>
                        </form>
                        <Box sx={{
                            width: "390px",
                            display: "flex",
                            justifyContent: "center",
                            textAlign: "center",
                            marginTop: "30px"
                        }}>
                            <Typography>
                                <Link to="/create-page" style={{textDecoration: "none"}}>
                                    <Typography color="black" fontWeight="bold" component="span">Tạo Trang</Typography>
                                </Link>
                                {" "}
                                dành cho người nổi tiếng, thương hiệu hoặc doanh nghiệp.
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Box className="login__bottom">
                <Container className="bottom__list">
                    <Link className="text-footer" to={"/login"}>Đăng ký</Link>
                    <Link className="text-footer" to={"/login"}>Đăng nhập</Link>
                    <Link className="text-footer" to={"/login"}>Messenger</Link>
                    <Link className="text-footer" to={"/login"}>Facebook</Link>
                    <Link className="text-footer" to={"/login"}>LiteWatch</Link>
                    <Link className="text-footer" to={"/login"}>Địa điểm</Link>
                    <Link className="text-footer" to={"/login"}>Trò chơi</Link>
                    <Link className="text-footer" to={"/login"}>Marketplace</Link>
                    <Link className="text-footer" to={"/login"}>Facebook Pay</Link>
                    <Link className="text-footer" to={"/login"}>Oculus</Link>
                    <Link className="text-footer" to={"/login"}>Portal</Link>
                    <Link className="text-footer" to={"/login"}>Instagram</Link>
                    <Link className="text-footer" to={"/login"}>Bulletin</Link>
                    <Link className="text-footer" to={"/login"}>Địa phương</Link>
                    <Link className="text-footer" to={"/login"}>Chiến dịch gây quỹ</Link>
                    <Link className="text-footer" to={"/login"}>Dịch vụ</Link>
                    <Link className="text-footer" to={"/login"}>Trung tâm thông tin bỏ phiếu</Link>
                    <Link className="text-footer" to={"/login"}>Nhóm</Link>
                    <Link className="text-footer" to={"/login"}>Giới thiệu</Link>
                    <Link className="text-footer" to={"/login"}>Tạo quảng cáo</Link>
                    <Link className="text-footer" to={"/login"}>Tạo Trang</Link>
                    <Link className="text-footer" to={"/login"}>Nhà phát triển</Link>
                    <Link className="text-footer" to={"/login"}>Tuyển dụng</Link>
                    <Link className="text-footer" to={"/login"}>Quyền riêng tư</Link>
                    <Link className="text-footer" to={"/login"}>Cookie</Link>
                    <Link className="text-footer" to={"/login"}>Lựa chọn quảng cáo</Link>
                    <Link className="text-footer" to={"/login"}>Điều khoản</Link>
                    <Link className="text-footer" to={"/login"}>Trợ giúp</Link>
                    <Link className="text-footer" to={"/login"}>Tải thông tin liên hệ lên & đối tượng không phải người dùng</Link>
                    <Link className="text-footer" to={"/login"}>Cài đặt</Link>
                </Container>
            </Box>
        </Box>
    )
}

export default LoginPage