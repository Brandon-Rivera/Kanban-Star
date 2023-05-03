import React, { useContext } from 'react'
import { Container, Accordion, Button } from 'react-bootstrap';
import Cards from "./Cards.js"
import "./css/Workflow.css"
import { ThemeContext } from '../Contexts/ThemeContext.js';
import { useTranslation } from 'react-i18next';



function Workflow({ title, col }) {

  const {theme} = useContext(ThemeContext);
  const [t] = useTranslation("global");

  const buttonsTheme = () => {
		if(theme === "dark") {
			return theme;
		}
		else{
			return "primary";
		}
	}

  return (
    <>
      <Container fluid="xs">
        <Accordion alwaysOpen >
          <Accordion.Item eventKey="0">
            <Accordion.Header>{title}</Accordion.Header>
            <Accordion.Body className='acc-body'>
              {col.mycards.map(col => (
                <Cards nCard={col.name} duedate={col.duedate}></Cards>
              ))
              }
              <Button variant={buttonsTheme()} className='d-flex w-100 text-center'>{t("cards.add")}</Button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  )
}

export default Workflow

