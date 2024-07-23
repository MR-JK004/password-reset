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
  MDBInput
} from 'mdb-react-ui-kit';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';

const inputVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } }
};

function ForgetPasswordPage() {

  const [email, setEmail] = React.useState('');

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Email Address is Required")
      return;
    }
    try {
      console.log("Sending registration request...");
      let response = axios.post('https://password-reset-backend-x8vm.onrender.com/user/forget-password', {
        email: email
      })

      if ((await response).status == 200) {
        toast.success((await response).data)
        setEmail('')
        console.log(response);
      }
      else {
        toast.error('Email Sent failed' || response.data.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
      console.error(error);
    }

  }

  return <>
    <MDBContainer className="my-5 d-flex justify-content-center">
      <MDBCard style={{ borderRadius: '1rem', maxWidth: '900px', marginTop: '50px' }}>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
            <MDBCardImage src='https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1095.jpg' alt="login form" className='rounded-start w-100 h-100' style={{ objectFit: 'cover' }} />
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column justify-content-center'>

              <div className='d-flex flex-row mt-2 justify-content-center'>
                <img className='logo' src="https://thumbs.dreamstime.com/b/reset-password-button-to-redo-security-pc-new-code-securing-computer-d-illustration-reset-password-button-to-redo-security-159173694.jpg" alt="Logo" />
              </div>

              <motion.div variants={inputVariant} initial="hidden" animate="visible" style={{ marginTop: '40px' }}>
                <h5 className="fw-normal my-4 pb-1 text-left" style={{ letterSpacing: '1px', color: '#393f81', lineHeight: '1.5' }}>
                  Enter Your Registered E-mail address. We will send a password reset link to your mail id. Use it to reset your password.
                </h5>
              </motion.div>

              <motion.div variants={inputVariant} initial="hidden" animate="visible">
                <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
              </motion.div>

              <motion.div variants={inputVariant} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                <MDBBtn style={{ marginLeft: '100px' }} className="mb-4 px-5" color='dark' size='lg' onClick={handleSubmit}>Send Link</MDBBtn>
              </motion.div>

              <div className='d-flex flex-row justify-content-center'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>
    </MDBContainer>
  </>
}

export default ForgetPasswordPage