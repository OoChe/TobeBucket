import apiClient from '../apiClient';
import { Request, FriendListResponse, Friend, FriendRequest, Response, UserListResponse, FriendAdd, FriendDelete } from '../types';


// 친구 목록 가져오기 함수
export const getFriendList = async (): Promise<FriendListResponse> => {
  const response = await apiClient.get<FriendListResponse>('/friendlist');
  if (response.data.code === 'SU') {
    return response.data;
  } else {
    throw new Error(response.data.message || '친구 목록을 불러오는 중 오류가 발생했습니다.');
  }
};


// 친구에게서 온 요청을 수락/거절 함수
export const patchFriendList = async (data: FriendRequest): Promise<Response> => {
  const response = await apiClient.patch('/friendlist/respond', data);
  console.log(response.data);

  if (response.data.code === 'SU') {
    return response.data;
  } else {
    throw new Error(response.data.message || '친구 요청에 응답하는 중 오류가 발생했습니다.');
  }
};


// 친구 버킷 피드 가져오기 함수
export const getFriendBucket = async (userId: string): Promise<FriendBucketResponse> => {

  const response = await apiClient.get<FriendBucketResponse>('/friendlist/bucket', {
    params: { userId }, // 쿼리 파라미터로 전달
  });

  if (response.data.code === 'SU') {
    return response.data;
  } else {
    throw new Error(response.data.message || '친구 목록을 불러오는 중 오류가 발생했습니다.');
  }
};


// 전체 사용자 목록 가져오기 함수
export const getUserList = async (): Promise<UserListResponse> => {
  const response = await apiClient.get<UserListResponse>('/friendlist/add');
  return response.data.userList; //서버 수정 전 임시

  if (response.data.code === 'SU') {
    return response.data.userList;
  } else {
//     throw new Error(response.data.message || '전체 사용자 목록을 불러오는 중 오류가 발생했습니다.');
  }
};


// 친구 추가 함수
export const addFriend = async (data: FriendAdd): Promise<Response> => {
  const response = await apiClient.post('/friendlist/add', data);

  if (response.data.code === 'SU') {
    return response.data;
  } else {
    throw new Error(response.data.message || '친구를 추가하는 중 오류가 발생했습니다.');
  }
};

// 친구 삭제하기 함수
export const deleteFriend = async (data: FriendDelete): Promise<Response> => {
  const response = await apiClient.delete('/friendlist/delete', {data});

  if (response.data.code === 'SU') {
    return response.data;
  } else {
    throw new Error(response.data.message || '친구를 삭제하는 중 오류가 발생했습니다.');
  }
};






