
"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const fields = [
    "seoulSalary",
    "busanSalary",
    "seoulRent",
    "busanRent",
    "seoulLiving",
    "busanLiving",
  ];

  const valid = fields.every((key) => {
    const value = searchParams.get(key);
    return (
      value !== null &&
      value.trim() !== "" &&
      Number.isFinite(Number(value)) &&
      Number(value) >= 0
    );
  });

  if (!valid) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          계산 정보가 없습니다
        </h1>
        <p className="mt-3 text-slate-500">
          메인 페이지에서 서울과 부산의 금액을 입력해 주세요.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 rounded-full bg-blue-600 px-7 py-3 font-semibold text-white"
        >
          계산기로 돌아가기
        </button>
      </main>
    );
  }

  const get = (key: string) => Number(searchParams.get(key));

  const seoulSalary = get("seoulSalary");
  const busanSalary = get("busanSalary");
  const seoulRent = get("seoulRent");
  const busanRent = get("busanRent");
  const seoulLiving = get("seoulLiving");
  const busanLiving = get("busanLiving");

  const seoulExpenses = seoulRent + seoulLiving;
  const busanExpenses = busanRent + busanLiving;

  const seoulRemain = seoulSalary - seoulExpenses;
  const busanRemain = busanSalary - busanExpenses;

  const monthlyDifference = busanRemain - seoulRemain;
  const yearlyDifference = monthlyDifference * 12;

  const format = (value: number) =>
    value.toLocaleString("ko-KR", {
      maximumFractionDigits: 2,
    });

  const maxBar = Math.max(
    Math.abs(seoulRemain),
    Math.abs(busanRemain),
    1
  );

  const resultMessage =
    monthlyDifference > 0
      ? "부산에서 매달 더 많은 금액이 남을 것으로 예상돼요."
      : monthlyDifference < 0
      ? "현재 입력 조건에서는 서울에서 더 많은 금액이 남아요."
      : "서울과 부산의 예상 월 잔여금이 같아요.";

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-12">
      <div className="mx-auto max-w-5xl">
        {/* 페이지 제목 */}
        <div className="mb-9 text-center">
          <p className="mb-2 text-sm font-bold text-blue-600">
            MOVESAN · 생활비 비교 결과
          </p>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            서울 vs 부산, 얼마나 차이 날까요?
          </h1>
          <p className="mt-3 text-slate-500">
            입력한 월급과 지출을 기준으로 예상 잔여금을 비교했어요.
          </p>
        </div>

        {/* 월 잔여금 비교 카드 */}
        <div className="grid gap-5 md:grid-cols-2">
          <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              ⚪ 서울 · 월 잔여금
            </p>
            <p className="mt-3 text-4xl font-bold text-slate-900">
              {format(seoulRemain)}
              <span className="ml-2 text-lg font-medium">만원</span>
            </p>
            <div className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">세후 월급</span>
                <span>{format(seoulSalary)}만원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">월세</span>
                <span>-{format(seoulRent)}만원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">생활비</span>
                <span>-{format(seoulLiving)}만원</span>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-blue-200 bg-blue-50 p-7 shadow-sm">
            <p className="text-sm font-semibold text-blue-600">
              🔵 부산 · 월 잔여금
            </p>
            <p className="mt-3 text-4xl font-bold text-blue-700">
              {format(busanRemain)}
              <span className="ml-2 text-lg font-medium">만원</span>
            </p>
            <div className="mt-6 space-y-3 border-t border-blue-100 pt-5 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">세후 월급</span>
                <span>{format(busanSalary)}만원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">월세</span>
                <span>-{format(busanRent)}만원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">생활비</span>
                <span>-{format(busanLiving)}만원</span>
              </div>
            </div>
          </section>
        </div>

        {/* 핵심 결과 */}
        <section className="mt-6 rounded-3xl bg-white p-7 text-center shadow-sm md:p-10">
          <p className="text-sm font-semibold text-slate-500">
            부산 이주 시 예상 월 잔여금 차이
          </p>

          <p
            className={`mt-3 text-4xl font-extrabold md:text-5xl ${
              monthlyDifference >= 0
                ? "text-blue-600"
                : "text-rose-600"
            }`}
          >
            {monthlyDifference > 0 ? "+" : ""}
            {format(monthlyDifference)}만원
          </p>

          <p className="mt-3 text-slate-600">{resultMessage}</p>

          <div className="mx-auto mt-7 max-w-md rounded-2xl bg-blue-50 px-5 py-5">
            <p className="text-sm text-slate-500">
              1년 기준 예상 잔여금 차이
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {yearlyDifference > 0 ? "+" : ""}
              {format(yearlyDifference)}만원
            </p>
          </div>
        </section>

        {/* 잔여금 비교 그래프 */}
        <section className="mt-6 rounded-3xl bg-white p-7 shadow-sm md:p-9">
          <h2 className="text-xl font-bold text-slate-900">
            월 잔여금 비교
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            막대 길이는 잔여금의 절댓값 기준이며, 음수는 적자를 뜻해요.
          </p>

          <div className="mt-8 space-y-7">
            {[
              {
                name: "서울",
                value: seoulRemain,
                color: "bg-slate-400",
              },
              {
                name: "부산",
                value: busanRemain,
                color: "bg-blue-600",
              },
            ].map((city) => (
              <div key={city.name}>
                <div className="mb-2 flex justify-between text-sm font-semibold">
                  <span>{city.name}</span>
                  <span>
                    {format(city.value)}만원
                    {city.value < 0 ? " (적자)" : ""}
                  </span>
                </div>

                <div className="h-5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${city.color}`}
                    style={{
                      width: `${
                        (Math.abs(city.value) / maxBar) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 안내 및 돌아가기 */}
        <div className="mt-7 text-center">
          <p className="mb-5 text-xs leading-6 text-slate-500">
            이 결과는 입력한 월급·월세·생활비만 반영한 단순 추정치입니다.
            <br />
            이사 초기 비용, 보증금, 청년 정책 혜택 등은 포함되지 않았습니다.
          </p>

          <button
            onClick={() => router.push("/")}
            className="rounded-full bg-blue-600 px-9 py-3 font-bold text-white shadow-md transition hover:bg-blue-700"
          >
            ← 다시 계산하기
          </button>
        </div>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <main className="p-12 text-center text-slate-500">
          결과를 불러오는 중...
        </main>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
