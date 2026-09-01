/**
 * 그룹 생성·수정·입장 흐름에서 사용자에게 노출하는 문구를 한곳에서 관리한다.
 * 문구 중복을 방지하고, 토스트/인라인 안내에서 참조를 일관되게 유지한다.
 */
export const GROUP_MESSAGE = {
  CREATE: {
    ERROR: "그룹 생성에 실패했어요. 다시 시도해 주세요.",
  },
  EDIT: {
    ERROR: "그룹명 수정에 실패했어요. 다시 시도해 주세요.",
  },
  JOIN: {
    ERROR: "입장에 실패했어요. 다시 시도해 주세요.",
  },
  DELETE: {
    SUCCESS: "그룹을 삭제했어요.",
    ERROR: "그룹 삭제에 실패했어요. 다시 시도해 주세요.",
  },
  LEAVE: {
    SUCCESS: "그룹에서 나갔어요.",
    ERROR: "그룹 나가기에 실패했어요. 다시 시도해 주세요.",
  },
} as const;

/**
 * 상품 등록·수정 폼의 필드 유효성 에러 문구를 한곳에서 관리한다.
 * `product-form`의 zod 스키마가 참조해 문구 중복을 방지한다.
 */
export const PRODUCT_FORM_ERROR = {
  PRD_NAME: "제품명을 입력해주세요",
  CATEGORY: "카테고리를 선택해주세요",
} as const;

/**
 * 상품 등록 흐름의 결과 알림 문구를 한곳에서 관리한다.
 * 등록 성공/실패 토스트에서 참조해 문구 중복을 방지한다.
 */
export const PRODUCT_MESSAGE = {
  CREATE: {
    SUCCESS: "상품을 등록했어요.",
    ERROR: "상품 등록에 실패했어요. 다시 시도해 주세요.",
  },
  UPDATE: {
    SUCCESS: "상품을 수정했어요.",
    ERROR: "상품 수정에 실패했어요. 다시 시도해 주세요.",
  },
  DELETE: {
    SUCCESS: "상품을 삭제했어요.",
    ERROR: "상품 삭제에 실패했어요. 다시 시도해 주세요.",
  },
} as const;
