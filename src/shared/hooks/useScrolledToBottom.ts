"use client";

import { useEffect, useRef, useState } from "react";

/**
 * sentinel 요소가 뷰포트에 진입하면 `reached`를 true로 세팅하는 one-shot 훅.
 * 반환한 `sentinelRef`를 페이지 하단 요소에 연결하면 스크롤 맨 아래 도달을 감지한다.
 */
export function useScrolledToBottom() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [reached, setReached] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || reached) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setReached(true);
        observer.disconnect();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [reached]);

  return { sentinelRef, reached };
}
