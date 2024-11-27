import apiClient from '../apiClient';
import { WriteBucketRequest, WriteBucketResponse, TemplateBucket, GetTemplateBucketsResponse, FriendNickNameResponse } from '../types';

// 버킷 작성하기 함수
export const writeBucket = async (data: WriteBucketRequest): Promise<WriteBucketResponse> => {
  const response = await apiClient.post('/bucket/write', data);

  if (response.data.code === 'SU') {
    return response.data;
  } else {
    throw new Error(response.data.message || '템플릿을 불러오는 중 오류가 발생했습니다.');
  }
};

// 템플릿 목록 가져오기 함수
export const getTemplateBuckets = async (): Promise<TemplateBucket[]> => {
  const response = await apiClient.get<GetTemplateBucketsResponse>('/bucket/search-template');

  if (response.data.code === 'SU') {
    return response.data.templateList;
  } else {
    throw new Error(response.data.message || '템플릿을 불러오는 중 오류가 발생했습니다.');
  }
};

// 함께할 친구 목록 가져오기 함수
export const getFriendNickNames = async (): Promise<string[]> => {
  const response = await apiClient.get<FriendNickNameResponse>('bucket/write');

  if (response.data.code === 'SU') {
    return response.data.friendNicknameList;
  } else {
    throw new Error(response.data.message || '친구 목록을 불러오는 중 오류가 발생했습니다.');
  }
};





