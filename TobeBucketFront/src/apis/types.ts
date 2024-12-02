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
  achievementDate: string;
  friendNickname: string[];
  semiGoalData: Map<string, number>;
  goalReview: string;
  achievementMedia: string;
  stickerId: number;
  publicStatus: boolean;
}
export interface editBucketData {
  friendNicknameList: string[];
  BucketListDetail: BucketDetail;
}

export interface EditBucketDataResponse {
  code: string;
  message: string;
  friendNicknameList: string[];
  bucketListDetail: BucketDetail; // 기존 BucketDetail 타입 사용
}

export interface EditBucketSubmit {
  bucketContent: string;
  category: number;
  publicStatus: boolean;
  friendNickNameList?: string[];
}
export interface EditBucketResponse {
  code: string;
  message: string;
}
export interface semiGoalRecordData {
  bucketId: number;
  stickerId: number;
  semiGoalId: number;
  achieveDate: string;
}

export interface achieveRecordData {
  bucketId: number;
  stickerId: number;
  achieveDate: string;
  goalReview: string;
}

export interface achieveRecordResponse {
  code: string;
  message: string;
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
