/*
[테스트용 버킷리스트 임시 데이터]
- 백 연결 시 삭제
- 구성: 달성 예정 버킷 리스트, 달성한 버킷 리스트
- 파라미터 값
  1) bucketID : 버킷리스트 고유 값
  2) bucketName: 버킷리스트 제목
  3) bucketConeten: 버킷리스트 세부 내용
  4) goalDate: 버킷리스트 목표 날짜 - 월 표기 시 0~11 범위 내로 작성 필요
  5) category: 카테고리 0~5
- 사용 화면: MyBucketScreen.tsx
*/
export const unachievedData = [
  {
    bucketId: 1,
    bucketName: '제주도 일 년 살이',
    bucketContent: '제주도에서 일 년 동안 살며 힐링하기',
    goalDate: '2024-12-31',
    category: 2,
  },
  {
    bucketId: 2,
    bucketName: '베이킹 배우기',
    bucketContent: '롤케이크 직접 만들어보기',
    goalDate: '2025-01-31',
    category: 5,
  },
  {
    bucketId: 3,
    bucketName: '루브르 박물관 방문하기',
    bucketContent: '내가 작품에 대해서 아는 게 없지만 그럼에도 불구하고 가보고 싶습니다',
    goalDate: '2024-11-31',
    category: 3,
  },
  {
    bucketId: 4,
    bucketName: '겨울 옷 사기',
    bucketContent: '아이 추워',
    goalDate: '2024-11-31',
    category: 4,
  },
  {
    bucketId: 5,
    bucketName: '베이글 먹기',
    bucketContent: '유명한데 나만 못먹어봤어',
    goalDate: '2024-11-31',
    category: 1,
  },
  {
    bucketId: 6,
    bucketName: '개발 공부하기',
    bucketContent: '내 영원한 앙숙',
    goalDate: '2024-11-31',
    category: 0,
  },
];

export const achievedData = [
  {
    bucketId: 1,
    bucketName: '삼쏘먹기',
    achieveDate: '2022.08.03',
    category: 1,
    achievementMedia: 'https://img.daily.co.kr/@files/www.daily.co.kr/content/food/2017/20170411/7b532799ae9d210415512b2d22457a4e.jpg',
    goalReview: '진짜 맛있었다',
  },
  {
    bucketId: 2,
    bucketName: '제주도 한 달 살이',
    achieveDate: '2024.11.31',
    category: 2,
    achievementMedia: '',
    goalReview: '제주도에서 한달 동안 힐링하기 성공했다. 긴 내용이 있다면 얘가 어떻게 될 지 파악해야 하기 때문에 일부러 길게 적어보고 있다. 사실 저는 제주도를 한 번도 가보지 못했어요. 제주도보다 일본이 더 값싼 시절에 가서 제주도를 한 번도 못가봤어요 하지만 가보고 싶다는 로망도? 있기는 합니다 제주도 바다 제주도 귤 귤이 요즘 제철이더라고요 귤 맛있어요',
  },
  {
    bucketId: 3,
    bucketName: '칼질 성공하기',
    achieveDate: '2024.10.31',
    category: 5,
    achievementMedia: '',
    goalReview: '',
  },
];
