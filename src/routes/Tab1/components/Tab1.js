import React from 'react'
import Helmet from 'react-helmet'
import { Grid, Row, Col } from 'react-bootstrap'
import ItemListCont from '../containers/ItemListCont'
import classes from './Tab1.scss'

export const Tab1 = () => (
  <div className={classes.Tab1}>
    <Helmet title='Ф. О.'/>
    <h4>Ф. О.</h4>

    <Grid>
      <Row>
        <Col xs={12} md={12} lg={12}>
          <ItemListCont filter='all'/>
        </Col>
      </Row>
    </Grid>

    {/*<a onClick={() => false} className='btn btn-default btn-fab btn-raised icon-material-share'></a>*/}

  </div>
)

export default Tab1
