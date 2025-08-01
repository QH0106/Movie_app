import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './css/Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        showPassword: false,
        showConfirmPassword: false,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const togglePassword = () => {
        setFormData((prev) => ({ ...prev, showPassword: !prev.showPassword }));
    };

    const toggleConfirmPassword = () => {
        setFormData((prev) => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const { username, email, password, confirmPassword } = formData;

        if (!username || !email || !password || !confirmPassword) {
            setMessage("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Mật khẩu và xác nhận mật khẩu không khớp!");
            return;
        }

        // Kiểm tra định dạng mật khẩu
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        if (!passwordRegex.test(password)) {
            setMessage("Mật khẩu phải có ít nhất 8 ký tự, 1 chữ in hoa và 1 ký tự đặc biệt!");
            return;
        }

        // Giả lập đăng ký thành công
        // Trong một ứng dụng thực tế, bạn sẽ gửi dữ liệu này đến backend của mình
        console.log("Đăng ký với thông tin:", formData);
        // Lưu thông tin đăng ký vào localStorage cho mục đích demo
        localStorage.setItem('registeredUser', JSON.stringify({ username, password }));
        setMessage("Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.");
        // Tùy chọn chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
        setTimeout(() => {
            navigate('/Login');
        }, 2000);
    };

    return (
        <div className="register-container">
            <div className="backgroundRegister"></div>
            <div className="form-register">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="group">
                        <label htmlFor="username">Tên người dùng</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Nhập tên người dùng"
                            value={formData.username}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </div>

                    <div className="group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Nhập email"
                            value={formData.email}
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

                    <div className="group">
                        <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                        <div className="password-container">
                            <input
                                type={formData.showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Xác nhận mật khẩu"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                            <FontAwesomeIcon
                                icon={formData.showConfirmPassword ? faEye : faEyeSlash}
                                onClick={toggleConfirmPassword}
                                aria-label="Hiển thị / Ẩn mật khẩu"
                                tabIndex={0}
                            />
                        </div>
                    </div>

                    {message && <p className="message" style={{ color: message.includes('thành công') ? 'green' : 'red' }}>{message}</p>}

                    <button type="submit" className="register-button">Đăng ký</button>

                    <div className="login-link">
                        Bạn đã có tài khoản? <a href="/Login">Đăng nhập ngay</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register; 