/*
[테스트용 버킷리스트 임시 데이터]
- 백 연결 시 삭제
*/
// 달성하지 못한 버킷리스트 데이터
export const unachievedData = [
  {
    bucketId: 1,
    bucketName: '제주도 일 년 살이',
    bucketContent: '제주도에서 일 년 동안 살며 힐링하기',
    goalDate: new Date(2024, 11, 31),
    category: 2,
  },
  {
    bucketId: 2,
    bucketName: '베이킹 배우기',
    bucketContent: '롤케이크 직접 만들어보기',
    goalDate: new Date(2025, 1, 31),
    category: 5,
  },
  {
    bucketId: 6,
    bucketName: '개발 공부하기',
    bucketContent: '내 영원한 앙숙',
    goalDate: new Date(2024, 11, 30),
    category: 0,
  },
];

// 달성한 버킷리스트 데이터
export const achievedData = [
  {
    bucketId: 10,
    bucketName: '삼쏘먹기',
    achieveDate: new Date(2022, 8, 3),
    category: 1,
    achievementMedia:
      'https://img.daily.co.kr/@files/www.daily.co.kr/content/food/2017/20170411/7b532799ae9d210415512b2d22457a4e.jpg',
    goalReview: '진짜 맛있었다',
    stickerId: 3,
  },
  {
    bucketId: 20,
    bucketName: '제주도 한 달 살이',
    achieveDate: new Date(2023, 11, 30),
    category: 2,
    achievementMedia: '',
    goalReview:
      '제주도에서 한달 동안 힐링하기 성공했다. 긴 내용이 있다면 얘가 어떻게 될 지 파악해야 하기 때문에 일부러 길게 적어보고 있다. 사실 저는 제주도를 한 번도 가보지 못했어요. 제주도보다 일본이 더 값싼 시절에 가서 제주도를 한 번도 못가봤어요 하지만 가보고 싶다는 로망도? 있기는 합니다 제주도 바다 제주도 귤 귤이 요즘 제철이더라고요 귤 맛있어요',

    stickerId: 1,
  },
  {
    bucketId: 30,
    bucketName: '칼질 성공하기',
    achieveDate: new Date(2020, 10, 31),
    category: 5,
    achievementMedia: '',
    goalReview: '',
    stickerId: 4,
  },
];

// 달성한 버킷 목록 세부 내용
export const achievedDetailData = {
  bucketId: 1,
  bucketName: '제주도 일 년 살이',
  bucketContent: '제주도에서 일 년 동안 살며 힐링하기',
  goalDate: new Date(2025, 11, 31),
  category: 2,
  createDate: new Date(2023, 1, 31),
  friendIds: ['햄햄이', '햄햄사', '햄햄오'],
  semiGoalData: new Map<string, number>([
    ['돈 모으기', 2],
    ['머물 곳 마련하기', 0],
    ['필요한 자료 찾기', null],
    ['옷 모으기', 4],
  ]),
  achievementMedia:
    'https://img.daily.co.kr/@files/www.daily.co.kr/content/food/2017/20170411/7b532799ae9d210415512b2d22457a4e.jpg',
  goalReview:
    '제주도에서 한달 동안 힐링하기 성공했다. 긴 내용이 있다면 얘가 어떻게 될 지 파악해야 하기 때문에 일부러 길게 적어보고 있다. 사실 저는 제주도를 한 번도 가보지 못했어요. 제주도보다 일본이 더 값싼 시절에 가서 제주도를 한 번도 못가봤어요 하지만 가보고 싶다는 로망도? 있기는 합니다 제주도 바다 제주도 귤 귤이 요즘 제철이더라고요 귤 맛있어요',

  stickerId: 3,
};
// 친구 버킷리스트 목록
export const FriendBucket = [
  {
    nickname: 'user1',
    mbti: 'INTP',
    profileImage:
      'https://i.pinimg.com/236x/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg',
    bucketName: '제주도 한달 살이',
    bucketContent: '재밌당.',
    achieveDate: new Date(2023, 11, 18),
    achievementMedia: '',
  },
  {
    nickname: 'user2',
    mbti: 'INTJ',
    profileImage:
      'https://i.pinimg.com/236x/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg',
    bucketName: '제주도',
    bucketContent: '재밌.',
    achieveDate: new Date(2024, 12, 8),
    achievementMedia: '',
  },
  {
    nickname: 'user2',
    mbti: 'INTJ',
    profileImage:
      'https://i.pinimg.com/236x/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg',
    bucketName: '제주도',
    bucketContent: '재밌.',
    achieveDate: new Date(2024, 12, 8),
    achievementMedia: '',
  },
  {
    nickname: 'user2',
    mbti: 'INTJ',
    profileImage:
      'https://i.pinimg.com/236x/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg',
    bucketName: '제주도',
    bucketContent: '재밌.',
    achieveDate: new Date(2024, 12, 8),
    achievementMedia: '',
  },
  {
    nickname: 'user2',
    mbti: 'INTJ',
    profileImage:
      'https://i.pinimg.com/236x/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg',
    bucketName: '제주도',
    bucketContent: '재밌.',
    achieveDate: new Date(2024, 12, 8),
    achievementMedia: '',
  },
  {
    nickname: 'user2',
    mbti: 'INTJ',
    profileImage:
      'https://i.pinimg.com/236x/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg',
    bucketName: '제주도',
    bucketContent: '재밌.',
    achieveDate: new Date(2024, 12, 8),
    achievementMedia: '',
  },
];

// MBTI별 버킷 데이터
export const MBTIBucket = [
  {
    bucketName: '제주도 한달 살이',
    bucketContent: '',
    achieveDate: new Date(2024, 11, 8),
    achievementMedia: '',
  },
  {
    bucketName: '제주도 두달 살이',
    bucketContent: '재밌당. 그것도 아주 많이!',
    achieveDate: new Date(2024, 8, 1),
    achievementMedia: '',
  },
  {
    bucketName: '제주도 세달 살이',
    bucketContent: '재밌당.',
    achieveDate: new Date(2023, 5, 23),
    achievementMedia:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20151104_15%2Fnew_huacheng_1446641842729s09Bd_JPEG%2F3-4_%25B5%25B9%25C7%25CF%25B8%25A3%25B9%25E6.jpg&type=a340',
  },
  {
    bucketName: '제주도 네달 살이',
    bucketContent: '재밌당.',
    achieveDate: new Date(2023, 5, 23),
    achievementMedia:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20151104_15%2Fnew_huacheng_1446641842729s09Bd_JPEG%2F3-4_%25B5%25B9%25C7%25CF%25B8%25A3%25B9%25E6.jpg&type=a340',
  },
];

// 알람 예시
export const AlarmList = [
  {
    alarmId: 1,
    receiveDate: '2024-10-14',
    alarmContent: '출석체크: 10point 적립',
    readStatus: 1, //읽음
  },
  {
    alarmId: 2,
    receiveDate: '2024-10-15',
    alarmContent: "'제주도 가기'까지 한 달 남았습니다.",
    readStatus: 0, //읽지 않음
  },
];
