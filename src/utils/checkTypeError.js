export default function checkTypeError(data) {
    if (data !== undefined && data !== null) {
        return data;
    } else{
        return '';
    }
}