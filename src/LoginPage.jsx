import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBSpinner
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';

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
      size='lg'
      value={value}
      onChange={onChange}
    />
    <MDBBtn
      className="position-absolute top-50 end-0 translate-middle-y"
      color='link'
      onClick={togglePassword}
      style={{ backgroundColor: 'transparent', border: 'none' }}
    >
      <MDBIcon icon={showPassword ? 'eye-slash' : 'eye'} />
    </MDBBtn>
  </div>
);

function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('All fields are required');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('https://password-reset-backend-x8vm.onrender.com/user/login', {
        email,
        password
      });

      if (response.status === 200) {
        toast.success("Login Successful");
        setEmail('');
        setPassword('');
      } else {
        toast.error(response.data.message || 'Login failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer className="my-5 d-flex justify-content-center">
      <MDBCard style={{ borderRadius: '1rem', maxWidth: '900px' }}>
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <MDBCardImage src='https://images.pexels.com/photos/5926383/pexels-photo-5926383.jpeg?auto=compress&cs=tinysrgb&w=600' alt="login form" className='rounded-start w-100 h-100' style={{ objectFit: 'cover' }} />
          </MDBCol>
          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column justify-content-center'>
              <div className='d-flex flex-row mt-2 justify-content-center'>
                <img className='logo' src="https://thumbs.dreamstime.com/b/reset-password-button-to-redo-security-pc-new-code-securing-computer-d-illustration-reset-password-button-to-redo-security-159173694.jpg" alt="Logo" />
              </div>

              <h5 className="fw-normal my-4 pb-3 text-center" style={{ letterSpacing: '1px' }}>Sign into your account</h5>
              <motion.div variants={inputVariant} initial="hidden" animate="visible">
                <MDBInput wrapperClass='mb-4' label='Email' id='formControlEmail' type='email' size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
              </motion.div>

              <motion.div variants={inputVariant} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                <PasswordInput
                  label='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  showPassword={showPassword}
                  togglePassword={() => setShowPassword(!showPassword)}
                />
              </motion.div>

              <motion.div variants={inputVariant} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={handleLogin} disabled={loading}>
                  {loading ? <BeatLoader size={10} color="#ffffff" /> : 'Login'}
                </MDBBtn>
              </motion.div>

              <Link className="small text-muted" to='/forget-password'>Forgot password?</Link>
              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <Link to='/register' style={{ color: '#393f81' }}>Register here</Link></p>

              <div className='d-flex flex-row justify-content-center'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default LoginPage;
