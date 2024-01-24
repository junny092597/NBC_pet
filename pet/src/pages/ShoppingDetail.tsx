import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Review from '../components/shoppingDetail/Review';
import QuantityInput from '../components/shoppingDetail/QuantityInput';
import styled from 'styled-components';
import { auth } from '../Firebase';
import QuestionAndAnswer from '../components/shoppingDetail/QuestionAndAnswer';

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

  //좋아요기능
  const [liked, setLiked] = useState(false);
  const toggleLike = () => {
    setLiked(prevLiked => !prevLiked);
  };
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
  console.log('data');
  console.log(data);

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
            <button
              onClick={toggleLike}
              style={{
                color: liked ? 'red' : 'black',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '40px',
              }}>
              {'\u2665'}
            </button>
          </div>
          <QuantityInput quantity={quantity} onclickQuantityHandler={onclickQuantityHandler} />
          <div>총 금액 : {totalPrice}원</div>
          <div>
            <button>ADD Tod Cart</button>
            <button>Buy Now</button>
          </div>
          <div>
            <Review data={data} />
            <QuestionAndAnswer data={data} />
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
