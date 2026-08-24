type GroupStatsCardProps = {
  memberCount: number;
  postCount: number;
  savedCount: number;
};

/**
 * 그룹 상세 페이지의 통계 카드입니다. 멤버 수·공유 글 수·저장 수를 3열로 보여줍니다.
 *
 * @example
 * ```tsx
 * <GroupStatsCard
 *   memberCount={memberCount}
 *   postCount={postCount}
 *   savedCount={savedCount}
 * />
 */
export default function GroupStatsCard({
  memberCount,
  postCount,
  savedCount,
}: GroupStatsCardProps) {
  const stats = [
    { label: "멤버", value: memberCount },
    { label: "공유 글", value: postCount },
    { label: "저장", value: savedCount },
  ];

  return (
    <dl className="grid grid-cols-3 divide-x divide-gray-200 rounded-2xl border border-gray-200 py-5">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse items-center gap-1">
          <dt className="typo-14-medium text-gray-500">{stat.label}</dt>
          <dd className="typo-24-bold">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
