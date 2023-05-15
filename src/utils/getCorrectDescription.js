// Funcion que recibe la descripción de la tarjeta y le da el formato correcto
export default function getCorrectDescription(description) {
    if (description !== undefined && description !== null && typeof description === 'string') {
        if(description.substring(0, 3) === '<p>' && description.substring(description.length - 4, description.length) === '</p>'){
            return description.substring(3, description.length - 4);
        }
        return description;
    }
}