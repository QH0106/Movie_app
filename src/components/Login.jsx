import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './css/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
      username: "",
      password: "",
      showPassword: false,
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const togglePassword = () => {
      setFormData((prev) => ({ ...prev, showPassword: !prev.showPassword }));
    };
  
    const handleLogin = async (e) => {
      e.preventDefault();
      const { username, password } = formData;
  
      if (!username || !password) {
        setMessage("Tên người dùng và mật khẩu không được để trống!");
        return;
      }
  
    // kiểm tra mật khẩu
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
      if (!passwordRegex.test(password)) {
        setMessage("Mật khẩu phải có ít nhất 8 ký tự, 1 chữ in hoa và 1 ký tự đặc biệt!");
        return;
      }

    // kiểm tra có tài khoản trong local
    const RegisterUser = JSON.parse(localStorage.getItem('registeredUser'));

    if (RegisterUser && RegisterUser.username === username && RegisterUser.password === password) {
      const mockUser = { name: username, email: `${username}@example.com` }; 
      localStorage.setItem('user', JSON.stringify(mockUser));
      alert("Đăng nhập thành công!");
      navigate('/Home'); 
    } else if (username === "huylq" && password === "Huylq008@") {
      const mockUser = { name: "Huy", email: "huylq@gmail.com.com" };
      localStorage.setItem('user', JSON.stringify(mockUser));
      alert("Đăng nhập thành công!");
      navigate('/Home'); 
    } else {
      setMessage("Sai tên người dùng hoặc mật khẩu!");
    }
    };

    const handleSuccess = async (credentialResponse) => {
        try {
            // Gửi token đến backend của bạn để xác thực 
            // const response = await fetch(`${config.BACKEND_URL}/auth/google`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         credential: credentialResponse.credential,
            //     }),
            // });
            // Mock successful login response
            
            // thông tin người dùng từ thông tin đăng nhập
            const base64Url = credentialResponse.credential.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const decodedToken = JSON.parse(jsonPayload);
            
            // Dữ liệu người dùng giả lập với thông tin thực tế
            const mockUserData = {
                name: decodedToken.name,
                email: decodedToken.email,
                picture: decodedToken.picture,
                isGoogleUser: true
            };

            // Kiểm tra trạng thái phản hồi của server 
            // if (!response.ok) {
            //     const errorText = await response.text();
            //     console.error('Server response:', errorText);
            //     throw new Error(`HTTP error! status: ${response.status}`);
            // }

            // // Kiểm tra content type
            // const contentType = response.headers.get("content-type");
            // if (!contentType || !contentType.includes("application/json")) {
            //     const text = await response.text();
            //     console.error('Unexpected response type:', contentType);
            //     console.error('Response content:', text);
            //     throw new TypeError("Response was not JSON");
            // }

            // const data = await response.json();
            // localStorage.setItem('user', JSON.stringify(data));
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(mockUserData));
            
            // Hiển thị thông báo thành công
            alert("Đăng nhập Google thành công!");
            
            // Chuyển hướng đến trang chủ
            navigate('/Home');
        } catch (error) {
            console.error('Lỗi đăng nhập Google:', error);
            setMessage("Đăng nhập Google thất bại! Vui lòng thử lại sau.");
        }
    };

    const handleError = () => {
        console.log('Đăng nhập Google thất bại');
        setMessage("Đăng nhập Google thất bại!");
    };

    return (
        <div className="login-container">
            <div className="backgroundLogin"></div>
                <div className="form-login">
                    <h2>Login</h2>

                    <form onSubmit={handleLogin}>
                    <div className="group">
                        <label htmlFor="username">Tên</label>
                        <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Nhập username"
                        value={formData.username}
                        onChange={handleChange}
                        autoComplete="off"
                        />
                    </div>

                    <div className="group">
                        <label htmlFor="password">Mật khẩu</label>
                        <div className="password-container">
                        <input
                            type={formData.showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="Nhập mật khẩu"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                        <FontAwesomeIcon
                            icon={formData.showPassword ? faEye : faEyeSlash}
                            onClick={togglePassword}
                            aria-label="Hiển thị / Ẩn mật khẩu"
                            tabIndex={0}
                        />
                        </div>
                    </div>

                    {message && <p className="message" style={{ color: 'red' }}>{message}</p>}

                    <div className="forgot-password">
                        <a href="/Forgotpassword">Quên mật khẩu?</a>
                    </div>

                    <button type="submit" className="login">Đăng nhập</button>

                    <p className="text">Hoặc tiếp tục với</p>

                    <div className="icon-social">
                        <div className="link-social">
                            <GoogleLogin
                                onSuccess={handleSuccess}
                                onError={handleError}
                                useOneTap
                            />
                        </div>
                    </div>

                    <div className="register">
                        Bạn chưa có tài khoản? <a href="/Register">Đăng ký ngay</a>
                    </div>
                    </form>
                </div>
           
        </div>
    );
};

export default Login; 