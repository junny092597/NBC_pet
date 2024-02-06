import styled from 'styled-components';

export const UpdatePasswordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

export const EnterInputPasswordWrapper = styled.div`
  display: flex;
`;

export const EnterInputPassword = styled.input`
  width: 300px;
  border: 1px solid gray;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;
  margin-right: 10px;
`;

export const CheckButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  width: 42px;
  height: 30px;
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 15px;
  background-color: gray;
  cursor: pointer;
  color: white;
`



export const EnterInputPasswordText = styled.p`
  font-family: GmarketSansMedium;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 0.2rem;
  color: black;
`;

export const WarningText = styled.div`
  font-size: 11px;
  color: red;
  max-width: 280px;
  margin-top: 5px;
`;

export const EnterInputChangePasswordWrapper = styled.div`
  margin-top: 30px;
`;
export const EnterInputChangePasswordText = styled.p`
  font-family: GmarketSansMedium;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 0.2rem;
  color: black;
`;

export const EnterInputChangePasswordInput = styled.input`
  width: 380px;
  height: 45px;
  border: 1px solid gray;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  outline: none;
`;

export const EnterInputCheckPasswordWrapper = styled.div`
  margin-top: 30px;
`;

export const EnterInputCheckPasswordInput = styled.input`
  width: 380px;
  height: 45px;
  border: 1px solid gray;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;
`;

export const EnterInputCheckPasswordText = styled.p`
  font-family: GmarketSansMedium;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 0.2rem;
  color: black;
`;

export const OkayBtn = styled.button`
  cursor: pointer;
  font-family: GmarketSansMedium;
  color: white;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  width: 72px;
  height: 50px;
  background-color: #B8B8AA;
  border: 1px solid #B8B8AA;
  border-radius: 8px;

  &:hover{
    background: #81BE97;
    border: 1px solid #81BE97;

  }
`;

export const EditModalBtnWrapper = styled.div`
  /* padding-top: 70px; */
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  margin-top: 4rem;
`;

export const EditModalCanceleButton = styled.button`
  cursor: pointer;
  padding: 8px;
  gap: 8px;
  width: 170px;
  height: 60px;
  background: #81BE97;
  border: 1px solid;
  border-radius: 8px;
  font-family: GmarketSansMedium;
  font-size: 16px;
  text-align: center;
  color: white;
`;

export const EditModalCompleteButton = styled.button`
  cursor: pointer;
  padding: 8px;
  gap: 8px;
  width: 170px;
  height: 60px;
  background: #81BE97;
  border: 1px solid;
  border-radius: 8px;
  font-family: GmarketSansMedium;
  font-size: 16px;
  text-align: center;
  color: white;
`;

export const EnterHelperText = styled.div`
  color: red;
  padding-top: 10px;
`;



