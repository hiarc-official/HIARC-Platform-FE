import apiClient from './ApiClient';

//admin 페이지 블록별 api
export const sendAdminInput = async (blockName: string, inputValue: string, params?: number) => {
  if (!inputValue.trim()) {
    alert('입력값을 입력해주세요.');
    return;
  }
  let parsedData;
  try {
    console.log(blockName);
    parsedData = JSON.parse(inputValue);
    if (typeof parsedData !== 'object') {
      throw new Error('올바른 객체 형식이 아닙니다.');
    }
  } catch (error) {
    alert('입력값이 올바른 JSON 형식이 아닙니다.');
    console.error('JSON 변환 실패:', error);
    return;
  }

  const apiUrl = (() => {
    switch (blockName) {
      case '새로운 시즌 시작하기':
        return '/admin/rating/season';
      case '새로운 이벤트 시작하기':
        return '/admin/rating/event';
      case '현재 시즌 수정하기':
        return `/admin/rating/season/${params}`;
      case '이벤트 수정하기':
        return `/admin/rating/event/${params}`;
      case 'HITING값 확인하기':
        return '/admin/new-solved';
      default:
        alert('올바르지 않은 BlockName입니다.');
        console.error(` ${blockName}은 유효하지 않은 BlockName입니다.`);
        return;
    }
  })();

  if (!apiUrl) return;

  try {
    // 수정 요청인 경우 PATCH 메서드 사용, 나머지는 POST 사용
    const isPatchRequest = blockName === '현재 시즌 수정하기' || blockName === '이벤트 수정하기';
    const response = isPatchRequest
      ? await apiClient.patch(apiUrl, parsedData)
      : await apiClient.post(apiUrl, parsedData);

    console.log(`${blockName} 데이터 전송 성공:`, response);
    alert('성공적으로 전송되었습니다!');
    return response;
  } catch (error) {
    console.log('전송되는 데이터:', parsedData);
    console.error(` ${blockName} 데이터 전송 실패:`, error);
    alert('데이터 전송에 실패했습니다.');
  }
};

//시즌 이벤트 초기화 api
export const resetAdminData = async (type: 'season' | 'event') => {
  return await apiClient.post(`/admin/reset/${type}`, {});
};

//확인하기 api 들

export const checkAdminApi = async (type: 'season' | 'event') => {
  return await apiClient.get(`/admin/rating/${type}`);
};

export const checkSemesterApi = async () => {
  return await apiClient.get('/semesters');
};

// 핸들별 현재 값들 확인하는 api

export const getAdminHandleStats = async (type: 'hiting' | 'solved-level', handle: string) => {
  try {
    // 핸들별 유저 정보 확인하기는 새로운 API 사용
    if (type === 'solved-level') {
      const res = await apiClient.get('/admin/rating/members', {
        params: { bojHandle: handle },
      });
      return res;
    }

    // 기존 hiting API 유지
    const res = await apiClient.get(`/admin/${type}`, {
      params: { handle },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
