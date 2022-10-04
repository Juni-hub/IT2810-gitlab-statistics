import React, { useContext } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ThemeContext } from '../context/ThemeContext';
import { getFormValues } from './utils';

interface IFormInputValues {
    repo: string;
    token?: string;
}

/** 
* Functional component that returns navigation-component(navbar)
*/
export default function Navigation() {
    
    const [values, setValues] = React.useState<IFormInputValues>(getFormValues);
    const { theme } = useContext(ThemeContext);

	React.useEffect(() => {
		localStorage.setItem('form', JSON.stringify(values));
	}, [values]);

    /** 
    * Function that handles refresh of page. The repo and token is collected from localstorage
    */
	function handleRefresh() {
        const repos = JSON.parse(localStorage.getItem('repos') || '[]');
        repos.push(values.repo);
        localStorage.setItem('repos', JSON.stringify(repos));
        window.location.reload();
	}

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		alert('An error occurred on the server. Please try again!!!');
	}

    /** 
    * Function that handles change in form
    * 
    * @param event
    */
	function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setValues((previousValues) => ({
			...previousValues,
			[event.target.name]: event.target.value,
		}));
	}

    /** 
    * Function that clears the values in the form and localstorage
    */
    function clearValues() {
        localStorage.removeItem('form');
    }

    return (
        <Navbar className="p-4 pl-4" bg={theme} variant={theme} expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">Gitlab Statistics</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                className="me-auto my-3 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
                >
                    <Nav.Link href="/">Homepage</Nav.Link>
                    <Nav.Link href="issues">Issues</Nav.Link>
                    <Nav.Link href="commits">Commits</Nav.Link>
                    <Nav.Link href="chart">Chart</Nav.Link>
                    <Nav.Link href="settings">Settings</Nav.Link>
                </Nav>
                    <Form onSubmit={handleSubmit} className="d-sm-flex">
                        <Form.Control
                        type="text"
                        placeholder="Repo"
                        className="me-4 my-2"
                        aria-label="repo"
                        name="repo"
                        data-testid="repo"
                        onChange={handleChange}
                        value={values.repo}
                        />
                        <Form.Control
                        type="text"
                        placeholder="Token"
                        className="me-4 my-2"
                        aria-label="Token"
                        name="token"
                        data-testid="token"
                        onChange={handleChange}
                        value={values.token}
                        />
                        <Button data-testid = "getRepository" className="me-2" onClick={handleRefresh} variant="outline-success">Get repository</Button>
                        <Button data-testid = "clearValues" onClick={clearValues} variant="outline-success">Clear selection</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
