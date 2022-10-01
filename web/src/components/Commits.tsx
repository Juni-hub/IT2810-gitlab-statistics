import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import { getAllCommitsFromApi } from '../api/apiservice';
import { Commit } from "../api/types";
import { formatDateAndTime } from "./utils";
import { Card, Col, Row } from 'antd';

export default function Commits() {
    
    const [commits, setCommit] = useState<Commit[] | null>(null);

    useEffect(() => {
        getAllCommitsFromApi().then((res) => {
            setCommit(res);
        });
    }, []);
    
    const body: any = []
    
    commits?.forEach(el => {
        body.push(
            <Col xs={24} md={12} xl={8} className="mb-4">
                <Card title={el.id}>
                    <p>Author_name: {el.author_name? el.author_name : "Not provided"}</p>
                    <p>Author_email: {el.author_email? el.author_email : "Not provided"}</p>
                    <p>Authored_date: {el.authored_date? formatDateAndTime(el.authored_date) : "Not provided"}</p>
                    <p>Committed_date: {el.committed_date? formatDateAndTime(el.committed_date) : "Not provided"}</p>
                    <p>Message: {el.message? el.message : "Not provided"}</p>
                </Card>
            </Col>
        )     
    })

    return (
        <Container fluid>
            <div>
                <h3 className="pt-4 pb-4 text-center">Alle commits i main</h3>
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        {body}
                    </Row>
                </div>
            </div>
        </Container>
    );
}