import React, { useState } from 'react';
import InstagramLogo from '../assets/logo/InstagramLogo.png';
import { useNavigate } from 'react-router-dom';
import { IoLogoFacebook } from "react-icons/io";

const Signup = () => {
    const navigate = useNavigate();
    const [mobileOrEmail, setMobileOrEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        if (mobileOrEmail && fullName && username && password) {
            // Implement actual signup logic here
            console.log('Signup successful!');
            // Navigate to OTP input page
            navigate('/OtpInput');  // Ensure this route is defined in your router
        } else {
            alert('Please fill in all the fields');
        }
    };

    const handleClickSignup = () => {
        navigate('/login');  // Navigate to login page
    };

    return (
        <div>
            <div className="w-[350px] h-[589px] text-center mt-[50px] m-auto">
                <div className="flex flex-col items-center border border-gray-300 rounded-sm box-border shrink-0 text-base m-0 mb-2.5 p-2.5 relative align-baseline">
                    <img className="w-[175px] h-[51px] m-[20px]" src={InstagramLogo} alt="Instagram Logo" />
                    <h1 className="w-[268px] h-[70px] text-[16px] text-[#737373] text-center">
                        Sign up to see photos and videos from your friends.
                    </h1>
                    <button className="w-[260px] h-[32px] bg-[#0095F6] rounded-[8px] flex items-center justify-center relative mb-[10px]" type="button">
                        <IoLogoFacebook className="text-[#fff] text-[20px]" />
                        <span className="ml-[8px] text-[14px] text-[#ffffff] font-semibold">Log in with Facebook</span>
                    </button>
                    <div className="flex justify-center mb-[17px] items-center">
                        <div className="w-[107px] h-[1px] bg-gray-300"></div>
                        <div className="mr-[18px] ml-[18px] text-[13px] text-gray-500">OR</div>
                        <div className="w-[107px] h-[1px] bg-gray-300"></div>
                    </div>
                    <form onSubmit={handleSignup}>
                        <input
                            placeholder='Mobile Number or Email'
                            maxLength="75"
                            className="text-[#000] bg-[#fafafa] mb-[7px] border-[1px] w-[258px] h-[36px] text-[13px] text-left pt-[9px] pb-[7px] pl-[8px]"
                            type="text"
                            value={mobileOrEmail}
                            onChange={(e) => setMobileOrEmail(e.target.value)}
                        />
                        <input
                            placeholder='Full Name'
                            maxLength="75"
                            className="bg-[#fafafa] text-[#000] mb-[7px] border-[1px] w-[258px] h-[36px] text-[13px] text-left pt-[9px] pb-[7px] pl-[8px]"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <input
                            placeholder='Username'
                            maxLength="75"
                            className="bg-[#fafafa] text-[#000] mb-[7px] border-[1px] w-[258px] h-[36px] text-[13px] text-left pt-[9px] pb-[7px] pl-[8px]"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            placeholder='Password'
                            maxLength="75"
                            className="bg-[#fafafa] text-[#000] mb-[7px] border-[1px] w-[258px] h-[36px] text-[13px] text-left pt-[9px] pb-[7px] pl-[8px]"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="w-[280px] h-auto m-auto">
                            <span className="text-[12px] text-center w-[20px] h-auto mb-[10px]">
                                People who use our service may have uploaded your contact information to Instagram. <span className="text-[#00376b]">Learn More</span>
                            </span>
                            <div>
                                <span className="text-[12px] text-center w-[20px] h-auto mb-[10px]">
                                    By signing up, you agree to our <span className="text-[#00376b]">Terms, Privacy Policy and Cookies Policy.</span>
                                </span>
                            </div>
                        </div>
                        <button
                            className="w-[260px] h-[32px] mb-[18px] bg-[#0095f6] text-[14px] text-[#fff] font-semibold opacity-[.7] relative rounded-[8px]"
                            type="submit"
                        >
                            Sign up
                        </button>
                    </form>
                </div>
                <div className="flex flex-col items-center border border-[#dbdbdb] rounded-[1px] box-border shrink-0 font-inherit text-[100%] m-0 mb-[10px] p-[10px_0] relative align-baseline">
                    <h1 className="text-[14px] m-[15px]">
                        Have an account? <span onClick={handleClickSignup} className="text-[#0064e0] font-medium cursor-pointer">Log in</span>
                    </h1>
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

export default Signup;
