import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OtpInput = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (otp) {
            setLoading(true); // Set loading to true to indicate the button is loading
            console.log('OTP verified!');

            // Simulate a delay for the loading effect
            setTimeout(() => {
                setLoading(false); // Set loading to false once the delay is over
                navigate('/Home');  // Redirect to the home page
            }, 2000); // 2000ms delay (2 seconds)
        } else {
            alert('Please enter the OTP');
        }
    };

    return (
        <div className="w-[350px] h-[589px] text-center mt-[50px] m-auto">
            <h1 className="text-[16px] text-[#737373]">Enter the OTP sent to your email or phone</h1>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Enter OTP"
                    className="text-[#000] bg-[#fafafa] mb-[7px] border-[1px] w-[258px] h-[36px] text-[13px] text-left pt-[9px] pb-[7px] pl-[8px]"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
                <button
                    className="w-[260px] h-[32px] mb-[18px] bg-[#0095f6] text-[14px] text-[#fff] font-semibold opacity-[.7] relative rounded-[8px]"
                    type="submit"
                    disabled={loading} // Disable button while loading
                >
                    {loading ? 'Verifying...' : 'Verify OTP'} {/* Change button text while loading */}
                </button>
            </form>
        </div>
    );
};

export default OtpInput;
