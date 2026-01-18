/**
 * Icon 컴포넌트 타입 정의
 * Phosphor Icons를 사용합니다: https://phosphoricons.com/
 */

export type IconType = 'line' | 'fill' | 'graphic';

// Phosphor Icons 이름 매핑
export type IconName =
  | 'add'              // Plus
  | 'remove'           // Minus
  | 'close'            // X
  | 'undo'             // ArrowCounterClockwise
  | 'check'            // Check
  | 'arrow_back_ios'   // CaretLeft
  | 'arrow-back-ios-new' // CaretLeft
  | 'arrow_forward_ios' // CaretRight
  | 'info'            // Info
  | 'help'            // Question
  | 'draw'            // Pencil
  | 'ink-eraser'      // Eraser
  | 'zoom-in'         // MagnifyingGlassPlus
  | 'check_box'        // CheckSquare
  | 'check_circle'     // CheckCircle
  | 'chevron_backward' // ChevronLeft
  | 'chevron_forward'  // ChevronRight
  | 'arrow_forward'    // ArrowRight
  | 'arrow_back'       // ArrowLeft
  | 'fire'             // Fire
  | 'attention'        // Warning
  | 'imagination'      // Lightbulb
  | 'association'     // Link
  | 'brain'           // Brain
  | 'backspace'       // Backspace
  | 'cancel'          // XCircle
  | 'block'           // Prohibit
  | 'error';          // XCircle

// Phosphor Icons 이름 매핑 객체
export const PHOSPHOR_ICON_MAP: Record<IconName, string> = {
  'add': 'Plus',
  'remove': 'Minus',
  'close': 'X',
  'undo': 'ArrowCounterClockwise',
  'check': 'Check',
  'arrow_back_ios': 'CaretLeft',
  'arrow-back-ios-new': 'CaretLeft',
  'arrow_forward_ios': 'CaretRight',
  'info': 'Info',
  'help': 'Question',
  'draw': 'Pencil',
  'ink-eraser': 'Eraser',
  'zoom-in': 'MagnifyingGlassPlus',
  'check_box': 'CheckSquare',
  'check_circle': 'CheckCircle',
  'chevron_backward': 'ChevronLeft',
  'chevron_forward': 'ChevronRight',
  'arrow_forward': 'ArrowRight',
  'arrow_back': 'ArrowLeft',
  'fire': 'Fire',
  'attention': 'Warning',
  'imagination': 'Lightbulb',
  'association': 'Link',
  'brain': 'Brain',
  'backspace': 'Backspace',
  'cancel': 'XCircle',
  'block': 'Prohibit',
  'error': 'XCircle',
};

export interface IconProps {
  type?: IconType;
  name?: IconName;
  className?: string;
  size?: number;
  'data-testid'?: string;
}

