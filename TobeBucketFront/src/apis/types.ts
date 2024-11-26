// src/apis/types.ts


  /* COMMON */
export interface Request {
  userId: string;
}

export interface Response {
  code: string;
  message: string;
}

/* AUTH */
export interface LoginRequest {
  userId: string;
  pwd: string;
}

export interface LoginResponse {
  code: string;
  message: string;
  token: string;
}

export interface SignupRequest {
  userId: string;
  pwd: string;
  nickname: string;
  mbti: string;
  intro: string;
  role: string;
}


  /* BUCKET */
export interface upcomingBucketResponse {
  bucketId: number;
  bucketName: string;
  bucketContent: string;
  goalDate: string;
  category: number;
  publicStatus: boolean;
  semiGoalData: {semiGoalTitle: string}[];
  friendNickname: string[];
}
export interface upcomingBucket {
  bucketId: number;
  bucketName: string;
  bucketContent: string;
  goalDate: string;
  category: number;
}
export interface achievedBucket {
  bucketId: number;
  bucketName: string;
  achieveDate: string;
  category: number;
  achievementMedia: string;
  goalReview: string;
  stickerId: number;
}
export interface BucketDetail {
  bucketId: number;
  bucketName: string;
  bucketContent: string;
  goalDate: string;
  category: number;
  createDate: string;
  friendIds: string[];
  semiGoalData: Map<string, number>;
  goalReview: string;
  achievementMedia: string;
  stickerId: number;
}

export interface WriteBucketRequest {
  bucketName: string;
  bucketContent: string;
  category: number;
  publicStatus: number;
  createDate: string;
  goalDate?: string;
  friendNickNameList?: string[];
  semiGoalData?: {semiGoalTitle: string}[];
}

export interface WriteBucketResponse {
  code: string;
  message: string;
  bucketId: number;
}

export interface TemplateBucket {
  bucketName: string;
  bucketContent: string;
  semiGoalData: {semiGoalTitle: string}[];
  category: number;
}

export interface GetTemplateBucketsResponse {
  code: string;
  message: string;
  templateList: TemplateBucket[];
}

export interface FriendNickNameResponse {
  code: string;
  message: string;
  friendNicknameList: string[];
}

export interface FriendFeedBucket {
  nickname: string;
  mbti: string;
  profileImage: string;
  bucketName: string;
  bucketContent: string;
  achieveDate: string;
  achievementMedia: string;
}

export interface MbtiBucket {
  bucketName: string;
  bucketContent: string;
  achieveDate: string;
}
export interface MbtiFeedResponse {
  code: string;
  message: string;
  bucketList: MbtiBucket[];
}


  /* FRIEND */

export interface Friend {
  userId: string;
  nickname: string;
  mbti: string;
  profileImage: string;
}

export interface FriendListResponse {
  code: string;
  message: string;
  friendRequest: Friend[];
  friendList: Friend[];
}

export interface FriendRequest {
  friendStatus: number;
  friendId: string;
}

export interface Bucket {
  bucketName: string;
  bucketContent: string;
  achieveDate: string;
  profileImage: string;
}

export interface FriendBucketResponse {
  code: string;
  message: string;
  profile: Friend;
  bucketList: Bucket[];
}
