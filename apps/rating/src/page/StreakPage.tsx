import { useEffect, useState } from 'react';
import LayOut from '../util/Layout';
import styled, { keyframes } from 'styled-components';
import NewStreakEntity from '../block/streak/NewStreakEntity';
import { fetchStreakData, PageableResponse, PaginationParams } from '../api/StreakApi';
import Color from '../util/Color';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedContainer = styled.div<{ $delay?: string }>`
  opacity: 0;
  animation: ${fadeIn} 1s ease-in-out forwards;
  animation-delay: ${(props) => props.$delay || '0s'};
`;

const HeadWrapper = styled.div`
  font-size: 35px;
  font-weight: 900;
  padding-bottom: 24px;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 60px 80px;
  justify-content: flex-start;
  width: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  @media (max-width: 480px) {
    width: 100%;
    margin-left: 16px;
    margin-bottom: 40px;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
  margin-top: 60px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  font-size: 14px;
  font-weight: bold;
  background-color: ${Color.primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

const PageNumber = styled.div`
  margin-top: 5px;
`;

const StreakPage = () => {
  const [streakData, setStreakData] = useState<PageableResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const loadStreakData = async (page: number) => {
    setLoading(true);
    setError(null);

    try {

      const params: PaginationParams = {
        page: page,
        size: pageSize,
      };

      const response = await fetchStreakData(params);
      setStreakData(response);
    } catch (error) {
      setError('데이터를 불러오는데 실패했습니다.');
      console.error('Streak 데이터 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevPage = () => {
    if (streakData && !streakData.first) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (streakData && !streakData.last) {
      setCurrentPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    loadStreakData(currentPage);
  }, [currentPage]);

  return (
    <LayOut>
      <Wrapper>
        <HeadWrapper>Streak</HeadWrapper>
        {loading ? (
          <p>로딩 중...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <AnimatedContainer $delay="0.2s">
              <MainWrapper>
                {streakData?.content.map((member) => (
                  <NewStreakEntity key={member.memberId} member={member} />
                ))}
              </MainWrapper>
            </AnimatedContainer>

            {streakData && streakData.totalPages > 1 && (
              <PaginationWrapper>
                <PageButton
                  onClick={handlePrevPage}
                  disabled={streakData.first || loading}
                >
                  이전
                </PageButton>
                <PageNumber>
                  {streakData.number + 1} / {streakData.totalPages}
                  <span style={{fontSize: '12px', color: '#666', display: 'block'}}>
                    (총 {streakData.totalElements}명)
                  </span>
                </PageNumber>
                <PageButton
                  onClick={handleNextPage}
                  disabled={streakData.last || loading}
                >
                  다음
                </PageButton>
              </PaginationWrapper>
            )}
          </>
        )}
      </Wrapper>
    </LayOut>
  );
};

export default StreakPage;
