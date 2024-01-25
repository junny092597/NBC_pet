import { useRecoilState } from 'recoil';
import { mypagemenu } from '../../atom';
import MyPagePost from '../mypage/MyPagePost';

import * as S from './style';

const MyPageTab = () => {
  const [menuIndex, setMenuIndex] = useRecoilState(mypagemenu);

  const myTab = {
    id: 0,
    tedTitle: '등록게시글',
    tedContent: <MyPagePost />,
  };

  const MyTadClick = (i: number) => {
    setMenuIndex(i);
  };

  return (
    <>
      <S.MyPageTabWrap>
        <S.MyPageTablist>
          <S.MyPageTebBtn
            key={myTab.id}
            className={menuIndex === myTab.id ? 'menu' : ''}
            onClick={() => MyTadClick(myTab.id)}>
            {myTab.tedTitle}
          </S.MyPageTebBtn>
        </S.MyPageTablist>
      </S.MyPageTabWrap>
    </>
  );
};

export default MyPageTab;
