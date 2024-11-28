import apiClient from '../apiClient';
import {FriendFeedBucket, MbtiBucket, MbtiFeedResponse} from '../types';

// MBTI 버킷 피드 요청하기
export const getMbtiFeedList = async (mbti: string): Promise<MbtiBucket[]> => {
  try {
    // 서버에서 데이터 가져오기
    const response = await apiClient.get<MbtiFeedResponse>('/feed/mbti', {
      params: {mbti},
    });

    // 응답 코드 확인
    if (response.data.code !== 'SU') {
      throw new Error(
        response.data.message || '버킷 목록을 불러오는 중 오류가 발생했습니다.',
      );
    }
    return response.data.bucketList; // 변환된 버킷 목록 반환
  } catch (error) {
    console.error('버킷 목록 요청 오류:', error);
    throw error; // 에러 재발생
  }
};
// 친구 버킷 피드 요청하기
export const getFriendFeedList = async (): Promise<FriendFeedBucket[]> => {
  try {
    // 서버에서 데이터 가져오기
    const response = await apiClient.get<{
      code: string;
      message: string;
      bucketList: FriendFeedBucket[];
    }>('/feed/friend');

    // 응답 코드 확인
    if (response.data.code !== 'SU') {
      throw new Error(
        response.data.message || '버킷 목록을 불러오는 중 오류가 발생했습니다.',
      );
    }
    return response.data.bucketList; // 변환된 버킷 목록 반환
  } catch (error) {
    console.error('버킷 목록 요청 오류:', error);
    throw error; // 에러 재발생
  }
};
