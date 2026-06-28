'use client';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { handleAtom } from '../store/Atom';
import { getId } from '../api/AdminApi';

const HeaderInput = () => {
  const [, setHandle] = useAtom(handleAtom);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = async () => {
    if (inputValue.trim() !== '') {
      try {
        setHandle(inputValue);
        console.log('🔍 검색 실행:', inputValue);

        // AdminApi getId를 사용해서 memberId 가져오기
        const response = await getId(inputValue.trim());

        console.log('API 응답:', response);
        console.log('응답 데이터:', response?.data);

        if (response && response.data) {
          // 반환 데이터 구조를 확인하고 적절한 필드에 접근
          const memberId = response.data.id || response.data.memberId;
          if (memberId) {
            console.log('멤버 ID 찾음:', memberId);
            window.location.href = `${process.env.NEXT_PUBLIC_INTRA_API_URL}/member/${memberId}`;
          } else {
            console.log('멤버 ID를 찾을 수 없음:', response.data);
          }
        }
        // 핸들이 존재하지 않거나 에러가 발생한 경우 아무것도 하지 않음 (getId에서 이미 alert 처리)
      } catch (error) {
        console.error('ID 조회 실패:', error);
        // /search로 이동하지 않음
      }
    }
  };

  return (
    <div className="w-[339px] flex border border-primary rounded-[18px] h-[34px] items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/InputImg.png"
        alt="검색 아이콘"
        onClick={handleSearch}
        className="cursor-pointer w-[20px] h-[20px] ml-[21px]"
      />
      <input
        type="text"
        placeholder="백준 핸들 검색"
        className="border-none outline-none ml-px w-[80%] text-[14px]"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
    </div>
  );
};

export default HeaderInput;
