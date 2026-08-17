type FieldErrorProps = {
  /** 인풋의 `aria-describedby`와 연결할 id */
  id?: string;
  /** 표시할 에러 메시지. 없으면 렌더링하지 않습니다. */
  message?: string;
};

/**
 * 폼 필드 하단에 표시하는 에러 메시지입니다.
 *
 * `message`가 없으면 아무것도 렌더링하지 않습니다. 스크린리더가 즉시 읽도록
 * `role="alert"`를 부여하며, `id`를 인풋의 `aria-describedby`와 연결해 사용합니다.
 * RHF에 의존하지 않는 순수 표시용 컴포넌트라 어떤 폼에서도 재사용할 수 있습니다.
 *
 * @example
 * ```tsx
 * <FieldError id="name-error" message={errors.name?.message} />
 * ```
 */
export default function FieldError({ id, message }: FieldErrorProps) {
  if (!message) return null;

  return (
    <p id={id} role="alert" className="typo-13-medium text-error">
      {message}
    </p>
  );
}
