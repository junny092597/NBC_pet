/* eslint-disable jsx-a11y/anchor-has-content */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/modules/AuthSlice';
 
import logo from '../../assets/images/logo.png';
import styled from 'styled-components';
import { BsSearchHeart } from 'react-icons/bs';
import Swal from 'sweetalert2';
import Shopping from '../../pages/Shopping';
import { RootState } from '../../redux/Store';
import { Link } from 'react-router-dom';

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
      <Link to={'/'}>
        <Image src={logo} alt={'logo image'} />
      </Link>
      <Navigation>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">커뮤니티</a>
          </li>
          <li>
            <a href="/Shopping">쇼핑</a>
          </li>
          <li>
            <a href="/map">맵</a>
          </li>
          <li>
            <a href="/">가족찾기</a>
          </li>
        </ul>
      </Navigation>
      <Headerbtn>
      {isLogin ? (
              <>
                <Nickname>{displayName}님 환영합니다😍</Nickname>
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
                {/* <button>마이페이지</button> */}
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
  color: #312B2B;
  font-size: 15px;
  font-family: npfont;
  `
const Headerbtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: transparent;
  border: none;
  cursor: pointer;

  button {
    cursor: pointer;
    width: 120px;
    height: 40px;
    font-family: GmarketSansMedium;
    font-size: 18px;
    background-color: #618F71;
    color: white;
    border: none;
    border-radius: 10px;

    &:hover {
      transform: scale(1.05);
    }
  }
`

const HeaderContainer = styled.header`
  background-color: #F6D6D6;
  color: #312B2B;
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Image = styled.img`
  width: 70%;
  height: 70%;
  margin-right: 0px;
`;

const Navigation = styled.nav`
  ul {
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    
  }

  li {
    margin-right: 60px;

    &:hover {
      transform: scale(1.05);
    }
  }

  a {
    text-decoration: none;
    font-size: 21px;
    font-family: GmarketSansMedium;
    gap: 20px;
    color: #312B2B;

    &:hover {
      transform: scale(1.05);
    }
  }
`;
export default Header;
