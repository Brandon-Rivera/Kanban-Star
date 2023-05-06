// Funcion que recibe un id de usuario y devuelve su nombre de usuario (username)
export default function getUsername(user_id){
    const owners = JSON.parse(localStorage.getItem('owners'));
    if(typeof user_id === "number" && owners.data !== null && owners.data !== undefined){
        for (let i in owners.data) {
            if(owners.data[i].user_id === user_id){
                return owners.data[i].username;
            }
        }
    }
    else if(user_id === null || user_id === undefined){
        return '';
    }
}