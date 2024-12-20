import apiClient from '../apiClient';
import {
  WriteBucketRequest,
  WriteBucketResponse,
  TemplateBucket,
  GetTemplateBucketsResponse,
  FriendNickNameResponse,
  upcomingBucket,
  upcomingBucketResponse,
  achievedBucket,
  BucketDetail,
  EditBucketDataResponse,
  Response,
  EditBucketSubmit,
  EditBucketResponse,
} from '../types';

// 버킷 작성하기 결과 전송 함수
export const writeBucket = async (
  data: WriteBucketRequest,
): Promise<WriteBucketResponse> => {
  const response = await apiClient.post('/bucket/write', data);

  if (response.data.code === 'SU') {
    return response.data;
  } else {
    throw new Error(response.data.message || '템플릿을 불러오는 중 오류가 발생했습니다.');
  }
};

// 템플릿 목록 가져오기 함수
export const getTemplateBuckets = async (): Promise<TemplateBucket[]> => {
  const response = await apiClient.get<GetTemplateBucketsResponse>(
    '/bucket/search-template',
  );

  if (response.data.code === 'SU') {
    return response.data.templateList;
  } else {
    throw new Error(
      response.data.message || '템플릿을 불러오는 중 오류가 발생했습니다.',
    );
  }
};

// 함께할 친구 목록 가져오기 함수
export const getFriendNickNames = async (): Promise<string[]> => {
  const response = await apiClient.get<FriendNickNameResponse>('bucket/write');

  if (response.data.code === 'SU') {
    return response.data.friendNicknameList;
  } else {
    throw new Error(
      response.data.message || '친구 목록을 불러오는 중 오류가 발생했습니다.',
    );
  }
};

// 달성 예정 버킷 목록 가져오기 함수
export const getMyUpcomingBucketList = async (
  achieveStatus: boolean,
): Promise<upcomingBucket[]> => {
  try {
    // 서버에서 데이터 가져오기
    const response = await apiClient.get<{
      code: string;
      message: string;
      bucketList: upcomingBucketResponse[];
    }>('/bucketlists', {
      params: {achieveStatus},
    });

    // 응답 코드 확인
    if (response.data.code !== 'SU') {
      throw new Error(
        response.data.message || '버킷 목록을 불러오는 중 오류가 발생했습니다.',
      );
    }
    // 데이터를 필요한 형태로 변환
    // const bucketList = response.data.bucketList.map(
    //   (bucket): upcomingBucket => ({
    //     bucketId: bucket.bucketId,
    //     bucketName: bucket.bucketName,
    //     bucketContent: bucket.bucketContent,
    //     goalDate: bucket.goalDate, // 문자열을 Date 객체로 변환
    //     category: bucket.category,
    //   }),
    // );
    // console.log(bucketList);
    // return bucketList; // 변환된 버킷 목록 반환
    return response.data.bucketList;
  } catch (error) {
    console.error('버킷 목록 요청 오류:', error);
    throw error; // 에러 재발생
  }
};

// 달성한 버킷 목록 가져오기 함수
export const getMyAchievedBucketList = async (
  achieveStatus: boolean,
): Promise<achievedBucket> => {
  try {
    // 서버에서 데이터 가져오기
    const response = await apiClient.get<{
      code: string;
      message: string;
      bucketList: achievedBucket;
    }>('/bucketlists', {
      params: {achieveStatus},
    });

    // 응답 코드 확인
    if (response.data.code !== 'SU') {
      throw new Error(
        response.data.message || '버킷 목록을 불러오는 중 오류가 발생했습니다.',
      );
    }
    console.log(response.data.bucketList);
    return response.data.bucketList;
  } catch (error) {
    console.error('달성한 버킷 목록 요청 오류:', error);
    throw error; // 에러 재발생
  }
};

// 버킷 상세 정보 가져오기
export const getMyBucketDetail = async (
  bucketId: number,
): Promise<BucketDetail> => {
  try {
    // 서버에서 데이터 가져오기
    const response = await apiClient.get<{
      code: string;
      message: string;
      bucketList: BucketDetail;
    }>(`/bucketlists/${bucketId}`, {
      params: {bucketId},
    });

    // 응답 코드 확인
    if (response.data.code !== 'SU') {
      throw new Error(
        response.data.message ||
          '버킷 상세 정보를 불러오는 중 오류가 발생했습니다.',
      );
    }
    console.log(response.data.bucketList);
    return response.data.bucketList;
  } catch (error) {
    console.error('버킷 상세 내용 요청 오류:', error);
    throw error; // 에러 재발생
  }
};

// 버킷 수정할 목록 불러오기
export const getEditBucketDetail = async (
  bucketId: number,
): Promise<EditBucketDataResponse> => {
  try {
    // 서버에서 데이터 가져오기
    const response = await apiClient.get<EditBucketDataResponse>(
      `/bucket-edit/${bucketId}`,
      {
        params: {bucketId},
      },
    );
    // 응답 코드 확인
    if (response.data.code !== 'SU') {
      throw new Error(
        response.data.message ||
          '버킷 수정 정보를 불러오는 중 오류가 발생했습니다.',
      );
    }
    return response.data;
  } catch (error) {
    console.error('버킷 수정 정보 요청 오류:', error);
    throw error; // 에러 재발생
  }
};

// 수정 내용 제출하기
export const submitEditData = async (
  data: EditBucketSubmit,
  bucketId: number,
): Promise<EditBucketResponse> => {
  try {
    const response = await apiClient.patch(
      `bucket-edit/${bucketId}`,
      data,
      {
        params: {bucketId},
      }, // 요청 본문에 데이터 추가
    );
    if (response.data.code === 'SU') return response.data;
    else
      throw new Error(
        response.data.message || '버킷 수정 중 오류가 발생했습니다.',
      );
  } catch (error) {
    console.error('버킷 수정 요청 오류:', error);
    throw error; // 에러 재발생
  }
};

// 버킷 삭제하기
export const deleteBucket = async (bucketId: number): Promise<Response> => {
  try {
    const response = await apiClient.delete<Response>(
      `/bucket-delete/${bucketId}`,
      {
        params: {bucketId},
      },
    );
    console.log(bucketId);
    return response.data; // 삭제 성공 시 응답 반환
  } catch (error) {
    console.error('버킷 삭제 요청 오류:', error);
    throw error; // 에러 재발생
  }
};
