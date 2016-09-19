import React, { PropTypes } from 'react'
import { Table, Button, ButtonGroup, ButtonToolbar, Glyphicon } from 'react-bootstrap'
import { ItemComp } from '../components/ItemComp'
import { ItemForm } from '../components/ItemForm'
import classes from './Item.scss'

export const ItemListComp = (props) => (
  <div className='table-responsive'>

    <Table striped bordered condensed hover responsive>
      <thead>
      <tr>
        <th colSpan='7'>
          <ButtonToolbar>
            <ButtonGroup>
              <Button
                bsSize='sm' bsStyle='default' disabled={props.active === '0'}
                onClick={() => props.newActiveItem()}
              >
                Добавить
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button bsSize='sm' bsStyle='default' onClick={() => props.fetchData()}>
                Обновить
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </th>
      </tr>
      <tr>
        <th>#
        </th>
        <th>Тип</th>
        <th>Наименование</th>
        <th>Отчет</th>
        <th>Сумма</th>
        <th>Откл.</th>
        <th>Действия</th>
      </tr>
      </thead>
      <tbody>
      {
        props.items.map((item, index) => (
            item.id === props.active ?
              <ItemForm
                key={item.id}
                index={index + 1}
                clearActive={props.clearActive}
                saveItem={props.saveItem}
                {...item}
              /> :
              <ItemComp
                key={item.id}
                index={index + 1}
                setActive={props.setActive}
                deleteItem={props.deleteItem}
                {...item}
              />
          )
        )}
      </tbody>
      <tfoot>
      <tr>
        <th colSpan='6'>{' '}</th>
        <th>
          <ButtonGroup>
            <Button
              bsSize='sm' bsStyle='default' disabled={props.active === '0'}
              onClick={() => props.newActiveItem({ type: 'zapas' })}
            >
              <Glyphicon glyph='glyphicon glyphicon-plus'/>
            </Button>
          </ButtonGroup>
        </th>
      </tr>
      </tfoot>
    </Table>
  </div>
)

ItemListComp.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['', 'zapas']).isRequired,
    name: PropTypes.string.isRequired,
    otchet: PropTypes.string.isRequired,
    summa: PropTypes.number.isRequired,
    otkl: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  active: PropTypes.string,
  fetchData: PropTypes.func.isRequired,
  setActive: PropTypes.func.isRequired,
  clearActive: PropTypes.func.isRequired,
  saveItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  newActiveItem: PropTypes.func.isRequired,
}

export default ItemListComp
