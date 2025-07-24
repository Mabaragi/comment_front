import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';

// 1. Apollo Client 인스턴스 생성
// YOUR_GRAPHQL_ENDPOINT_URL을 실제 GraphQL 서버 URL로 변경해야 합니다.
const client = new ApolloClient({
  uri: '/graphql',
  headers: {
    accept: '*/*',
    'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    'content-type': 'application/json',
    priority: 'u=1, i',
    'sec-ch-ua':
      '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    Referer: 'https://page.kakao.com/',
  },
  cache: new InMemoryCache(),
});

// 2. 실행할 GraphQL 쿼리 정의
// gql 템플릿 리터럴을 사용하여 쿼리를 정의합니다.
const GET_SERIES_INFO = gql`
  query simpleSeriesSingleInfo($seriesId: Long!, $productId: Long) {
    simpleSeriesSingleInfo(productId: $productId, seriesId: $seriesId) {
      seriesAgeGrade
      singleAgeGrade
      singleSlideType
      singleIsFree
      singleIsTextViewer
      seriesSaleState
      singleSaleState
    }
  }
`;

// 3. useQuery 훅을 사용하여 쿼리를 실행하는 컴포넌트
function SeriesInfo() {
  const { loading, error, data } = useQuery(GET_SERIES_INFO, {
    variables: {
      seriesId: 56611441, // 테스트할 seriesId 값을 입력하세요.
      productId: null, // productId가 필요 없으면 null로 설정합니다.
    },
  });

  if (loading) return <p>데이터 로딩 중...</p>;
  if (error) {
    console.error('Error fetching series info:', error);
    return <p>에러 발생: {error.message}</p>;
  }

  // 데이터가 성공적으로 로드되면 결과 값을 출력합니다.
  const seriesInfo = data.simpleSeriesSingleInfo;

  return (
    <div>
      <h2>시리즈 정보</h2>
      <ul>
        <li>시리즈 연령 등급: {seriesInfo.seriesAgeGrade}</li>
        <li>단일 콘텐츠 연령 등급: {seriesInfo.singleAgeGrade}</li>
        <li>단일 콘텐츠 판매 상태: {seriesInfo.singleSaleState}</li>
        <li>시리즈 판매 상태: {seriesInfo.seriesSaleState}</li>
        {/* 필요한 다른 데이터도 이어서 출력할 수 있습니다. */}
      </ul>
    </div>
  );
}

// 4. ApolloProvider로 애플리케이션 감싸기
// 이 컴포넌트 내부의 모든 자식 컴포넌트에서 useQuery 훅을 사용할 수 있게 됩니다.
function App() {
  return (
    <ApolloProvider client={client}>
      <SeriesInfo />
    </ApolloProvider>
  );
}

export default App;
// fetch("https://bff-page.kakao.com/graphql", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
//     "content-type": "application/json",
//     "priority": "u=1, i",
//     "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"Windows\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-site",
//     "Referer": "https://page.kakao.com/"
//   },
//   "body": "{\"query\":\"\\n    query commentList($commentListInput: CommentListInput!) {\\n  commentList(commentListInput: $commentListInput) {\\n    ...CommentList\\n  }\\n}\\n    \\n    fragment CommentList on CommentList {\\n  isEnd\\n  totalCount\\n  bestTotalCount\\n  selectedSortOpt {\\n    id\\n    name\\n    param\\n  }\\n  sortOptList {\\n    id\\n    name\\n    param\\n  }\\n  commentList {\\n    ...CommentItem\\n  }\\n}\\n    \\n\\n    fragment CommentItem on CommentItem {\\n  parentUid\\n  userUid\\n  productId\\n  seriesId\\n  comment\\n  likeCount\\n  replyCount\\n  createDt\\n  commentType\\n  commentUid\\n  title\\n  hidden\\n  isBest\\n  blocked\\n  commentStatus\\n  deleted\\n  expose\\n  myReplyCount\\n  userThumbnailUrl\\n  userName\\n  liked\\n  emoticon {\\n    itemSubType\\n    resourceId\\n    itemId\\n    itemVer\\n  }\\n  isSpoiler\\n}\\n    \",\"variables\":{\"commentListInput\":{\"page\":0,\"seriesId\":56611441,\"sortType\":\"like\"}}}",
//   "method": "POST"
// });
