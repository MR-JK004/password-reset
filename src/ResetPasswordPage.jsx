import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from 'mdb-react-ui-kit';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const inputVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } }
};

const PasswordInput = ({ label, value, onChange, showPassword, togglePassword }) => (
  <div className="position-relative">
    <MDBInput
      wrapperClass='mb-4'
      label={label}
      type={showPassword ? 'text' : 'password'}
      size="lg"
      value={value}
      onChange={onChange}
    />
    <MDBBtn
      className="position-absolute top-50 end-0 translate-middle-y"
      color="link"
      onClick={togglePassword}
      style={{ backgroundColor: 'transparent', border: 'none' }}
    >
      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
    </MDBBtn>
  </div>
);

function ResetPasswordPage() {
  const { id, token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
        toast.error('Both fields are required');
        return;
    }
    if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
    }
    setLoading(true);
    try {
        const response = await axios.post('https://password-reset-backend-x8vm.onrender.com/user/reset-password',{token,password});

        if (response.status === 200) {
            toast.success('Password reset successfully');
            navigate('/');
        } else {
            toast.error(response.data.message || 'Password reset failed');
        }
    } catch (error) {
        toast.error(error.response.data.message || 'Password reset failed');
    }
    finally{
        setLoading(false);
    }
};

  return (
    <MDBContainer className="my-5 d-flex justify-content-center">
      <MDBCard style={{ borderRadius: '1rem', maxWidth: '900px', marginTop: '50px' }}>
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column justify-content-center'>
              <div className='d-flex flex-row mt-2 justify-content-center'>
                <img className='logo' src="https://thumbs.dreamstime.com/b/reset-password-button-to-redo-security-pc-new-code-securing-computer-d-illustration-reset-password-button-to-redo-security-159173694.jpg" alt="Logo" />
              </div>

              <motion.div variants={inputVariant} initial="hidden" animate="visible">
                <h5 className="fw-normal my-4 pb-3 text-center" style={{ letterSpacing: '1px' }}>Reset Your Password</h5>
              </motion.div>

              <motion.div variants={inputVariant} initial="hidden" animate="visible">
                <PasswordInput
                  label="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  showPassword={showPassword}
                  togglePassword={() => setShowPassword(!showPassword)}
                />
              </motion.div>

              <motion.div variants={inputVariant} initial="hidden" animate="visible">
                <PasswordInput
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  showPassword={showConfirmPassword}
                  togglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </motion.div>

              <motion.div variants={inputVariant} initial="hidden" animate="visible">
                <MDBBtn className="mb-4 px-5" style={{marginLeft:'80px'}} color='dark' size='lg' onClick={handleSubmit} disabled={loading}>
                  {loading ? <BeatLoader size={10} color="#ffffff" /> : 'Reset Password'}
                </MDBBtn>
              </motion.div>
            </MDBCardBody>
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardImage src='https://info.lse.ac.uk/staff/divisions/dts/assets/images/graphics/infosec/reset-password.jpg' alt="reset password form" className='rounded-start w-100 h-100' style={{ objectFit: 'contain' }} />
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default ResetPasswordPage;
