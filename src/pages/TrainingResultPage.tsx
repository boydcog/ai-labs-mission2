/**
 * 훈련 완료 후 결과화면 페이지
 * Anima 코드 기반으로 업데이트
 */

import { useNavigate } from 'react-router-dom';
import { Topbar, ScoreBarChart, Button } from '@/components/default';

function TrainingResultPage() {
  const navigate = useNavigate();

  // 하드코딩된 데이터 (나중에 API/Context로 대체 가능)
  const message = '평소보다 더 집중하셨네요! 앞으로도 중요한 단어에만 초점을 맞춰 주세요.';
  const leftBarData = {
    value: 5,
    label: '최근 3일 평균',
    color: '#b2cefb', // Anima 코드 기준
  };
  const rightBarData = {
    value: 8,
    label: '오늘 점수',
    color: '#8baef3', // Anima 코드 기준
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleClose = () => {
    navigate('/');
  };

  const handleNext = () => {
    // 다음 페이지로 이동 (나중에 실제 경로로 변경)
    navigate('/');
  };

  return (
    <>
      <div className="w-full min-h-screen bg-white overflow-hidden relative">
        {/* 모바일 우선 레이아웃: 최대 너비 360px, 데스크탑에서 중앙 정렬 */}
        <div className="w-full max-w-[360px] mx-auto relative min-h-screen">
          {/* 상태바 영역 - Anima: h-[26px], top-0 */}
          <div className="absolute w-full top-0 left-0 h-[26px] flex justify-between mix-blend-multiply z-20">
            <div className="w-[114px] h-[26px] bg-transparent" aria-label="Status bar left" />
            <div className="w-[115px] h-[26px] bg-transparent" aria-label="Status bar right" />
          </div>

          {/* 헤더 - Anima: top-[26px] */}
          <div className="absolute left-0 w-full top-[26px] z-10">
            <Topbar
              type="default"
              title="게임 결과"
              onBack={handleBack}
              onClose={handleClose}
            />
          </div>

          {/* 안내 메시지 - Anima: top-[90px], pt-[gap-2xs] (8px), px-[gap-m] (20px) */}
          <div className="absolute top-[90px] left-0 w-full px-5 pt-2 pb-2 flex flex-col items-center gap-2">
            <div className="flex flex-col items-start gap-4 w-full">
              {/* Anima: text-[26px], font-semibold, tracking-[-0.52px], leading-[39px] */}
              <p className="w-full font-semibold text-black text-[26px] tracking-[-0.52px] leading-[39px]">
                {message}
              </p>
            </div>
          </div>

          {/* 점수 비교 차트 - 중앙 정렬 */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-2">
            <ScoreBarChart
              leftBar={leftBarData}
              rightBar={rightBarData}
              maxBarHeight={120}
              gap={36}
            />
          </div>
        </div>
      </div>
      
      {/* 하단 버튼 - 화면 하단에 고정 (최상위 레벨) */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[360px] px-5 pb-5 pt-0 z-50 bg-white">
        <Button
          hierarchy="primary"
          height={60} // Anima: height="sixty"
          type="text_only"
          status="default"
          onClick={handleNext}
          className="w-full"
          aria-label="다음"
        >
          다음
        </Button>
      </div>
    </>
  );
}

export default TrainingResultPage;
