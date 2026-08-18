ReviewCard 배경에 깔릴 사용자 후기 사진을 이 폴더에 저장합니다.

권장 파일명: review-01.jpg (kebab-case + 2자리 넘버링)

사용: Reviews.tsx 에서 import 후 REVIEWS 항목의 image에 연결합니다.
예
import review01 from "@/features/landing/assets/reviews/review-01.jpg";
{ ..., image: review01 }
