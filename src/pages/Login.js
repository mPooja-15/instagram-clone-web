import React, { useState } from 'react';
import InstagramLogo from '../assets/logo/InstagramLogo.png';
import images from '../assets/logo/images.png';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        // Dummy authentication logic, replace this with actual logic
        if (
            (emailOrPhone === 'mailto:user@example.com' || emailOrPhone === '7016404228' || emailOrPhone === 'kundan780') &&
            password === 'p123'
        ) {
            console.log('Login successful!');
            setIsAuthenticated(true);  // Update authentication state
            localStorage.setItem('isAuthenticated', 'true');  // Save auth status to localStorage
            navigate('/home');  // Redirect to home page upon successful login
        } else {
            alert('Invalid email/phone or password');
        }
    };

    const handleClickSignup = () => {
        navigate('/signup');
    };

    return (
        <div>
            {/* Your existing login form */}
            <div className="w-[350px] h-[589px] text-center mt-[50px]  m-auto">
                <div className="flex flex-col items-center border border-gray-300 rounded-sm box-border shrink-0 text-base m-0 mb-2.5 p-2.5 relative align-baseline">
                    <img className="w-[175px] h-[51px] m-[20px]" src={InstagramLogo} alt="Instagram Logo" />
                    <input
                        placeholder='Phone number, username, or email'
                        maxLength="75"
                        className="text-[#000] bg-[#fafafa] mb-[7px] border-[1px] w-[258px] h-[36px] text-[13px] text-left pt-[9px] pb-[7px] pl-[8px]"
                        type="text"
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                    />
                    <div className="relative w-[258px] mb-[17px]">
                        <input
                            placeholder='Password'
                            maxLength="75"
                            className="bg-[#fafafa] text-[#000] border-[1px] w-full h-[36px] text-[13px] text-left pt-[9px] pb-[7px] pl-[8px] pr-[40px]"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-2 text-[13px] text-gray-600 cursor-pointer"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <button
                        className="w-[260px] h-[32px] bg-[#0095f6] text-[14px] text-[#fff] font-semibold opacity-[.7] relative rounded-[8px]"
                        type="submit"
                        onClick={handleLogin} >
                        Log in
                    </button>
                    <div className="flex justify-center items-center">
                        <div className="w-[107px] h-[1px] bg-gray-300"></div>
                        <div className="mr-[18px] ml-[18px] text-[13px] text-gray-500">OR</div>
                        <div className="w-[107px] h-[1px] bg-gray-300"></div>
                    </div>
                    <button className="flex items-center justify-center relative mb-[10px]" type="button">
                        <img className="w-[16px] h-[16px]" src={images} alt="Facebook logo" />
                        <span className="ml-[8px] text-[14px] text-[#385185] font-semibold">Log in with Facebook</span>
                    </button>
                    <span className="text-[12px] text-[#00376b] cursor-pointer">Forgot password?</span>
                </div>
                <div className="flex flex-col items-center border border-[#dbdbdb] rounded-[1px] box-border shrink-0 font-inherit text-[100%] m-0 mb-[10px] p-[10px_0] relative align-baseline">
                    <h1 className="text-[14px] m-[15px]">Don't have an account? <span onClick={handleClickSignup} className="text-[#0064e0] font-medium cursor-pointer">Sign up</span></h1>
                </div>
                <h1 className="text-[14px] text-gray-500 mb-[10px]">Get the app.</h1>
                <div className="flex justify-center items-center">
                    <a href='https://play.google.com/store/search?q=instagram&c=apps'>
                        <img className="w-[134px] h-[40px] mr-[8px]" src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" alt="Google Play Store" />
                    </a>
                    <img className="w-[120.77px] h-[44px]" src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" alt="Apple Store" />
                </div>
            </div>
        </div>
    );
};

export default Login;
