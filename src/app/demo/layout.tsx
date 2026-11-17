import Link from "next/link";
import FooterBase from "@/shared/ui/footer/base/FooterBase";

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="pb-[calc(4.75rem+env(safe-area-inset-bottom))]">{children}</div>
      <FooterBase className="flex items-center p-4">
        <Link
          href="/auth"
          className="block w-full rounded-full bg-primary-600 py-3 text-center typo-16-bold text-white"
        >
          로그인하여 시작하기
        </Link>
      </FooterBase>
    </>
  );
}
