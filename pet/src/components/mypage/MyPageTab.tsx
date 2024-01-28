import { useRecoilState } from 'recoil';
import { mypagemenu } from '../../atom';
// component
import MyPagePost from './MyPagePost';
// style
import * as S from './style';

const MyPageTab = () => {
  const [activeIndex, setActiveIndex] = useRecoilState(mypagemenu);

  const myTabArr = [

    {
      id: 0,
      tabTitle: '등록게시글',
      tabContent: <MyPagePost />,
    },
  ];

  const MyTabClick = (i: number) => {
    setActiveIndex(i);
  };
  return (
    <>
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
    </>
  );
};

export default MyPageTab;