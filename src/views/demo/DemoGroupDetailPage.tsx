"use client";

import { useParams, useRouter } from "next/navigation";
import {
  GroupDetailHero,
  GroupManageSection,
  GroupStatsCard,
} from "@/features/mypage/group-detail/ui";
import BackHeader from "@/shared/ui/back-header/BackHeader";
import Divider from "@/shared/ui/divider/Divider";
import EmptyState from "@/shared/ui/empty-state/EmptyState";
import { toast } from "@/shared/ui/feedback";
import { DEMO_GROUP_DETAILS } from "@/shared/mock/demoData";

const DEMO_RESTRICTED_MESSAGE = "데모에서는 그룹을 관리할 수 없어요";

export function DemoGroupDetailPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const router = useRouter();

  const group = Object.hasOwn(DEMO_GROUP_DETAILS, groupId)
    ? DEMO_GROUP_DETAILS[groupId]
    : undefined;

  const showRestricted = () => toast.warning(DEMO_RESTRICTED_MESSAGE);

  return (
    <div className="flex min-h-dvh flex-col">
      <BackHeader title="그룹 상세" />

      {!group ? (
        <EmptyState
          type="notice"
          message="그룹을 찾을 수 없어요"
          description="데모에서 관리할 수 없는 그룹이에요"
          className="flex-1"
        />
      ) : (
        <>
          <div className="flex flex-col gap-6 px-5 py-4">
            <GroupDetailHero
              name={group.name}
              role={group.role}
              openedAt={group.openedAt}
              onGoToDashboard={() => router.push(`/demo?group=${group.id}`)}
            />
            <GroupStatsCard memberCount={group.memberCount} productCount={group.productCount} />
          </div>

          <Divider className="h-2" />

          <GroupManageSection
            role={group.role}
            inviteCode={group.inviteCode}
            onEditName={showRestricted}
            onRemove={showRestricted}
          />
        </>
      )}
    </div>
  );
}
