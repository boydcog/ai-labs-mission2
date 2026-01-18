/**
 * ScoreBarChart 컴포넌트 타입 정의
 */

export interface ScoreBarData {
  /** 막대 위에 표시될 숫자 값 */
  value: number;
  /** 막대 아래에 표시될 레이블 텍스트 */
  label: string;
  /** 막대의 최대 높이 (0-100) */
  maxHeight?: number;
  /** 막대 색상 (왼쪽/오른쪽 구분용) */
  color?: string;
}

export interface ScoreBarChartProps {
  /** 좌측 막대 데이터 */
  leftBar: ScoreBarData;
  /** 우측 막대 데이터 */
  rightBar: ScoreBarData;
  /** 막대의 최대 높이 (px) */
  maxBarHeight?: number;
  /** 막대 간격 (px) */
  gap?: number;
  /** 추가 클래스명 */
  className?: string;
  /** 테스트 ID */
  'data-testid'?: string;
}
