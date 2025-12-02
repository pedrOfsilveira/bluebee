export function useColorRisk(risk) {
  if (risk === "Baixo") return "color: #71F588";
  else if (risk === "Médio") return "color: #F4F189";
  else if (risk === "Alto") return "color: #F5786F";
}

export function useColorPercentage(percentage) {
  if (percentage > 0) return "color: #71F588";
  else if (percentage < 0) return "color: #F5786F";
}
