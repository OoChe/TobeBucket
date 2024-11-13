/*
[테스트용 버킷리스트 임시 데이터]
- 구성: 달성 예정 버킷 리스트, 달성한 버킷 리스트
- 사용 화면: MyBucketScreen.tsx
*/
export const unachievedData = [
  {
    bucketId: 1,
    bucketName: '제주도 일 년 살이',
    bucketContent: '제주도에서 일 년 동안 살며 힐링하기',
    goalDate: new Date(2024, 12, 31),
    category: 2,
  },
  {
    bucketId: 2,
    bucketName: '베이킹 배우기',
    bucketContent: '롤케이크 직접 만들어보기',
    goalDate: new Date(2025, 5, 15),
    category: 5,
  },
  {
    bucketId: 3,
    bucketName: '베이킹 배우기',
    bucketContent: '롤케이크 직접 만들어보기',
    goalDate: new Date(2025, 5, 15),
    category: 5,
  },
  {
    bucketId: 4,
    bucketName: '베이킹 배우기',
    bucketContent: '롤케이크 직접 만들어보기',
    goalDate: new Date(2025, 5, 15),
    category: 5,
  },
  {
    bucketId: 5,
    bucketName: '베이킹 배우기',
    bucketContent: '롤케이크 직접 만들어보기',
    goalDate: new Date(2025, 5, 15),
    category: 5,
  },
  {
    bucketId: 6,
    bucketName: '베이킹 배우기',
    bucketContent: '롤케이크 직접 만들어보기',
    goalDate: new Date(2025, 5, 15),
    category: 5,
  },
];

export const achievedData = [
  {
    bucketId: 1,
    bucketName: '제주도 한 달 살이',
    achieveDate: new Date(2022, 5, 15),
    category: 2,
    achievementMedia: '',
    recordContent: '제주도에서 한달 동안 힐링하기 성공했다',
  },
  {
    bucketId: 2,
    bucketName: '칼질 성공하기',
    achieveDate: new Date(2023, 8, 15),
    category: 5,
    achievementMedia: '',
    recordContent: '드디어 칼질을 이쁘게 할 수 있다!',
  },
];
