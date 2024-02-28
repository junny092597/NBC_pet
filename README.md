# 퍼펙트(For pets)
##### 이 프로젝트는 스파르타 내일배움 캠프의 React 최종프로젝트입니다.


## 프로젝트 소개
  
![image](https://github.com/junny092597/NBC_pet/assets/143682700/a42d6eb1-dc0d-4ef5-acc8-ae6f778f38c4)


## page별 설명
  
##### SignUp
![image](https://github.com/junny092597/NBC_pet/assets/143682700/add3c533-f0d9-49d3-956b-25c74df30d3f)

##### LogIn
![image](https://github.com/junny092597/NBC_pet/assets/143682700/46eaf272-6038-44cc-a914-eb8c07d1e415)

##### Profile
![image](https://github.com/junny092597/NBC_pet/assets/143682700/596dc7bb-3277-40c6-89c2-2ac3b1bf187b)

##### Community
### - 유튜브 API를 통한 쇼츠기능 구현을 했고, 게시글 작성 및 댓글기능을 구현했습니다.
###   데이터베이스 관리를 위해 Firebase의 실시간 데이터베이스를 활용하였습니다.
![image](https://github.com/junny092597/NBC_pet/assets/143682700/801c73d0-0a39-4d4a-bf08-1d8d30b5c54e)

##### Shopping 
### - React와 Firebase를  활용하여 쇼핑기능을 개발했습니다. 
###   주요 기능으로는 카테고리 및 타입 선택을 통한 상품 필터링, 가격 및 최신순 정렬, 검색기능을 구현했습니다.
###   위의 기능은 모두 제품을 원하는 조건에 맞게 UI에 표현하는 기능으로서, 페이지가 mount될 때마다 데이터를 불러오면 불필요하게 데이터를 매번 불러와야하기 때문에, 쇼핑페이지가 처음으로 mount될 때, 제품에 대한 모든 정보를 state에 저장하고 원하는 조건에 따라 필터링된 데이터 
###   를 새로운 state에 저장하도록 개발했습니다.
###   또한, 컴포넌트 간의 상호작용과 사용자 친화적인 UI/UX를 고려하여 디자인했습니다. 상품 상세 페이지로의 신속한 이동 및 관련 상품 추천 등 다양한 기능을 추가하였습니다.
###   코드의 가독성과 재사용성을 고려하여 각 컴포넌트를 모듈화하고, 일관된 디자인을 유지하기 위해 styled-components를 활용했습니다. 또한, TypeScript를 도입하여 코드의 안정성을 확보했습니다.
###   데이터베이스 관리를 위해 Firebase의 실시간 데이터베이스를 활용하였습니다.
![image](https://github.com/junny092597/NBC_pet/assets/143682700/74c9cad8-2b64-4ecf-8d0a-fde1dc21c04c)

##### ShoppingDetail 
### - 원하는 제품의 상세페이지로서 React와 Firebase를 기반으로 개발했습니다.
###   주요 기능으로는 수량체크, 좋아요기능, 장바구니, Review와 Q&A 그리고 결제기능이 있습니다.
###   React의 동적 상태 관리를 활용하여 사용자가 화면에서 직접 수량을 조절할 수 있도록 구현했습니다. 
###   Firebase의 실시간 데이터베이스를 활용하여 사용자가 제품에 좋아요를 누르면 이 정보가 실시간으로 반영되는 좋아요 기능도 구현했습니다.
###   장바구니버튼을 클릭하면 원하는 제품의 정보와 유저의 정보가 Firebase에 저장이 되도록 구현했습니다.
###   Review와 Q&A는 로그인한 유저의 이메일을 토대로 작성한 내용과 함께 Firebase에 저장이 되고,  해당 제품에 관련된 게시글만을 보여줄 수 있도록 Firebase에 저장된 데이터중에 해당 제품에 맞는 게시글만을 갖고 오도록 개발했습니다.
###   결제 기능은 Toss에서 제공하는 open API를 사용했습니다.
###   쇼핑기능과 동일하게 TypeScript를 도입하여 코드의 안정성을 확보했습니다.
![image](https://github.com/HONGSANGYOON/NBC_pet/assets/143682700/2c45f435-8862-4c45-af55-7b689b54def1)

   
##### Map
### - React와 Kakao Maps API를 통합하여 맵기능을 개발했습니다.
###   웹 페이지 로딩 시 브라우저의 geolocation을 활용하여 사용자의 현재 위치를 가져와 지도를 초기화합니다. 이를 통해 사용자는 주변의 반려동물 관련 시설을 빠르게 확인할 수 있습니다.
###   카테고리 버튼을 통해 사용자는 반려동물 병원, 샵, 산책로 등 다양한 카테고리를 선택할 수 있습니다. 선택한 카테고리에 따라 지도에 해당하는 장소들이 마커로 표시되어 시각적으로 확인할 수 있습니다.
###   다양한 카테고리에 맞게 디자인된 마커를 사용했고, 사용자는 시설들을 시각적으로 구분할 수 있습니다. 마커를 클릭하면 해당 장소의 상세 정보가 표시되어, 사용자는 필요한 정보를 손쉽게 확인할 수 있습니다. 그리고 TypeScript를 도입하여 코드의 안정성을 확보했습니다.
![image](https://github.com/junny092597/NBC_pet/assets/143682700/c61cf146-b8a2-441e-b61b-5a6763a1ada9)


##### Chat
### - 웹소켓 API를 활용하여 접속중인 사용자들끼리 실시간 채팅이 가능하도록 개발하였습니다.
![image](https://github.com/junny092597/NBC_pet/assets/143682700/11efc0bd-e11d-4ff8-bbe4-36f406f9a482)


## Development Environment
  
##### React

##### Typescript

##### Redux

##### styled-Component

##### firebase


## 담당자
코드 문의와 유지보수 문의는 아래 각 파트 담당자에게 부탁드립니다.

##### 안은지 - Login, css 

[Git] (https://github.com/ahneun)

##### 김세관 - community, css

[Git] (https://github.com/sekwan94)

##### 윤홍상 - shopping, shoppingDetail, tosspay, home

[Git] (https://github.com/HONGSANGYOON)

##### 주형준 - map, Chat, home

[Git] (https://github.com/junny092597)
