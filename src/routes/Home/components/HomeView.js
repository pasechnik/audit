import React from 'react'
import Helmet from 'react-helmet'
import { ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import classes from './HomeView.scss'

export const HomeView = () => (
  <div>
    <Helmet title='Раб. док.'/>

    <Grid>
      <Row>
        <Col xs={12} md={6} lg={4}>
          <h4>Раб. док.</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6} lg={4}>
          <ListGroup>
            <LinkContainer to='/tab1'>
              <ListGroupItem>Ф. О.</ListGroupItem>
            </LinkContainer>
            <LinkContainer to='/tab2'>
              <ListGroupItem>По виду</ListGroupItem>
            </LinkContainer>
            <ListGroupItem>...</ListGroupItem>
            <LinkContainer to='/tab1'>
              <ListGroupItem>Исполнитель</ListGroupItem>
            </LinkContainer>
          </ListGroup>
        </Col>
      </Row>
    </Grid>
  </div>
)

export default HomeView
