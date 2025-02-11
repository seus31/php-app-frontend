import React from 'react'
import { Nav } from 'react-bootstrap'

const Sidebar: React.FC = () => {
    return (
        <Nav defaultActiveKey="/admin/dashboard" className="flex-column">
            <Nav.Link href="/admin/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/admin/notes">Notes</Nav.Link>
            <Nav.Link href="#">Profile</Nav.Link>
        </Nav>
    )
}

export default Sidebar
