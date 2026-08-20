"use client";

import { useEffect, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/shared/utils/cn";
import { useDropdownContext } from "../model/DropdownContext";
import DropdownSurface from "./DropdownSurface";
import DropdownList from "./DropdownList";

interface DropdownMenuBaseProps {
  /** 메뉴 항목(`DropdownActionItem`·`DropdownSelectItem`)들을 배치합니다. */
  children: ReactNode;
  /** 서피스에 추가할 위치·크기 클래스명 (예: `right-0 top-full mt-2 w-40`) */
  className?: string;
  /** `DropdownList`로 전달되어 항목 사이 구분선을 그립니다. */
  divided?: boolean;
  /** 목록 아래(서피스 안·리스트 밖)에 표시할 푸터 영역. (예: "새 그룹 만들기" 액션) */
  footer?: ReactNode;
}

const MENUITEM_SELECTOR = '[role="menuitem"]:not(:disabled),[role="menuitemradio"]:not(:disabled)';

/**
 * 드롭다운 메뉴의 공통 껍데기(shell) 컴포넌트입니다.
 *
 * - 열림 상태일 때만 렌더링되며, `DropdownSurface`(배경) + `DropdownList`(메뉴
 *   리스트) + 선택적 `footer`(리스트 밖 영역)를 조합해 `DropdownProvider`
 *   컨테이너(`relative`) 기준으로 띄웁니다.
 * - 열고 닫는 공통 동작(열릴 때 첫 항목 포커스, 바깥 탭·`Escape` 닫기, 항목 실행 시
 *   닫기)과 스크린리더용 ARIA를 담당합니다. (모바일 타깃 기준)
 * - 항목 렌더링 방식은 `DropdownActionMenu`(children)·`DropdownSelectMenu`(데이터
 *   배열)가 이 위에서 결정합니다. 커스텀 메뉴가 필요하면 직접 사용할 수도 있습니다.
 */
export default function DropdownMenuBase({
  children,
  className,
  divided,
  footer,
}: DropdownMenuBaseProps) {
  const { isOpen, close, triggerId, menuId, triggerRef, menuRef } = useDropdownContext();

  // 열릴 때 첫 항목으로 포커스를 옮겨 스크린리더가 메뉴 안에서 시작하도록 한다.
  useEffect(() => {
    if (!isOpen) return;
    const firstItem = menuRef.current?.querySelector<HTMLElement>(MENUITEM_SELECTOR);
    firstItem?.focus();
  }, [isOpen, menuRef]);

  if (!isOpen) return null;

  const handleKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      triggerRef.current?.focus();
    }
  };

  // 항목 실행(탭·Enter·Space) 시 메뉴를 닫는다.
  const handleClick = (event: MouseEvent<HTMLUListElement>) => {
    if ((event.target as HTMLElement).closest(MENUITEM_SELECTOR)) {
      close();
    }
  };

  return (
    <DropdownSurface className={cn("absolute", className)}>
      <DropdownList
        ref={menuRef}
        id={menuId}
        aria-labelledby={triggerId}
        divided={divided}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
      >
        {children}
      </DropdownList>
      {footer}
    </DropdownSurface>
  );
}
