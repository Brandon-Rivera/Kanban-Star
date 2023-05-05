// Funcion que recibe un nombre y lo acorta a 15 caracteres (en caso de ser necesario)
export default function getNameShort(name){
  if(typeof name === 'string'){
    const maxLength = 15;
    if (name.length >= maxLength) {
      name = name.substring(0, maxLength) + '...';
    }
    return name;
  }
  return '';
}