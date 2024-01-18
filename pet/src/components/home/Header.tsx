/* eslint-disable jsx-a11y/anchor-has-content */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/modules/AuthSlice';
 
import logo from '../../assets/images/testlogo.png';
import styled from 'styled-components';
import { BsSearchHeart } from 'react-icons/bs';
import Swal from 'sweetalert2';
import Shopping from '../../pages/Shopping';
import { RootState } from '../../redux/Store';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.auth.isLogin )
  const displayName = useSelector((state: RootState) => state.auth?.displayName);

  const navigateLogin = () => {
    navigate("/Signin");
  };

  const navigateregister = () => {
    navigate("/Signup");
  };

  return (
    <HeaderContainer>
      <Logo>
        <Image src={logo} alt={'logo image'} />
        '금쪽이'를 부탁해
      </Logo>
      <Navigation>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/Shopping">쇼핑</a>
          </li>
        </ul>
      </Navigation>
      <Headerbtn>
      {isLogin ? (
              <>
                <Nickname>{displayName} 님 안녕하세요 !</Nickname>
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "로그아웃",
                      text: "로그아웃 되셨습니다.",
                      confirmButtonColor: "#20b2aa",
                      confirmButtonText: "확인",
                      // imageUrl: logo1,
                      // imageWidth: 130,
                      // imageHeight: 130,
                      // imageAlt: "Custom image",
                    });
                    dispatch(logout())
                    navigate("/");
                  }}
                >
                  로그아웃
                </button>
                <button>마이페이지</button>
              </>
            ) : (
              <>
                <button 
                 onClick={navigateregister}>
                  회원가입
                </button>
                <button
                 onClick={navigateLogin}>
                  로그인
                </button>
              </>
            )}
            </Headerbtn>
      <BsSearchHeart />
    </HeaderContainer>
  );
};

const Nickname = styled.div`
  color: white;
  font-size: 16px;
`
const Headerbtn = styled.button`
    display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background: transparent;
  border: none;
  cursor: pointer;

  button {
    cursor: pointer;
    width: 120px;
    height: 40px;
    font-size: 18px;
    background-color: #DD74EC;
    color: white;
    border: none;
    border-radius: 10px;

    &:hover {
      transform: scale(1.05);
    }
  }
`

const HeaderContainer = styled.header`
  background-color: #333;
  color: white;
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 15px;
  margin: 0;
  align-items: center;
  display: flex;
`;

const Image = styled.img`
  width: 5%;
  height: 5%;
  margin-right: 10px;
`;

const Navigation = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    margin: 0;
  }

  li {
    margin-right: 1em;
  }

  a {
    text-decoration: none;
    color: white;

    &:hover {
      text-decoration: underline;
    }
  }
`;
export default Header;
