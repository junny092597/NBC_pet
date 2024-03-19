import React, { useState } from 'react';
import { auth } from '../../../Firebase';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import * as S from './passwordstyle';

const Password = ({ handleClose }: { handleClose: () => void }): JSX.Element | null => {
  const [passwordInput, setPasswordInput] = useState({
    password: '',
    updatePassword: '',
    updatePasswordCheck: '',
  });
  const [helperPasswordInput, setHelperPasswordInput] = useState({
    updatePassword: '',
    updatePasswordCheck: '',
  });
  const [check, setCheck] = useState<boolean>(false);

  const user = auth?.currentUser;
  const email = auth?.currentUser?.email;

  const firstPasswordCheck = async () => {
    const credential = EmailAuthProvider.credential(
      email!,
      passwordInput.password,
    );
    try {
      await reauthenticateWithCredential(
        user!,
        credential
      );
      setCheck(true);
      alert('인증이 완료되었습니다.');
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        alert('비밀번호가 틀립니다. 확인 후 다시 입력해 주세요.');
      } else {
        alert('현재 비밀번호를 입력해 주세요.');
      }
    }
  };

  const checkHelperText = () => {
    return (
      helperPasswordInput.updatePassword !== '' ||
      helperPasswordInput.updatePasswordCheck !== ''
    );
  };

  const passwordCheckHandler = () => {
    if (checkHelperText()) {
      alert('입력 정보를 확인해 주세요.');
    } else if (
      check &&
      passwordInput.updatePassword === passwordInput.updatePasswordCheck &&
      passwordInput.updatePassword !== '' &&
      passwordInput.updatePasswordCheck !== ''
    ) {
      updatePassword(user!, passwordInput.updatePassword)
        .then(() => {
          alert('변경완료');
          setCheck(false);
          handleClose();
        })
        .catch((error) => console.error(error));
    } else if (!check) {
      alert('현재 비밀번호 인증을 해주시길 바랍니다.');
    } else {
      alert('입력한 비밀번호가 다릅니다. 다시 확인 후 입력해 주세요.');
    }
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordInput({
      ...passwordInput,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <S.UpdatePasswordWrapper>
      <div>
        <S.EnterInputPasswordText>현재 비밀번호</S.EnterInputPasswordText>
        <S.EnterInputPasswordWrapper>
          <S.EnterInputPassword
            value={passwordInput.password}
            type="password"
            name="password"
            minLength={6}
            maxLength={10}
            onChange={passwordChangeHandler}
            placeholder={'현재 비밀번호를 입력하세요'}
          />
          <S.OkayBtn onClick={firstPasswordCheck}>확인</S.OkayBtn>
        </S.EnterInputPasswordWrapper>
      </div>
      <S.EnterInputChangePasswordWrapper>
        <S.EnterInputChangePasswordText>
          비밀번호 <span style={{ fontSize: '13px' }}>(6~10글자)</span>
        </S.EnterInputChangePasswordText>
        <S.EnterInputChangePasswordInput
          value={passwordInput.updatePassword}
          type="password"
          name="updatePassword"
          minLength={6}
          maxLength={10}
          onChange={passwordChangeHandler}
          placeholder={'새 비밀번호를 입력하세요'}
        />
        <S.EnterHelperText>{helperPasswordInput.updatePassword}</S.EnterHelperText>
      </S.EnterInputChangePasswordWrapper>

      <S.EnterInputCheckPasswordWrapper>
        <S.EnterInputCheckPasswordText>비밀번호 확인</S.EnterInputCheckPasswordText>
        <S.EnterInputChangePasswordInput
          value={passwordInput.updatePasswordCheck}
          type="password"
          name="updatePasswordCheck"
          onChange={passwordChangeHandler}
          placeholder={'새 비밀번호를 한번 더 확인하세요'}
        />
        <S.EnterHelperText>{helperPasswordInput.updatePasswordCheck}</S.EnterHelperText>
      </S.EnterInputCheckPasswordWrapper>
      <S.EditModalBtnWrapper>
        <S.EditModalCanceleButton onClick={handleClose}>취소</S.EditModalCanceleButton>
        <S.EditModalCompleteButton onClick={passwordCheckHandler} type="submit">
          수정
        </S.EditModalCompleteButton>
      </S.EditModalBtnWrapper>
    </S.UpdatePasswordWrapper>
  );
};

export default Password;