import React from 'react'
import Helmet from 'react-helmet'
import { Grid, Row, Col } from 'react-bootstrap'
import ItemListCont from '../containers/ItemListCont'
import classes from './Tab2.scss'

export const Tab2 = () => (
  <div className={classes.Tab2}>
    <Helmet title='По виду'/>
    <h4>По виду</h4>

    <Grid>
      <Row>
        <Col xs={12} md={12} lg={12}>
          <ItemListCont filter='zapas'/>
        </Col>
      </Row>
    </Grid>

    {/*<a onClick={() => false} className='btn btn-default btn-fab btn-raised icon-material-share'></a>*/}

  </div>
)

export default Tab2
