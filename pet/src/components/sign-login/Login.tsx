import styled from 'styled-components';
import Swal from 'sweetalert2';
import inputcat from '../../assets/images/Caticon.png';
import inputdog from '../../assets/images/Dogicon.png';
import erroricon from '../../assets/images/erroricon.png';
import { PiGoogleLogoFill } from 'react-icons/pi';

import { auth } from '../../Firebase';
import {
  signInWithEmailAndPassword,
  UserCredential as FirebaseAuthUserCredential,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/modules/AuthSlice';
import { useCookies } from 'react-cookie';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isRemember, setIsRemember] = useState(false);
  const [cookis, setCookie, removeCookie] = useCookies(['rememberUserId']);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginForm, setLoginForm] = useState({
    userId: '',
    userPassword: '',
  });

  useEffect(() => {
    if (cookis.rememberUserId !== undefined) {
      setLoginForm({ ...loginForm, userId: cookis.rememberUserId });
      setIsRemember(true);
    }
  }, []);

  const handleOnChange = (e: any) => {
    //체크박스 상태 업데이트
    setIsRemember(e.target.checked);
    if (e.target.checked) {
      //쿠키에 userId 값 저장, 유효기간 2000초
      setCookie('rememberUserId', loginForm.userId, { maxAge: 2000 });
    } else {
      //체크 안 되어 있으면 쿠키 삭제
      removeCookie('rememberUserId');
    }
  };

  const localLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      dispatch(
        login({
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
          uid: userCredential.user.uid,
          isLogin: false,
          photoURL: null,
        })
      );
      navigate('/');
      Swal.fire({
        title: '로그인 성공',
        text: `${userCredential.user.displayName || '사용자'}님 환영합니다!`,
        confirmButtonColor: '#A1EEBD',
        confirmButtonText: '확인',
        imageUrl: inputcat,
        imageWidth: 130,
        imageHeight: 130,
        imageAlt: 'Custom image',
      });
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with LogIn', errorCode, errorMessage);
      Swal.fire({
        title: '로그인 실패',
        text: '이메일 및 비밀번호를 다시 확인 해 주시기 바랍니다.',
        confirmButtonColor: '#cc5151',
        confirmButtonText: '확인',
        imageUrl: erroricon,
        imageWidth: 130,
        imageHeight: 130,
        imageAlt: 'Custom image',
      });
    }
  };

  const GoogleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const Provider = new GoogleAuthProvider();
    Provider.setCustomParameters({
      prompt: 'select_account',
    });
    try {
      const result = await signInWithPopup(auth, Provider);
      dispatch(
        login({
          email: result.user.email,
          displayName: result.user.displayName,
          uid: result.user.uid,
          photoURL: null,
          isLogin: false,
        })
      );
      navigate('/');

      Swal.fire({
        title: '로그인 성공',
        text: result.user.displayName + `님 환영합니다!`,
        confirmButtonColor: '#20b2aa',
        confirmButtonText: '확인',
        imageUrl: inputcat,
        imageWidth: 130,
        imageHeight: 130,
        imageAlt: "Custom image",
      });
      navigate('/');
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with googleLogIn', errorCode, errorMessage);
    }
  };

  const onChange = (e: { target: { name: any; value: any } }) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  const register = () => {
    navigate('/Signup');
  };

  return (
    <Container>
      <form onSubmit={localLogin}>
        <>
          <Title>로그인</Title>
          <InputContainer>
            <Inputcat type="email" name="email" placeholder="이메일 (6~30글자)" value={email} onChange={onChange} />
            <Inputdog
              type="password"
              name="password"
              placeholder="비밀번호 (6~10글자)"
              value={password}
              onChange={onChange}
            />
          </InputContainer>
          <ButtonContainer>
            <Button
              disabled={
                email === '' ||
                email.length < 6 ||
                email.length > 30 ||
                password === '' ||
                password.length < 6 ||
                password.length > 10
              }>
              로그인
            </Button>
            <Label>
              <input type="checkbox" onChange={handleOnChange} checked={isRemember} />
              {''}
              <span>아이디 기억하기</span>
            </Label>
            <GoogleBtn>
              <p>
                계정이 없나요?
                <button onClick={register}>회원가입하기</button>
              </p>
              <p>소셜로그인으로 계속하기</p>
            </GoogleBtn>
            <GoogleButton type="button" onClick={GoogleLogin}>
              <PiGoogleLogoFill />
            </GoogleButton>
          </ButtonContainer>
        </>
      </form>
    </Container>
  );
};

const GoogleBtn = styled.div`
  text-align: center;
  font-size: 12px;
  font-family: GmarketSansMedium;
  button {
  font-family: GmarketSansMedium;
  color: red;
  font-size: 12px;
  border: none;
  cursor: pointer;
  margin-top: 30px;
  margin-bottom: 13px;
  outline: none;
  background-color: transparent;
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  margin: 10px;
  margin-top: 200px;
  margin-bottom: 200px;
  font-family: GmarketSansMedium;
`;

const Label = styled.label`
  font-size: 13px;
`;

const Title = styled.h1`
  color: #2e2e2b;
  font-size: 55px;
  margin-bottom: 7px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0px;
`;

const Inputcat = styled.input`
  width: 250px; /* 입력란 너비 설정 */
  height: 40px; /* 입력란 높이 설정 */
  display: block;
  border-radius: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  text-indent: 20px;
  padding: 10px;
  padding-left: 30px;
  background-image: url(${inputcat});
  background-size: 12%;
  background-position: 5%;
  background-repeat: no-repeat;

  &::placeholder {
    font-family: GmarketSansMedium;
    font-size: 12px;
    color: #949393;
    transform: translateX(0px);
  }
`;

const Inputdog = styled.input`
  width: 250px; /* 입력란 너비 설정 */
  height: 40px; /* 입력란 높이 설정 */
  display: block;
  border-radius: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  text-indent: 20px;

  padding: 10px;
  padding-left: 30px;
  background-image: url(${inputdog});
  background-size: 12%;
  background-position: 5%;
  background-repeat: no-repeat;

  &::placeholder {
    font-family: GmarketSansMedium;
    font-size: 12px;
    color: #949393;
    transform: translateX(0px);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  background-color: ${props => (props.disabled ? 'lightgray' : '#D9F8E5')};
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  color: #2e2e2b;
  border: none;
  margin-bottom: 10px;
  width: 250px; /* 입력란 너비 설정 */
  height: 40px; /* 입력란 높이 설정 */
  border-radius: 30px;
  font-family: GmarketSansMedium;
`;

const GoogleButton = styled.button`
  color: #8a8a80;
  font-size: 45px;
  border: none;
  cursor: pointer;
  margin-top: 30px;
  margin-bottom: 2px;
  outline: none;
  background-color: transparent;

  &:hover {
    transform: scale(1.05);
  }
`;

export default Login;
