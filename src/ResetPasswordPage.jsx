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
    MDBIcon,
    MDBInput
} from 'mdb-react-ui-kit';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

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
            <MDBIcon icon={showPassword ? 'eye-slash' : 'eye'} />
        </MDBBtn>
    </div>
);

function ResetPasswordPage() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async () => {
        if (!password || !confirmPassword) {
            toast.error('Both fields are required');
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(`https://password-reset-backend-x8vm.onrender.com/user/reset-password`, { token, password });

            if (response.status === 200) {
                toast.success('Password reset successfully');
                navigate('/');
            } else {
                toast.error(response.data.message || 'Password reset failed');
            }
        } catch (error) {
            toast.error(error.response.data.message || 'Password reset failed');
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

                            <motion.div variants={inputVariant} initial="hidden" animate="visible" style={{ marginTop: '40px' }}>
                                <h5 className="fw-normal my-4 pb-1 text-center" style={{ letterSpacing: '1px', color: '#393f81', lineHeight: '1.5' }}>
                                    Enter Your New Password
                                </h5>
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

                            <motion.div variants={inputVariant} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                                <MDBBtn style={{ marginLeft: '80px' }} className="mb-4 px-5" color='dark' size='lg' onClick={handleSubmit}>Reset Password</MDBBtn>
                            </motion.div>

                            <div className='d-flex flex-row justify-content-center'>
                                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                                <a href="#!" className="small text-muted">Privacy policy</a>
                            </div>
                        </MDBCardBody>
                    </MDBCol>
                    <MDBCol md='6'>
                        <MDBCardImage src='https://img.freepik.com/free-vector/reset-password-concept-illustration_114360-7886.jpg' alt="login form" className='rounded-start w-100 h-100' style={{ objectFit: 'contain' }} />
                    </MDBCol>
                </MDBRow>
            </MDBCard>
        </MDBContainer>
    );
}

export default ResetPasswordPage;
