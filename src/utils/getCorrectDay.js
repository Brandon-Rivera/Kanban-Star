// Funcion que recibe una fecha y la devuelve con el formato correcto para la API
export default function getCorrectDate(date){
    if(date === null){
        return null;
    } else{
        date += "T23:59:59.727Z";
    }
    return date;
}