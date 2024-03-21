/* eslint-disable jsx-a11y/anchor-has-content */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/modules/AuthSlice';
import logoutbtn from '../../assets/images/logo3.png';
import logo from '../../assets/images/logo.png';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { RootState } from '../../redux/Store';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  const navlogin = () => {
    navigate('/Signin');
  };

  const navregister = () => {
    navigate('/Signup');
  };

  const navprofile = () => {
    navigate('/Profile');
  };

  return (
    <Head>
      <HeaderContainer key={isLogin ? 'loggedIn' : 'loggedOut'}>
        <Link to={'/'}>
          <Image src={logo} alt={'logo image'} />
        </Link>
        <Navigation>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            |
            <li>
              <Link to="/Community">커뮤니티</Link>
            </li>
            |
            <li>
              <Link to="/Shopping">쇼핑</Link>
            </li>
            |
            <li>
              <Link to="/map">맵</Link>
            </li>
            |
            <li>
              <Link to="/chat">실시간 채팅</Link>
            </li>
          </ul>
        </Navigation>
        <Headerbtn>
          {isLogin ? (
            <>
              <button
                onClick={() => {
                  Swal.fire({
                    title: '로그아웃',
                    text: '로그아웃 되셨습니다.',
                    confirmButtonColor: '#20b2aa',
                    confirmButtonText: '확인',
                    imageUrl: logoutbtn,
                    imageWidth: 130,
                    imageHeight: 130,
                    imageAlt: 'Custom image',
                  });
                  dispatch(logout());
                  navigate('/');
                }}>
                로그아웃
              </button>
              <button onClick={navprofile}>마이페이지</button>
            </>
          ) : (
            <>
              <button onClick={navregister}>회원가입</button>
              <button onClick={navlogin}>로그인</button>
            </>
          )}
        </Headerbtn>
      </HeaderContainer>
    </Head>
  );
};
const Head = styled.div``;

const Headerbtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: transparent;
  border: none;
  cursor: pointer;

  button {
    cursor: pointer;
    width: 105px;
    height: 40px;
    font-family: GmarketSansMedium;
    font-size: 15px;
    background-color: #c5abab;
    color: white;
    border: none;
    border-radius: 10px;

    @media (max-width: 768px) {
      width: 100px;
      height: 35px;
      font-size: 16px;
    }

    &:hover {
      transform: scale(1.05);
    }
  }
`;

const HeaderContainer = styled.header`
  background-color: #f6f7c4;
  color: #312b2b;
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Image = styled.img`
  width: 17%;
  height: 10%;
  display: inline-flex;
`;

const Navigation = styled.nav`
  //헤더 네비게이션바 수정부분
  width: 100%;
  ul {
    padding: 0;
    display: flex;
    justify-content: flex-start;
    gap: 5%;
    flex-direction: row;
    align-items: center;
    margin: 0;
  }

  li {
    @media (max-width: 768px) {
      margin-right: 10px;
    }
  }

  a {
    text-decoration: none;
    font-size: 16px;
    font-family: GmarketSansMedium;
    gap: 20px;
    color: #312b2b;

    @media (max-width: 768px) {
      font-size: 18px;
    }

    &:hover {
      transform: scale(1.05);
    }
  }
`;
export default Header;
