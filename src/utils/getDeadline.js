// Funcion que recibe una fecha y la devuelve con el formato correcto para el modal de consulta
function getDeadline(date) {
  if (date !== null && date !== undefined && date !== "") {
    return date.substring(1, 11);
  }
  return "";
}

export default getDeadline;