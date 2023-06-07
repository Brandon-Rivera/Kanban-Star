// Funcion que recibe un id de usuario y devuelve su nombre de usuario (username)
export default function getUsername(user_id, dataOw) {
  if (
    typeof user_id === "number" &&
    dataOw.data !== null &&
    dataOw.data !== undefined
  ) {
    for (let i in dataOw.data) {
      if (dataOw.data[i].user_id === user_id) {
        return dataOw.data[i].username;
      }
    }
  } else if (user_id === null || user_id === undefined) {
    return "";
  }
}
