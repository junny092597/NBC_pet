import styled from 'styled-components';


export const AllPostContainer = styled.div`
  padding-left: 300px;
  padding-right: 300px;
`;

export const TitleContainer = styled.div`
  margin-left: 0px;
  padding: 25px;
  text-decoration: underline;
  font-weight: bold;
  margin-top: 15px;
  font-family: GmarketSansMedium;
  font-size: 25px;
  color: #2e2e2b;
`;

export const ReviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  place-items: center;
`;

export const PostContainer = styled.div`
  cursor: pointer;
  height: 360px;
  width: 300px;
  padding: 0px;
  margin: 10px;
  margin-bottom: 50px;
  border: solid;
  border: none;
  box-shadow: 0.5px 2px 2px 0px gray;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const PostImgContainer = styled.img`
  display: block;
  width: auto;
  height: 100%;
  object-fit: cover;
  z-index: -2;
  border: none;
  border-radius: 9px;
`;

export const TextContainer = styled.div`
  width: 300px;
  display: grid;
  grid-template-rows: minmax(30px, auto);
  border-radius: 7px;
  position: absolute;
  bottom: 0px;
  color: #2e2e2b;
  background-color: rgba(255, 255, 255, 0.5);
  /* text-overflow: clip; */
  object-fit: cover;
  /* vertical-align: initial; */
  /* background-color: #5C5C55; */
`;

export const TextTitle = styled.div`
  margin: 10px;
  color: black;
  font-size: 20px;
  font-weight: bold;
  color: #5c5c55;
`;

export const TextIndex = styled.div`
  margin: 10px;
  font-size: 14px;
  color: #5c5c55;
`;

export const PostContainerBtn = styled.button`
  padding: 10px;
  margin: 10px auto;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-decoration: underline;
  font-family: GmarketSansMedium;
  font-size: 20px;
  border: 0;
  background-color: transparent;

  &:hover {
    transform: scale(1.05);
  }
`;

export const NoPostsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 38px;
  flex-direction: column;
  font-size: 20px;
  font-weight: bold;
  font-family: GmarketSansMedium;
  color: #2e2e2b;
`;

export const NoPostsBtn = styled.button`
  margin-top: 30px;
  margin-bottom: 50px;
  font-family: GmarketSansMedium;
  font-size: 15px;
  color: #2e2e2b;
  cursor: pointer;
  background-color: #a1eebd;
  border-radius: 7px;
  border: none;
  width: 135px;
  height: 45px;
`;

