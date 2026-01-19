/**
 * 메인 페이지
 * Anima 코드 기반으로 재구현
 */

import { useState } from 'react';
import { Button } from '@/components/default';
import Character from '@/components/default/Character';
import Icon from '@/components/default/Icon';
import FocusIconSvg from '@/assets/images/icons/focus-icon.svg?react';
import ImaginationIconSvg from '@/assets/images/icons/imagination-icon.svg?react';
import AssociationIconSvg from '@/assets/images/icons/association-icon.svg?react';

interface GameItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  title: string;
}

interface StatItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

function MainPage() {
  const [timeRemaining] = useState('11시간 59분');
  const [userName] = useState('가나다라마바사');
  const [maxWords] = useState(6);
  const [streakDays] = useState(5);

  const gameItems: GameItem[] = [
    {
      id: 'game-1',
      icon: FocusIconSvg,
      category: '집중하기',
      title: '단어 캐치',
    },
    {
      id: 'game-2',
      icon: ImaginationIconSvg,
      category: '연상하기',
      title: '일곱고개',
    },
    {
      id: 'game-3',
      icon: AssociationIconSvg,
      category: '연합하기',
      title: '이야기 만들기',
    },
  ];

  const statItems: StatItem[] = [
    {
      id: 'stat-1',
      icon: () => <Icon type="graphic" name="brain" size={48} className="text-pink-400" />,
      label: '최대 단어 수',
      value: `${maxWords}개`,
    },
    {
      id: 'stat-2',
      icon: () => <Icon type="line" name="fire" size={48} className="text-[#ed8936]" />,
      label: '연속 학습일',
      value: `${streakDays}일`,
    },
  ];

  const handleStartTraining = () => {
    // 훈련 시작 로직
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* 헤더 섹션 - 파란색 배경 (전체 화면 채움) */}
      <header className="relative w-full min-h-[200px] sm:min-h-[259px] bg-[#2a69e9]">
        {/* 모바일 우선 레이아웃: 최대 너비 360px, 데스크탑에서 중앙 정렬 */}
        <div className="w-full max-w-[360px] mx-auto relative h-full">
          {/* 상태바 - 화면 상단 고정 */}
          <div className="absolute top-0 left-0 w-full h-[26px] flex justify-between items-center px-4 sm:px-5 bg-white mix-blend-multiply z-10">
            <div className="w-[114px] h-[26px] bg-transparent" aria-label="Status bar left" />
            <div className="w-[115px] h-[26px] bg-transparent" aria-label="Status bar right" />
          </div>

          {/* 인사말 - 반응형 위치 및 크기 */}
          <div className="absolute top-[68px] left-4 sm:left-5 right-4 sm:right-5 pr-[100px] sm:pr-[148px]">
            <h1 className="font-bold text-white text-xl sm:text-2xl tracking-[-0.48px] leading-tight sm:leading-[33.6px]">
              {userName}님,
              <br />
              오늘 게임도 화이팅!
            </h1>
          </div>

          {/* 캐릭터 영역 - 반응형 크기 및 위치 (오른쪽 상단, 자연스러운 위치) */}
          <div className="absolute top-[42px] right-4 sm:right-0 w-[100px] h-[100px] sm:w-[148px] sm:h-[148px]">
            <Character variant="thumbnail" className="bg-transparent w-full h-full" />
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 - 반응형 패딩, flex-1로 남은 공간 채움 */}
      <main className="relative w-full flex-1 px-4 sm:px-5 pb-20 sm:pb-24">
        {/* 모바일 우선 레이아웃: 최대 너비 360px, 데스크탑에서 중앙 정렬 */}
        <div className="w-full max-w-[360px] mx-auto">
          {/* 통계 카드 - 헤더와 메인 콘텐츠 사이에 겹치도록 배치 (반응형 마진) */}
          <section
            className="relative -mt-8 sm:-mt-12 w-full bg-white rounded-2xl border-2 border-solid border-[#f1f4fd] shadow-sm px-3 sm:px-4 py-3 sm:py-4"
            aria-label="학습 통계"
          >
            <div className="flex items-center gap-2">
              {statItems.map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={stat.id}
                    className="flex items-center gap-1 flex-1"
                  >
                    <IconComponent />
                    <div className="flex flex-col items-start flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[#898384] leading-tight">
                        {stat.label}
                      </div>
                      <div className="font-semibold text-[#1a202c] text-xl tracking-[-0.40px] leading-[30px]">
                        {stat.value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 오늘의 게임 섹션 */}
          <section className="mt-6 space-y-4">
            {/* 제목 및 타이머 */}
            <div className="flex items-center justify-between w-full">
              <h2
                id="games-title"
                className="font-semibold text-[#1a202c] text-[22px] tracking-[-0.44px] leading-[33px]"
              >
                오늘의 게임
              </h2>
              <div
                className="inline-flex items-center justify-center gap-1"
                role="timer"
                aria-label={`남은 시간 ${timeRemaining}`}
              >
                <Icon type="line" name="attention" size={24} className="text-[#ed8936]" aria-hidden="true" />
                <time className="font-semibold text-[#ed8936] text-base tracking-[-0.16px] leading-6 whitespace-nowrap">
                  {timeRemaining}
                </time>
              </div>
            </div>

            {/* 게임 목록 카드 - 반응형 간격 및 패딩 */}
            <div className="flex flex-col gap-4 sm:gap-5 p-4 sm:p-5 bg-[#f7fafc] rounded-2xl shadow-sm">
              {gameItems.map((game) => {
                const IconComponent = game.icon;
                return (
                  <article
                    key={game.id}
                    className="flex items-center gap-3 w-full"
                  >
                    <IconComponent className="w-12 h-12 flex-shrink-0" />
                    <div className="flex flex-col items-start flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[#718096] leading-tight">
                        {game.category}
                      </div>
                      <h3 className="font-semibold text-[#171923] text-xl tracking-[-0.40px] leading-[30px]">
                        {game.title}
                      </h3>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

        </div>
      </main>

      {/* 하단 고정 버튼 영역 - 화면 하단 고정 (네비게이션 위) */}
      <div className="fixed bottom-[42px] left-0 right-0 w-full bg-white border-t border-gray-200 z-20 shadow-lg">
        <div className="w-full max-w-[360px] mx-auto px-4 sm:px-5 py-3">
          <Button
            hierarchy="primary"
            height={64}
            type="text_only"
            status="default"
            onClick={handleStartTraining}
            className="w-full !border-[#1657da]"
            aria-label="훈련 시작"
          >
            훈련 시작
          </Button>
        </div>
      </div>

      {/* 하단 네비게이션 - 화면 하단 고정 */}
      <nav
        className="fixed bottom-0 left-0 right-0 w-full h-[42px] bg-gray-100 z-10"
        aria-label="하단 네비게이션"
      />
    </div>
  );
}

export default MainPage;
