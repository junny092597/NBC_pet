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

  const handleButtonClick = async () => {
    if (data.userEmail === '') {
      alert('로그인을 해야 사용가능한 기능입니다');
      navigate('/signin');
    } else {
      const likeCollectionRef = collection(db, 'like');
      const randomDocId = generateRandomDocId(); // Assuming you have a function to generate a random ID

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
          <div>
            {item.category}-{item.type}
          </div>
          <div>{item.name}</div>
          <div>
            <span>가격 : {item.price}원 </span>
            <FaHeart size={20} onClick={handleHeartIconClick} style={{ color: heartColor, cursor: 'pointer' }} />
          </div>

          <QuantityInput quantity={quantity} onclickQuantityHandler={onclickQuantityHandler} />
          <div>총 금액 : {totalPrice}원</div>
          <div>
            <button>ADD Tod Cart</button>
            <button
              onClick={() => {
                if (data.userEmail !== '') {
                  navigate('/CheckoutPage');
                } else {
                  alert('로그인을 해야 사용가능한 페이지입니다');
                  navigate('/signin');
                }
              }}>
              Buy Now
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                swithTab('REVIEW');
              }}>
              REVIEW
            </button>
            <button
              onClick={() => {
                swithTab('Q&A');
              }}>
              Q&A
            </button>
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
  flex-direction: row;
`;

const SImgBox = styled.div``;

const STextContainer = styled.div``;
