import * as S from './style';
import test1 from '../../assets/images/logo.png';

const NoPosts = () => {
  return (
    <S.NoPostsWarp>
      <S.NoPostsContainer>
        <S.NoPostsImg src={test1} />
        <S.NoPostsText>제보할 내용이 있다면 제보해 주세요!</S.NoPostsText>
      </S.NoPostsContainer>
    </S.NoPostsWarp>
  );
};

export default NoPosts