export function useReturnObjectDate(data) {
  let objectDate = {};
  let newDate = new Date();
  if (data.getFullYear() < newDate.getFullYear()) {
    objectDate.data = data.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } else
    objectDate.data = data.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
    });
  objectDate.tempo = data.toLocaleTimeString("pt-BR");
  return objectDate;
}
