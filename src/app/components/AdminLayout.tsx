import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Header from './Header'
import Sidebar from './Sidebar'

type LayoutProps = {
    children: React.ReactNode
}

const AdminLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            {/* ヘッダー */}
            <Header />
            <Container fluid>
                <Row>
                    {/* サイドバー */}
                    <Col md={2} className="bg-light vh-100 p-3">
                        <Sidebar />
                    </Col>

                    {/* メインコンテンツ */}
                    <Col md={10} className="p-4">
                        {children}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AdminLayout
