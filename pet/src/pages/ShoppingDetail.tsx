import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Review from '../components/shoppingDetail/Review';
import QuantityInput from '../components/shoppingDetail/QuantityInput';
import styled from 'styled-components';
import { auth } from '../Firebase';
import QuestionAndAnswer from '../components/shoppingDetail/QuestionAndAnswer';
import { addDoc, collection, setDoc, getDocs, query, where, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import { FaHeart } from 'react-icons/fa';

interface Item {
  id: number;
  price: number;
  name: string;
  img: string;
  category: string;
  type: string;
}

interface user {
  email: string;
}
function ShoppingDetail() {
  //받아온 renderData
  const location = useLocation();
  const { item } = location.state || {};
  //수량체크
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<any>(item.price);

  //수량 +,-기능
  const onclickQuantityHandler = (num: number) => {
    if (quantity + num >= 1) {
      setQuantity((prev: number) => prev + num);
      setTotalPrice((prev: number) => prev + item.price * num);
    }
  };

  //유저이메일 담기
  const [data, setData] = useState<{ userEmail: string; itemName?: string }>({
    userEmail: '',
    itemName: item?.name || undefined,
  });

  //리뷰 & QnA tab기능
  const [tab, setTab] = useState<string | null>(null);

  const swithTab = (tab: string | null) => {
    setTab(tab);
  };

  useEffect(() => {
    const userData = auth.onAuthStateChanged((currentUser: any) => {
      if (currentUser) {
        const userEmail = currentUser.email;
        setData(prev => ({ ...prev, userEmail }));
      } else {
        setData({ userEmail: '' });
      }
    });
    return () => userData();
  }, []);

  //게시글 데이터베이스에 추가기능
  const [like, setLike] = useState<boolean>(false);
  const fetchHeart = async () => {
    const userEmail = data.userEmail;
    if (!userEmail) return; // userEmail이 없다면 종료

    const likeQuery = query(collection(db, 'like'), where('email', '==', userEmail));
    const querySnapshot = await getDocs(likeQuery);

    if (querySnapshot.empty) {
      setLike(false); // 처음에는 문서가 없으므로 기본값으로 false 설정
    } else {
      const firstDoc = querySnapshot.docs[0];
      const likedValue = firstDoc.data().liked;
      setLike(likedValue);
      setHeartColor(likedValue ? 'black' : 'red');
    }
  };

  //좋아요기능
  const [heartColor, setHeartColor] = useState<string>('black');
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    fetchHeart();
  }, [data]); // data가 변경될 때마다 fetchHeart를 호출

  //좋아요 기능(수정해야합니다)
  const handleButtonClick = async () => {
    if (data.userEmail === '') {
      alert('로그인을 해야 사용가능한 기능입니다');
      navigate('/signin');
    } else {
      const likeCollectionRef = collection(db, 'like');
      const randomDocId = generateRandomDocId();

      const docRef = doc(likeCollectionRef, randomDocId);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // 문서가 존재하면 업데이트
        await updateDoc(docRef, { userEmail: data.userEmail, itemName: data.itemName, liked: !like });
        setLike(!like);
        setHeartColor(like ? 'black' : 'red');
      } else {
        // 문서가 존재하지 않으면 새로 생성
        await setDoc(docRef, { userEmail: data.userEmail, itemName: data.itemName, liked: true });
        setLike(true);
        setHeartColor('red');
      }
    }
  };

  // 예시로 사용할 랜덤 ID 생성 함수
  function generateRandomDocId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 20;
    let randomId = '';
    for (let i = 0; i < length; i++) {
      randomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomId;
  }

  const handleHeartIconClick = () => {
    handleButtonClick();
  };

  //데이터가 안받아와졌을경우 다시 돌아가기위한 navigate
  const navigate = useNavigate();
  const backToPageHandler = () => {
    navigate('/shopping');
  };
  if (!location) {
    return (
      <>
        <div>오류가발생했습니다</div>
        <button onClick={backToPageHandler}>뒤로가기</button>
      </>
    );
  }

  return (
    <>
      <SProductContainer>
        <SImgBox>
          <img src={item.img} />
        </SImgBox>
        <STextContainer>
          <SCategoryName>
            {item.category}-{item.type}
            <FaHeart size={25} onClick={handleHeartIconClick} style={{ color: heartColor, cursor: 'pointer' }} />
          </SCategoryName>
          <SItemNameBox>
            <SItemName>{item.name}</SItemName>
          </SItemNameBox>
          <SItemPriceBox>
            <span>가격 : {item.price}원 </span>
          </SItemPriceBox>
          <SItemTotalPriceBox>
            <QuantityInput quantity={quantity} onclickQuantityHandler={onclickQuantityHandler} />
            <SItemTotalPrice>총 금액 : {totalPrice}원</SItemTotalPrice>
          </SItemTotalPriceBox>
          <SOrderButtonBox>
            <SOrderButton>ADD Tod Cart</SOrderButton>
            <SOrderButton
              onClick={() => {
                if (data.userEmail !== '') {
                  navigate('/CheckoutPage');
                } else {
                  alert('로그인을 해야 사용가능한 페이지입니다');
                  navigate('/signin');
                }
              }}>
              Buy Now
            </SOrderButton>
          </SOrderButtonBox>
          <div>
            <CummunityButton
              onClick={() => {
                swithTab('REVIEW');
              }}>
              REVIEW
            </CummunityButton>
            <CummunityButton
              onClick={() => {
                swithTab('Q&A');
              }}>
              Q&A
            </CummunityButton>
            {tab === 'REVIEW' && <Review data={data} />}
            {tab === 'Q&A' && <QuestionAndAnswer data={data} />}
            {tab === null && (
              <div>
                <img src="src/assets/images/logo.png" alt="강아지 사진" />
              </div>
            )}
          </div>
        </STextContainer>
      </SProductContainer>
    </>
  );
}
export default ShoppingDetail;

const SProductContainer = styled.div`
  display: flex;
  width: 100vw;
  min-height: 80vh;
  max-height: auto;
`;

const SImgBox = styled.div`
  width: 50%; /* 반의 너비를 차지하도록 50%로 설정 */
  margin-top: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  img {
    display: block;
    width: 70vh;
    height: 70vw;
    object-fit: contain;
    position: absolute;
    margin: 0;
  }
`;

const STextContainer = styled.div`
  margin-top: 5vh;
  width: 35%; /* 반의 너비를 차지하도록 50%로 설정 */
  height: 70%;
  padding: 20px;
  border: 1px solid black;
  border-radius: 50px;
`;

const SCategoryName = styled.div`
  font-size: 30px;
`;

const SItemName = styled.span`
  margin-right: 1vw;
  white-space: normal;
  flex-wrap: wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const SItemNameBox = styled.div`
  margin-bottom: 1.5vh;
  font-size: 20px;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const SItemPriceBox = styled.div`
  margin-bottom: 1.5vh;
  font-size: 20px;
`;

const SItemTotalPriceBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 두 요소를 좌우로 정렬하도록 추가된 부분 */
  margin-bottom: 3vh; /* QuantityInput과의 간격을 주기 위해 추가된 부분 */
`;

const SItemTotalPrice = styled.span`
  font-size: 25px;
`;

const SOrderButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5vh;
`;

const SOrderButton = styled.button`
  width: 10vw;
  height: 5vh;
  border: 1px solid black;
  border-radius: 40px;
  background: none; /* 배경을 없애는 속성 추가 */
  padding: 0; /* 내부 여백을 없애는 속성 추가 */
  cursor: pointer;
  margin: 0 1vw;
`;

const CummunityButton = styled.button`
  width: 50%;
  height: 5vh;
  border: 1px solid black;
  border-radius: 40px;
  background: none; /* 배경을 없애는 속성 추가 */
  padding: 0; /* 내부 여백을 없애는 속성 추가 */
  cursor: pointer;
`;
