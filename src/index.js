import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//Importación de contextos
import i18next from "./i18n";
import { I18nextProvider } from "react-i18next";
import ThemeContextProvider from "./Contexts/ThemeContext";
import LanguageCheckedContextProvider from "./Contexts/LanguageCheckedContext";
import ColorCheckedContextProvider from "./Contexts/ColorCheckedContext";
import ViewContextProvider from "./Contexts/ViewContext";
import ViewCheckedContextProvider from "./Contexts/ViewCheckedContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      {
        <ViewContextProvider>
          {
            <LanguageCheckedContextProvider>
              {
                <ColorCheckedContextProvider>
                  {
                    <ViewCheckedContextProvider>
                      {
                        <I18nextProvider i18n={i18next}>
                          <App />
                        </I18nextProvider>
                      }
                    </ViewCheckedContextProvider>
                  }
                </ColorCheckedContextProvider>
              }
            </LanguageCheckedContextProvider>
          }
        </ViewContextProvider>
      }
    </ThemeContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
