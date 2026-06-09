export function getVerdictLabel(score: number): {
  label: string;
  tone: "excellent" | "good" | "fair" | "poor";
} {
  if (score >= 9) return { label: "Sangat Direkomendasikan", tone: "excellent" };
  if (score >= 8) return { label: "Direkomendasikan", tone: "good" };
  if (score >= 7) return { label: "Cukup Baik", tone: "fair" };
  return { label: "Pertimbangkan Alternatif", tone: "poor" };
}
