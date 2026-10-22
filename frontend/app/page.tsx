
import Link from "next/link";
import LivingCostCalculator from "../components/LivingCostCalculator";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f7fc]">
      {/* 메인 배너: 광안대교 이미지는 나중에 추가 */}
      <section className="bg-gradient-to-b from-[#edf5ff] via-[#c6def8] to-[#f4f7fc]">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-14">
          <div className="mb-7">
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-blue-600">
              MOVESAN
            </p>

            <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
              같은 월급, 부산에서는
              <span className="block text-blue-600">
                얼마나 더 남을까?
              </span>
            </h1>

            <p className="mt-4 text-sm text-slate-600">
              서울과 부산의 월급·월세·생활비를 비교해
              1년에 얼마나 더 모을 수 있는지 알려드려요.
            </p>
          </div>

          {/* 생활비 비교 계산기 */}
          <LivingCostCalculator />

          {/* 하단 바로가기 카드 */}
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Link
              href="/neighborhood"
              className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <h3 className="font-bold text-slate-900">
                🗺️ 부산 동네별 월세 지도
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                구·군별 월세 정보를 한눈에 확인해 보세요.
              </p>
            </Link>

            <Link
              href="/benefits"
              className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <h3 className="font-bold text-slate-900">
                🏦 청년 정책·금융상품
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                부산에서 받을 수 있는 청년 혜택을 찾아보세요.
              </p>
            </Link>

            <Link
              href="/community"
              className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <h3 className="font-bold text-slate-900">
                💬 무브산 커뮤니티
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                먼저 부산으로 옮긴 사람들의 이야기를 나눠요.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
