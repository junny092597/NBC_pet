import styled from "styled-components";
import Swal from "sweetalert2";

import { auth } from "../../Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwdCheck, setPasswdCheck] = useState<string>("");
    const [nickName, setNickName] = useState<string>("");
    const navigate = useNavigate();
  
  
        const signUp = async (e: any) => {
          try {
            e.preventDefault();
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );
            updateProfile(userCredential.user, {
              displayName: nickName,
            });
            await auth.signOut();
            setEmail("");
            setPassword("");
            setPasswdCheck("");
            setNickName("");
            Swal.fire({
              title: "회원가입 성공",
              text: "로그인 화면으로 이동합니다.",
              confirmButtonColor: '#20b2aa',
              confirmButtonText: '확인',
            //   imageUrl: heart,
            //   imageWidth: 130,
            //   imageHeight: 130,
            //   imageAlt: "Custom image",
            });
            navigate('/Signin')
          } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.errorMessage;
            console.log("error with signUp", errorCode, errorMessage);
            Swal.fire({
              title: "회원가입 실패",
              text: "중복이거나 사용할 수 없는 이메일 입니다.",
              confirmButtonColor: '#ef4040',
              confirmButtonText: '확인',
            //   imageUrl: erroricon,
            //   imageWidth: 130,
            //   imageHeight: 130,
            //   imageAlt: "Custom image"
            });
          }
        };
  
    const onChange = (e: any) => {
      const {
        target: { name, value },
      } = e;
      if (name === "email") {
        setEmail(value);
      }
      if (name === "password") {
        setPassword(value);
      }
      if (name === "nickname") {
        setNickName(value);
      }
    };
  
    return (
      <Container>
        <Form onSubmit={signUp}>
          <>
            <Title>SIGN UP</Title>
            <InputContainer>
              <Input
                type="email"
                value={email}
                name="email"
                placeholder="E-mail (6~30글자)"
                minLength={6}
                maxLength={30}
                onChange={onChange}
                required
              />
              <Input
                type="password"
                value={password}
                name="password"
                placeholder="Password (6~10글자)"
                minLength={6}
                maxLength={10}
                onChange={onChange}
                required
              />
              <Input
                type="password"
                value={passwdCheck}
                name="passwdCheck"
                placeholder="Confirm Password (6~10글자)"
                minLength={6}
                maxLength={10}
                onChange={(e) => setPasswdCheck(e.target.value)}
                required
              />
              {passwdCheck !== "" && password !== passwdCheck && (
                <P> 비밀번호가 일치하지 않습니다.</P>
              )}
              <Input
                type="text"
                value={nickName}
                name="nickname"
                placeholder="Nickname (2~5글자)"
                minLength={2}
                maxLength={8}
                onChange={onChange}
                required
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
                  password.length > 10 ||
                  passwdCheck === "" ||
                  passwdCheck.length < 6 ||
                  passwdCheck.length > 10 ||
                  nickName === "" ||
                  nickName.length < 2 ||
                  nickName.length > 8 ||
                  password !== passwdCheck
                }
              >
                회원가입
              </Button>
            </ButtonContainer>
          </>
        </Form>
      </Container>
    );
  }
  
  const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  max-width: 200%;
  margin: 10px;
  margin-top: 200px;
  margin-bottom: 200px;
  font-family: GmarketSansMedium;
  `;
  
  const Form = styled.form`
    border-radius: 12px;
    display: flex;
    flex-direction: column;
  `;
  
  const Title = styled.h1`
  color: #312B2B;
  font-size: 56px;
  margin-bottom: 7px;
  align-items: center;
  justify-content: center;
  display: flex;
  `;
  
  const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 0;
    
  `;
  
  const Input = styled.input`
  width: 250px; /* 입력란 너비 설정 */
  height: 40px; /* 입력란 높이 설정 */
  display: block;
  border-radius: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  text-indent: 10px;
  padding: 15px;
  margin: 6px 0;

  &::placeholder {
    font-size: 12px; 
    color: #949393;
    transform: translateX(3px)
  }
  `;
  
  const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
  
  const Button = styled.button`
  background-color: ${(props) => (props.disabled ? "lightgray" : "#81BE97")};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  color: #ffffff;
  border: none;
  width: 250px; /* 입력란 너비 설정 */
  height: 40px; /* 입력란 높이 설정 */
  border-radius: 30px;
  font-family: GmarketSansMedium;
  `;
  
  const P = styled.p`
    font-size: 13px;
    color: #ecd3d3;
    margin-top: 3px;
  `;