
import type { Metadata } from "next";
import BenefitsComparison from "../../components/benefits/BenefitsComparison";

export const metadata: Metadata = {
  title: "청년 혜택 비교 | 무브산",
  description: "서울과 부산의 청년 정책 및 예상 혜택을 비교합니다.",
};

export default function BenefitsPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fc]">
      <BenefitsComparison />
    </main>
  );
}

