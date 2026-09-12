const { useState, useEffect, useRef } = React;

export const OTPGenerator = () => {
    const [otp, setOtp] = useState("");
    const [timeLeft, setTimeLeft] = useState(null);
    const timerRef = useRef(null);

    function generateOtp() {
        const newOtp = Math.floor(100000 + Math.random() * 900000);
        setOtp(newOtp)
        setTimeLeft(5);
    }

    useEffect(() => {
        if (timeLeft === null) return;

        if (timeLeft === 0) {
            clearInterval(timerRef.current);
            setOtp('');
            return;
        }

        if (timeLeft === 5) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }

        return (() => {
            if (timeLeft === 0) clearInterval(timerRef.current);
        })

    }, [timeLeft]);

    function getMessage() {
        if (timeLeft === null) return '';
        if (timeLeft === 0) {
            return "OTP expired. Click the button to generate a new OTP."
        }
        return `Expires in: ${timeLeft} seconds`
    }

    function isDisabled() {
        if (timeLeft === null || timeLeft === 0) {
            return false;
        }
        return true
    }

    return (
        <div className="container">
            <h1 id="otp-title">OTP Generator</h1>
            <h2 id="otp-display">{otp ? otp : "Click 'Generate OTP' to get a code"}</h2>
            <p id="otp-timer" aria-live="polite">{getMessage()}</p>
            <button
                id="generate-otp-button"
                onClick={generateOtp}
                disabled={isDisabled()}
            >Generate OTP</button>
        </div>
    )
}