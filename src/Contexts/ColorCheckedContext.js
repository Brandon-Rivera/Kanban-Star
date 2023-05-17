import { createContext, useState, useEffect } from "react";

export const ColorCheckedContext = createContext(null);

const ColorCheckedContextProvider = ({ children }) => {

    //Estado del checkbox de cambio de tema.
    const [colorChecked, setColorChecked] = useState(() => {
        const savedState = JSON.parse(localStorage.getItem("ColorChecked"));
        return savedState ?? false;
    });

    useEffect(() => {
        localStorage.setItem("ColorChecked", JSON.stringify(colorChecked));
    }, [colorChecked]);

    return(
        <ColorCheckedContext.Provider value={{colorChecked, setColorChecked}}>
            {children}
        </ColorCheckedContext.Provider>
    )

}

export default ColorCheckedContextProvider;