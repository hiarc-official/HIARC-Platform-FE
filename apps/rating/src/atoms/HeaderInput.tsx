import styled from 'styled-components';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { handleAtom } from '../store/Atom';
import { getId } from '../api/AdminApi';
import Img from './../assets/InputImg.png';
import Color from '../util/Color';

const Wrapper = styled.div`
  width: 339px;
  display: flex;
  border: 1px solid ${Color.primary};
  border-radius: 18px;
  height: 34px;
  align-items: center;

  .Input {
    border: none;
    outline: none;
    margin-left: 1px;
    width: 80%;
    font-size: 14px;
  }

  img {
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin-left: 21px;
  }
`;

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
            window.location.href = `${import.meta.env.VITE_INTRA_API_URL}/member/${memberId}`;
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
    <Wrapper>
      <img src={Img} alt="검색 아이콘" onClick={handleSearch} />
      <input
        type="text"
        placeholder="백준 핸들 검색"
        className="Input"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
    </Wrapper>
  );
};

export default HeaderInput;
