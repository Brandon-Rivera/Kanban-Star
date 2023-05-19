import React, { createContext, useEffect, useState } from 'react'

export const ViewCheckedContext = createContext(null);

const ViewCheckedContextProvider = ({children}) => {

    const [viewChecked, setViewChecked] = useState(() => {
        const savedState = JSON.parse(localStorage.getItem("ViewChecked"));
        return savedState ?? false;
    });

    useEffect(() => {
        localStorage.setItem("ViewChecked", JSON.stringify(viewChecked));
    }, [viewChecked]);

  return (
    <ViewCheckedContext.Provider value={{viewChecked, setViewChecked}}>
        {children}
    </ViewCheckedContext.Provider>
  )
}

export default ViewCheckedContextProvider;