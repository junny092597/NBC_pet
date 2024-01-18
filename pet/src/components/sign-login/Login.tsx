import styled from 'styled-components';
import Swal from 'sweetalert2';
import leftimg from '../../assets/images/testlogin.jpg'
import inputcat from '../../assets/images/Caticon.png'
import inputdog from '../../assets/images/Dogicon.png'

import { auth } from '../../Firebase';
import { signInWithEmailAndPassword,  UserCredential as FirebaseAuthUserCredential, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/modules/AuthSlice'


const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const localLogin = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setEmail("");
        setPassword("");
        dispatch(
          login({
              email: userCredential.user.email,
              displayName: userCredential.user.displayName,
              uid: userCredential.user.uid,
              isLogin: false,
              photoURL: null
          })
        );
        navigate('/');
        Swal.fire({
          title: "로그인 성공",
          text: `${userCredential.user.displayName || "사용자" }님 환영합니다!`,
          confirmButtonColor: "#20b2aa",
          confirmButtonText: "확인",
        //   imageUrl: heart,
        //   imageWidth: 130,
        //   imageHeight: 130,
        //   imageAlt: "Custom image",
        });
        
      } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error with LogIn", errorCode, errorMessage);
        Swal.fire({
          title: "로그인 실패",
          text: "이메일 및 비밀번호를 다시 확인 해 주시기 바랍니다.",
          confirmButtonColor: "#ef4040",
          confirmButtonText: "확인",
        //   imageUrl: erroricon,
        //   imageWidth: 130,
        //   imageHeight: 130,
        //   imageAlt: "Custom image",
        });
      }
    };

    const GoogleLogin = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
  
      const Provider = new GoogleAuthProvider();
      Provider.setCustomParameters({
        prompt: "select_account",
      });
      try {
        const result = await signInWithPopup(auth, Provider);
        dispatch(
          login({
            email: result.user.email,
            displayName: result.user.displayName,
            uid: result.user.uid,
            photoURL: null,
            isLogin: false
          })
        );
        navigate('/');

        Swal.fire({
          title: "로그인 성공",
          text: result.user.displayName + `님 환영합니다!`,
          confirmButtonColor: "#20b2aa",
          confirmButtonText: "확인",
          // imageUrl: heart,
          // imageWidth: 130,
          // imageHeight: 130,
          // imageAlt: "Custom image",
        });
        navigate("/");
      } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error with googleLogIn", errorCode, errorMessage);
      }
    };
    
    const onChange = (e: { target: { name: any; value: any; }; }) => {
      const {
        target: { name, value },
      } = e;
      if (name === "email") {
        setEmail(value);
      }
      if (name === "password") {
        setPassword(value);
      }
    };

    return (
        <Container>
          <Form onSubmit={localLogin}>
          <>
            <Title>LOG IN</Title>
            <InputContainer>
              <Inputcat
                type="email"
                name="email"
                placeholder="E-mail (6~30글자)"
                value={email}
                onChange={onChange}                
              />
              <Inputdog
                type="password"
                name="password"
                placeholder="Password (6~10글자)"
                value={password}
                onChange={onChange}
              />
            </InputContainer>
            <ButtonContainer>
              <Button
                disabled={
                  email === "" ||
                  email.length < 6 ||
                  email.length > 30 ||
                  password === "" ||
                  password.length < 6 ||
                  password.length > 10
                }
              >
                SIGN IN
              </Button>
              <GoogleButton type="button" onClick={GoogleLogin}>
            Google 로그인
          </GoogleButton>
            </ButtonContainer>
           </>
          </Form>
        </Container>

      );
}

const Container = styled.div`
  margin-top: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  /* background-color: #ffffff;
  border-radius: 12px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 380px; */
`;

const Title = styled.h1`
  color: #454545;
  font-size: 60px;
  margin-bottom: 7px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 0px;
`;

const Inputcat = styled.input`
  width: 200px; /* 입력란 너비 설정 */
  height: 30px; /* 입력란 높이 설정 */
  display: block;
  border-radius: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  text-indent: 20px;
  padding: 10px;
  background-image: url(${inputcat}); 
  background-size: 12%;
  background-position: 3%;
  background-repeat: no-repeat;

  &::placeholder {
    font-size: 10px; 
    transform: translateX(2px);
  }
`;

const Inputdog = styled.input`
  width: 200px; /* 입력란 너비 설정 */
  height: 30px; /* 입력란 높이 설정 */
  display: block;
  border-radius: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  text-indent: 20px;

  padding: 10px;
  background-image: url(${inputdog}); 
  background-size: 12%;
  background-position: 3%;
  background-repeat: no-repeat;

  &::placeholder {
    font-size: 10px; 
    transform: translateX(2px)
  }
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  background-color: ${(props) => (props.disabled ? "lightgray" : "#DD74EC")};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  color: #ffffff;
  border: none;
  /* margin-top: 4px; */
  margin-bottom: 2px;
  width: 200px;
  height: 30px;
  border-radius: 30px;
`;

const GoogleButton = styled.button`
  color: #ffffff;
  border: none;
  cursor: pointer;
  margin-top: 4px;
  margin-bottom: 2px;
  width: 200px;
  height: 30px;
  border-radius: 30px;

  &:hover {
    background-color: #EDB7F5;
  }
`;


export default Login