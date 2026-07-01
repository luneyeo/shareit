import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 조건부 클래스명을 병합하고 Tailwind CSS 충돌을 해결합니다.
 *
 * @param inputs - 병합할 클래스명 또는 조건부 클래스명 목록
 * @returns 병합된 클래스명 문자열
 *
 * @example
 * cn('px-2 py-1', isActive && 'bg-blue-500')
 * cn('px-2', 'px-4') // → 'px-4'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
