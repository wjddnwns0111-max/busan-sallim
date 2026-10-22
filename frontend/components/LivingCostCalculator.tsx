
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LivingCostCalculator() {
  const router = useRouter();

  const [seoulSalary, setSeoulSalary] = useState("");
  const [busanSalary, setBusanSalary] = useState("");
  const [seoulRent, setSeoulRent] = useState("");
  const [busanRent, setBusanRent] = useState("");
  const [seoulLiving, setSeoulLiving] = useState("");
  const [busanLiving, setBusanLiving] = useState("");

  // 서울 생활비 변경 시 부산 생활비 94.9% 자동 적용
  const handleSeoulLivingChange = (value: string) => {
    setSeoulLiving(value);

    if (value === "") {
      setBusanLiving("");
    } else {
      const calculated = Number(value) * 0.949;
      setBusanLiving(String(Math.round(calculated * 100) / 100));
    }
  };

  // 입력값 초기화
  const reset = () => {
    setSeoulSalary("");
    setBusanSalary("");
    setSeoulRent("");
    setBusanRent("");
    setSeoulLiving("");
    setBusanLiving("");
  };

  // 결과 페이지로 이동
  const handleViewResult = () => {
    const values = [
      seoulSalary,
      busanSalary,
      seoulRent,
      busanRent,
      seoulLiving,
      busanLiving,
    ];

    // 모든 입력값이 0 이상의 유효한 숫자인지 확인
    const isInvalid = values.some(
      (value) =>
        value.trim() === "" ||
        !Number.isFinite(Number(value)) ||
        Number(value) < 0
    );

    if (isInvalid) {
      alert("서울과 부산의 모든 금액을 0 이상의 숫자로 입력해 주세요.");
      return;
    }

    const params = new URLSearchParams({
      seoulSalary,
      busanSalary,
      seoulRent,
      busanRent,
      seoulLiving,
      busanLiving,
    });

    router.push(`/result?${params.toString()}`);
  };

  // 공통 입력 필드
  const field = (
    label: string,
    value: string,
    onChange: (value: string) => void,
    placeholder: string
  ) => (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>

      <div className="flex items-center rounded-xl border border-slate-200 bg-white px-3">
        <input
          type="number"
          min="0"
          step="any"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full min-w-0 py-3 text-sm text-slate-900 outline-none"
        />

        <span className="ml-2 text-sm text-slate-500">만원</span>
      </div>
    </label>
  );

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg md:p-8">
      {/* 계산기 제목 */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900">
          생활비 비교 계산기
        </h3>

        <button
          type="button"
          onClick={reset}
          className="rounded-full border border-blue-100 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
        >
          ↻ 초기화
        </button>
      </div>

      {/* 서울 / 부산 입력 영역 */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* 서울 */}
        <div className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h4 className="font-bold text-slate-900">
            ⚪ 서울
            <span className="ml-2 text-xs font-normal text-slate-500">
              지금 살고 있는 곳
            </span>
          </h4>

          {field(
            "세후 월급",
            seoulSalary,
            setSeoulSalary,
            "예) 380"
          )}

          {field(
            "월세 (주거비)",
            seoulRent,
            setSeoulRent,
            "예) 90"
          )}

          {field(
            "생활비 (식비, 통신비 등)",
            seoulLiving,
            handleSeoulLivingChange,
            "예) 120"
          )}
        </div>

        {/* 부산 */}
        <div className="space-y-5 rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <h4 className="font-bold text-slate-900">
            🔵 부산
            <span className="ml-2 text-xs font-normal text-slate-500">
              이사하려는 곳
            </span>
          </h4>

          {field(
            "세후 월급",
            busanSalary,
            setBusanSalary,
            "예) 420"
          )}

          {field(
            "월세 (주거비)",
            busanRent,
            setBusanRent,
            "예) 55"
          )}

          {field(
            "생활비 (자동 계산 · 직접 수정 가능)",
            busanLiving,
            setBusanLiving,
            "서울 생활비 입력 시 자동 계산"
          )}

          <p className="text-xs text-blue-600">
            서울 생활비의 94.9%를 자동 적용합니다.
            부산 생활비를 직접 수정해도 서울 값은 바뀌지 않아요.
          </p>
        </div>
      </div>

      {/* 결과 보기 버튼 */}
      <div className="mt-7 text-center">
        <button
          type="button"
          onClick={handleViewResult}
          className="rounded-full bg-blue-600 px-9 py-3 font-bold text-white shadow-md transition hover:bg-blue-700"
        >
          결과 보기 →
        </button>

        <p className="mt-3 text-xs text-slate-400">
          금액은 모두 월 기준, 만원 단위로 입력해 주세요.
        </p>
      </div>
    </div>
  );
}
