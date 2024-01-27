import * as S from './style';
import test1 from '../../assets/images/logo.png';

const NoPosts = () => {
  return (
    <S.NoPostsWarp>
      <S.NoPostsContainer>
        <S.NoPostsImg src={test1} />
        <S.NoPostsText>게시글을 등록해주세요</S.NoPostsText>
      </S.NoPostsContainer>
    </S.NoPostsWarp>
  );
};

export default NoPosts