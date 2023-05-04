import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext(null);

const ThemeContextProvider = ({children}) => {

    //Estado del tema de la aplicación
    const [theme, setTheme] = useState(() => {
        const savedState = JSON.parse(localStorage.getItem("Theme"));
        return savedState ?? false;
      });
    
      const toggleTheme = () => {
        if (theme === "light") setTheme("dark");
        else setTheme("light");
      };
    
      useEffect(() => {
        localStorage.setItem("Theme", JSON.stringify(theme));
      }, [theme]);

      return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
      );
}

export default ThemeContextProvider;