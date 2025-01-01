import { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (email && password && username) {
      try {
        const response = await axios.post("/api/auth/register", {
          email,
          password,
          username,
        });

        alert(response.data.message);
        if (response.status === 200 || response.data.message === 'Registered but not verified') {
          setShowOtpModal(true);
        }
        if (response.data.message === 'Email already registered') {
          navigate('/login');
        }
      } catch (error) {
        alert(error.response?.data?.detail || 'Error during registration');
      }
    } else {
      alert("Please enter all the fields");
    }
  };

  const handleOtpVerification = async () => {
    try {
      const response = await axios.post("/api/auth/verify-otp", null, {
        params: {
          email,
          otp,
        }
      });
      alert(response.data.message);
      if (response.status === 200) {
        console.log(response.data);
        setShowOtpModal(false);
        navigate("/login");
      }
    } catch (error) {
      alert(error.response?.data?.detail || 'Error during OTP verification');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Register</h3>
              <form>
                <div className="mb-3">
                  <label htmlFor="formUsername" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="formUsername"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formEmail" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="formEmail"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="formPassword"
                    placeholder="Password"
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={handleRegister}
                >
                  Register
                </button>
                <div className="text-center mt-3">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => navigate('/login')}
                  >
                    Already have an account? Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showOtpModal && (
        <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">OTP Verification</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowOtpModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="formOtp" className="form-label">
                      Enter OTP sent to your email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="formOtp"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={handleOtpVerification}
                  >
                    Verify OTP
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}