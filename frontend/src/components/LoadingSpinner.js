import React from 'react'
import { Spinner, Row, Col } from 'react-bootstrap'

function LoadingSpinner () {
  return (
    <Row className="justify-content-center my-5">
      <Col xs="auto">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2 text-center">Loading files...</p>
      </Col>
    </Row>
  )
}

export default LoadingSpinner