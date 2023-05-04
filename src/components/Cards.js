import React, { useContext } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { ThemeContext } from '../Contexts/ThemeContext';
import './css/Cards.css'

function Cards({ nCard, duedate }) {

    const {theme} = useContext(ThemeContext)

    const buttonsTheme = () => {
		if(theme === "dark") {
			return theme;
		}
		else{
			return "primary";
		}
	}

    return (
        <ListGroup as="ol">
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start my-1">
                <div className="me-2">
                    <div className="fw-bold">{nCard}</div>
                    {duedate}
                </div>
                <Button variant={buttonsTheme()}>Menu</Button>
            </ListGroup.Item>
        </ListGroup>
    )
}

export default Cards