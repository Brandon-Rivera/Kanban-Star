import React from 'react'
import "./Workspace.css"
import { useTranslation } from "react-i18next";


export const Workspace = () => {
  const [t] = useTranslation("global");

  return (
    <div>{t("workspace.workspace")}</div>
  )
}

export default Workspace