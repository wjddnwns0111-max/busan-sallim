
export type Region = "서울" | "부산";

export type PolicyCategory =
  | "주거"
  | "취업"
  | "금융"
  | "교통"
  | "교육";

export type PaymentFrequency = "monthly" | "yearly" | "once";

export type EligibilityStatus =
  | "unverified"
  | "verified"
  | "ineligible";

export interface BenefitPolicy {
  id: string;
  region: Region;
  category: PolicyCategory;
  title: string;
  description: string;
  amount: number | null;
  frequency: PaymentFrequency;
  durationMonths?: number;
  minAge: number;
  maxAge: number;
  maxIncome: number | null;
  eligibilityStatus: EligibilityStatus;
  exclusiveGroup: string | null;
  organization: string;
  applicationUrl: string | null;
  isMock: boolean;
}

import {
  MOCK_POLICIES as rawPolicies,
  POLICY_CATEGORIES,
  FREQUENCY_LABELS,
} from "./benefitsMockData.js";

export const MOCK_POLICIES =
  rawPolicies as BenefitPolicy[];

export { POLICY_CATEGORIES, FREQUENCY_LABELS };

export function formatWon(amount: number | null): string {
  return amount === null
    ? "금액 확인 필요"
    : `${amount.toLocaleString("ko-KR")}원`;
}

export function getPolicyYearlyAmount(
  policy: BenefitPolicy
): number | null {
  if (policy.amount === null) return null;

  if (policy.frequency === "monthly") {
    return (
      policy.amount *
      Math.min(policy.durationMonths ?? 12, 12)
    );
  }

  if (policy.frequency === "yearly") {
    return policy.amount;
  }

  return null;
}
