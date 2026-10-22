
"use client";

import { useMemo, useState } from "react";
import {
  MOCK_POLICIES,
  POLICY_CATEGORIES,
  FREQUENCY_LABELS,
  formatWon,
  getPolicyYearlyAmount,
  type BenefitPolicy,
} from "../../lib/benefitsMock";

type Region = "전체" | "서울" | "부산";

export default function BenefitsComparison() {
  const [region, setRegion] = useState<Region>("전체");
  const [category, setCategory] = useState("전체");
  const [age, setAge] = useState("");
  const [income, setIncome] = useState("");
  const [openedId, setOpenedId] = useState<string | null>(null);

  const ageNumber = age.trim() === "" ? null : Number(age);
  const incomeNumber = income.trim() === "" ? null : Number(income);

  const candidates = useMemo(() => {
    return MOCK_POLICIES.filter((p) => {
      if (category !== "전체" && p.category !== category) {
        return false;
      }

      if (
        ageNumber !== null &&
        (ageNumber < p.minAge || ageNumber > p.maxAge)
      ) {
        return false;
      }

      if (
        incomeNumber !== null &&
        p.maxIncome !== null &&
        incomeNumber > p.maxIncome
      ) {
        return false;
      }

      return true;
    });
  }, [category, ageNumber, incomeNumber]);

  const visiblePolicies = candidates.filter(
    (p) => region === "전체" || p.region === region
  );

  // 미검증 및 Mock 정책은 확정 혜택으로 합산하지 않음
  // 중복 수혜 제한 정보가 있으면 별도 검증 전까지 제외
  const totals = (["서울", "부산"] as const).map((name) => {
    const confirmed = candidates.filter(
      (p) =>
        p.region === name &&
        !p.isMock &&
        p.eligibilityStatus === "verified" &&
        p.amount !== null &&
        !p.exclusiveGroup
    );

    const annual = confirmed.reduce(
      (sum, p) => sum + (getPolicyYearlyAmount(p) ?? 0),
      0
    );

    const once = confirmed
      .filter((p) => p.frequency === "once")
      .reduce((sum, p) => sum + (p.amount ?? 0), 0);

    return {
      region: name,
      annual,
      once,
      count: confirmed.length,
    };
  });

  const hasConfirmed = totals.some((t) => t.count > 0);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <p className="text-sm font-bold tracking-widest text-blue-600">
          YOUTH BENEFITS
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          서울과 부산, 청년 혜택 비교
        </h1>
        <p className="mt-3 text-slate-600">
          나의 조건에 맞는 정책을 찾아보고
          부산 이주 시 달라지는 경제적 혜택을 살펴보세요.
        </p>
      </div>

      <div className="mb-8 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm leading-7 text-blue-900">
        <strong>정책 비교 데모</strong>
        <p>
          현재 정책명과 지원금은 모두 가상 데이터입니다.
          실제 지원 여부와 금액이 확인되지 않았으므로
          확정 혜택 합산에서는 제외합니다.
        </p>
      </div>

      {/* 서울·부산 비교 */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {totals.map((t) => (
          <div
            key={t.region}
            className={`rounded-2xl border p-6 ${
              t.region === "부산"
                ? "border-blue-200 bg-blue-50"
                : "border-slate-200 bg-white"
            }`}
          >
            <p className="text-sm text-slate-500">
              {t.region} 검증된 연간 혜택
            </p>
            <p className="mt-3 text-3xl font-bold text-blue-600">
              {t.count > 0 ? formatWon(t.annual) : "산정 전"}
            </p>
            <p className="mt-3 text-sm text-slate-500">
              일회성 혜택:{" "}
              {t.count > 0 ? formatWon(t.once) : "산정 전"}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold text-slate-900">
          서울·부산 예상 혜택 차이
        </h2>
        {hasConfirmed ? (
          <>
            <p className="mt-3 text-2xl font-bold text-blue-600">
              {formatWon(totals[1].annual - totals[0].annual)}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              부산 - 서울, 반복성 연간 혜택 기준.
              일회성 혜택은 별도 표시합니다.
            </p>
          </>
        ) : (
          <p className="mt-3 text-sm text-slate-500">
            아직 검증된 정책이 없어 차액을 산정하지 않았습니다.
          </p>
        )}
      </div>

      {/* 개인 조건 필터 */}
      <div className="mb-8 rounded-2xl border border-blue-100 bg-white p-6">
        <h2 className="mb-5 text-xl font-bold">
          나에게 맞는 정책 찾기
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <label className="text-sm font-medium text-slate-700">
            지역
            <select
              value={region}
              onChange={(e) =>
                setRegion(e.target.value as Region)
              }
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3"
            >
              <option value="전체">전체</option>
              <option value="서울">서울</option>
              <option value="부산">부산</option>
            </select>
          </label>

          <label className="text-sm font-medium text-slate-700">
            연령 (만 나이)
            <input
              type="number"
              min="0"
              max="100"
              placeholder="예: 27"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 p-3"
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            연 소득 (만원)
            <input
              type="number"
              min="0"
              placeholder="예: 3000"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 p-3"
            />
          </label>
        </div>

        <p className="mt-4 text-xs leading-6 text-slate-500">
          연령과 소득은 기본 조건만 확인합니다.
          주거 형태, 재산, 가구 소득 등 세부 자격은
          아직 검증되지 않았습니다.
        </p>
      </div>

      {/* 정책 분야 */}
      <div className="mb-6 flex flex-wrap gap-2">
        {POLICY_CATEGORIES.map((c: string) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold ${
              category === c
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-200 bg-white text-slate-700"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mb-4 text-sm text-slate-500">
        검색 결과 {visiblePolicies.length}개 · Mock 데이터
      </p>

      {/* 정책 카드 */}
      <div className="grid gap-4">
        {visiblePolicies.map((p: BenefitPolicy) => (
          <article
            key={p.id}
            className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  {p.region} · {p.category} · 가상 정책
                </span>
                <h3 className="mt-3 text-lg font-bold text-slate-900">
                  {p.title}
                </h3>
              </div>

              <div className="sm:text-right">
                <p className="text-2xl font-bold text-blue-600">
                  {formatWon(p.amount)}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {FREQUENCY_LABELS[p.frequency]} · 예시 금액
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              {p.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm text-amber-700">
                수혜 자격 미확인 · 합산 제외
              </span>
              <button
                type="button"
                aria-expanded={openedId === p.id}
                onClick={() =>
                  setOpenedId(openedId === p.id ? null : p.id)
                }
                className="rounded-xl border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-600"
              >
                {openedId === p.id ? "접기 ↑" : "상세 보기 →"}
              </button>
            </div>

            {openedId === p.id && (
              <div className="mt-5 border-t border-slate-100 pt-5">
                <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-slate-500">대상 연령</dt>
                    <dd className="font-semibold">
                      만 {p.minAge}~{p.maxAge}세
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">연 소득 예시</dt>
                    <dd className="font-semibold">
                      {p.maxIncome === null
                        ? "제한 정보 미설정"
                        : `${p.maxIncome.toLocaleString()}만원 이하`}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">지급 주기</dt>
                    <dd className="font-semibold">
                      {FREQUENCY_LABELS[p.frequency]}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">주관 기관</dt>
                    <dd className="font-semibold">{p.organization}</dd>
                  </div>
                </dl>

                <p className="mt-4 text-sm text-amber-700">
                  {p.exclusiveGroup
                    ? "중복 수혜 가능 여부 확인 필요"
                    : "중복 수혜 제한 정보 미확인"}
                </p>

                {p.applicationUrl && !p.isMock ? (
                  <a
                    href={p.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm font-bold text-blue-600"
                  >
                    공식 신청 페이지 ↗
                  </a>
                ) : (
                  <p className="mt-3 text-sm text-slate-500">
                    공식 신청 링크는 실제 정책 검증 후 연결됩니다.
                  </p>
                )}
              </div>
            )}
          </article>
        ))}

        {visiblePolicies.length === 0 && (
          <div className="rounded-2xl border bg-white p-8 text-center text-slate-500">
            조건에 맞는 정책 예시가 없습니다.
          </div>
        )}
      </div>
    </section>
  );
}
