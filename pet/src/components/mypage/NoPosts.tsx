import * as S from './MyPagePoststyle';
import { useNavigate } from 'react-router-dom';

const NoPosts = () => {
  const navigate = useNavigate();

  const navcommunity = () => {
    navigate('/community');
  };

  return (
    <S.NoPostsContainer>
        <h2>등록된 게시글이 없습니다</h2>
        <S.NoPostsBtn onClick={navcommunity}>게시글 등록하기</S.NoPostsBtn>
    </S.NoPostsContainer>
  );
};

export default NoPosts;
