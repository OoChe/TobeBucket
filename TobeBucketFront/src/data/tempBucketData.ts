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
    bucketName: '제주도 한 달 살이',
    achieveDate: '2024-11-31',
    category: 2,
    achievementMedia: '',
    recordContent: '제주도에서 한달 동안 힐링하기 성공했다',
  },
  {
    bucketId: 2,
    bucketName: '칼질 성공하기',
    achieveDate: '2024-11-31',
    category: 5,
    achievementMedia: '',
    recordContent: '드디어 칼질을 이쁘게 할 수 있다!',
  },
];
