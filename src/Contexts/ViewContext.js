import { createContext, useState, useEffect } from 'react'

export const ViewContext = createContext(null);

const ViewContextProvider = ({children}) => {

    const [view, setView] = useState(() => {
        const savedState = JSON.parse(localStorage.getItem("View"));
        return savedState ?? "/board";
    });

    useEffect(() => {
        localStorage.setItem("View", JSON.stringify(view));
      }, [view]);

  return (
    <ViewContext.Provider value={{view, setView}}>
        {children}
    </ViewContext.Provider>
  )
}

export default ViewContextProvider;