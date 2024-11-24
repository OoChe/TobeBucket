import apiClient from '../apiClient';
import { Request, FriendListResponse, Friend, FriendRequest, Response } from '../types';


// 친구 목록 가져오기 함수
export const getFriendList = async (): Promise<FriendListResponse> => {
  const response = await apiClient.get<FriendListResponse>('/friendlist');

  if (response.data.code === 'SU') {
    return response.data;
  } else {
    throw new Error(response.data.message || '친구 목록을 불러오는 중 오류가 발생했습니다.');
  }
};


// 친구 요청 수락/거절 함수
export const patchFriendList = async (data: FriendRequest): Promise<Response> => {
  const response = await apiClient.patch('/friendlist/respond', data);

  if (response.data.code === 'SU') {
    return response.data;
  } else {
    throw new Error(response.data.message || '친구 요청에 응답하는 중 오류가 발생했습니다.');
  }
};


// 친구 버킷 피드 가져오기 함수
export const getFriendBucket = async (userId: string): Promise<FriendBucketResponse> => {

  console.log("getFriendBucket 실행")
  const response = await apiClient.get<FriendBucketResponse>('/friendlist/bucket/${userId}');

  if (response.data.code === 'SU') {
    return response.data;
  } else {
    throw new Error(response.data.message || '친구 목록을 불러오는 중 오류가 발생했습니다.');
  }
};







