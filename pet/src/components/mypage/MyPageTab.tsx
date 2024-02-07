import { useRecoilState } from 'recoil';
import { isActiveMenu } from '../../atom';
// component
import MyPagePost from './postpage/MyPagePost';
import MyPageReview from './review/MyPageReview';

// style
import * as S from './style';

const MyPageTab = () => {
  const [activeIndex, setActiveIndex] = useRecoilState(isActiveMenu);

  const myTabArr = [
    {
      id: 0,
      tabTitle: '등록게시글',
      tabContent: <MyPagePost />,
    },
    {
      id: 1,
      tabTitle: '리뷰',
      tabContent: <MyPageReview/>,
    },
  ];

  const MyTabClick = (i: number) => {
    setActiveIndex(i);
  };
  return (
    <>
      <S.MyBookmarkReportWrap>
        <S.MyBookmarkReportBox>
          <S.MyBookmarkReportTabMenu>
            {myTabArr.map((t, i) => {
              return (
                <S.MyTitleTabBtn
                  key={t.id}
                  className={activeIndex === i ? 'active' : ''}
                  onClick={() => MyTabClick(i)}
                >
                  {t.tabTitle}
                </S.MyTitleTabBtn>
              );
            })}
          </S.MyBookmarkReportTabMenu>
          <S.MyContentBox>{myTabArr[activeIndex].tabContent}</S.MyContentBox>
        </S.MyBookmarkReportBox>
      </S.MyBookmarkReportWrap>
    </>
  );
};

export default MyPageTab;