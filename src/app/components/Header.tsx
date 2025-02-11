import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header: React.FC = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-0">
            <Container fluid>
                <Navbar.Brand href="/dashboard">Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="#">Profile</Nav.Link>
                        <Nav.Link href="#">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
