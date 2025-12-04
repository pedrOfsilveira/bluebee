export function useColorRisk(risk) {
  if (risk === "Baixo") return "color: rgb(76, 175, 79)";
  else if (risk === "Médio") return "color: #F4F189";
  else if (risk === "Alto") return "color: #E74C3C";
}

export function useColorPercentage(percentage) {
  if (percentage > 0) return "color: rgb(76, 175, 79)";
  else if (percentage < 0) return "color: #E74C3C";
}
