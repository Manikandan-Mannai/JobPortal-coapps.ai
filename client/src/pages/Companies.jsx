import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'


const Companies = () => {
    const [companiesData, setCompaniesData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:5000/companies")
            .then(result => {
                console.log(result);
                setCompaniesData(result.data)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                setError("Error fetching data.")
                console.log(err);
            })

    }, [])
    return (
        <Container>
            <h1>Companies</h1>
            {loading ? (
                <LoadingMessage>Loading...</LoadingMessage>
            ) : error ? (
                <ErrorMessage>{error}</ErrorMessage>
            ) : (
                companiesData.map(data => (
                    <CompanyContainer key={data._id}>
                        <Flex>
                            <CompanyName>{data.companyName}</CompanyName>
                            <ContactInfo>Contact: {data.email}</ContactInfo>
                        </Flex>
                    </CompanyContainer>
                ))
            )}
        </Container>
    )
}

export default Companies

const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    padding: 20px 100px;
    background-color: #F7FDFD;
`

const CompanyContainer = styled.div`
    background-color: #FFFFFF;
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const CompanyName = styled.h2`
    color: #333;
`

const ContactInfo = styled.p`
    color: #666;
`

const LoadingMessage = styled.p`
    color: #333;
`

const ErrorMessage = styled.p`
    color: #ff0000;
`
