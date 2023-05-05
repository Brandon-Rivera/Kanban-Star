import { createContext, useState, useEffect } from "react";

export const LanguageCheckedContext = createContext(null);

const LanguageCheckedContextProvider = ({children}) => {
    //Estado del checkbox de cambio de idioma.
  //Recuperamos el estado del Local Storage para que se mantenga así después de renderizar de nuevo el componente.
  const [LanguageChecked, setLanguageChecked] = useState(() => {
    const savedState = JSON.parse(localStorage.getItem('LanguageChecked'));
    return savedState ?? false;
  });

  //Función para guardar el estado del checkbox en el Local Storage, para que se mantenga.
  useEffect(() => {
    localStorage.setItem('LanguageChecked', JSON.stringify(LanguageChecked));
  }, [LanguageChecked]);

  return(
    <LanguageCheckedContext.Provider value={{LanguageChecked, setLanguageChecked}}>
        {children}
    </LanguageCheckedContext.Provider>
  )
}

export default LanguageCheckedContextProvider;