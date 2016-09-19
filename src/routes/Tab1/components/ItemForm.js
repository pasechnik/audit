import React, { PropTypes } from 'react'
import { ButtonToolbar, ButtonGroup, Button, Glyphicon, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import cx from 'classnames'
import classes from './Item.scss'
import ItemComp from './ItemComp'


export const FieldGroup = ({ id, validationState, ...props }) => (
  <FormGroup
    controlId={id}
    validationState={validationState}
  >
    <FormControl {...props} />
  </FormGroup>)

FieldGroup.propTypes = {
  id: PropTypes.string.isRequired,
  validationState: PropTypes.string,
}

export class ItemForm extends React.Component {

  constructor(props) {
    super(props)
    const { index, id, type, name, otchet, summa, otkl } = this.props
    this.state = { item: { index, id, type, name, otchet, summa, otkl } }

    this.bindAll('getValidationState', 'saveItem', 'handleChange')
  }

  getValidationState(field) {
    const item = this.state.item
    let result = ''
    switch (field) {
      case 'type':
        result = item.type === 'zapas' || item.type === 'invest' ? 'success' : 'error'
        break
      case 'name':
        result = item.name.length ? 'success' : 'error'
        break
      case 'otchet':
        result = item.otchet.length ? 'success' : 'error'
        break
      case 'summa':
        result = isNaN(item.summa) ? 'error' : 'success'
        break
      case 'otkl':
        result = isNaN(item.otkl) ? 'error' : 'success'
        break
      default:
    }

    return result
  }

  bindAll(...methods) {
    methods.forEach((method) => {
      this[method] = this[method].bind(this)
    })
  }

  handleChange(e) {
    const item = this.state.item
    item[e.target.name] = e.target.datatype === 'number' ? parseFloat(e.target.value) : e.target.value
    this.setState({ item })
  }

  saveItem() {
    this.props.saveItem(this.state.item)
  }

  render() {
    let { index, clearActive } = this.props
    let { id, type, name, otchet, summa, otkl } = this.state.item

    return (
      <tr>
        <td className={classes.center}>{index}</td>
        <td>
          <FormGroup
            controlId='formItemType'
            validationState={this.getValidationState('type')}
          >
            <FormControl
              name='type'
              componentClass='select'
              placeholder='Выберите тип'
              value={type}
              onChange={this.handleChange}
            >
              <option value=''>Выберите...</option>
              <option value='zapas'>{ItemComp.getTypeLabel('zapas')}</option>
              <option value='invest'>{ItemComp.getTypeLabel('invest')}</option>
            </FormControl>
          </FormGroup>
        </td>
        <td>
          <FieldGroup
            id='formItemName'
            name='name'
            type='text'
            placeholder='Наименование'
            value={name}
            onChange={this.handleChange}
            validationState={this.getValidationState('name')}
          />
        </td>
        <td>
          <FieldGroup
            id='formItemOtchet'
            type='text'
            name='otchet'
            placeholder='Отчет'
            value={otchet}
            onChange={this.handleChange}
            validationState={this.getValidationState('otchet')}
          />
        </td>
        <td>
          <FieldGroup
            id='formItemSumma'
            type='text'
            name='summa'
            placeholder='Сумма'
            value={summa}
            onChange={this.handleChange}
            validationState={this.getValidationState('summa')}
          />
        </td>
        <td>
          <FieldGroup
            id='formItemOtkl'
            type='text'
            name='otkl'
            placeholder='Откл.'
            value={otkl}
            onChange={this.handleChange}
            validationState={this.getValidationState('otkl')}
          />
        </td>
        <th className={classes.thButton}>
            <ButtonGroup>
              <Button bsSize='sm' bsStyle='primary' onClick={this.saveItem}>
                <Glyphicon glyph='glyphicon glyphicon-ok'/>
              </Button>
              <Button bsSize='sm' bsStyle='default' onClick={() => this.props.clearActive()}>
                <Glyphicon glyph='glyphicon glyphicon-repeat'/>
              </Button>
            </ButtonGroup>
        </th>
      </tr>
    )
  }
}

ItemForm.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['', 'zapas', 'invest']).isRequired,
  name: PropTypes.string.isRequired,
  otchet: PropTypes.string.isRequired,
  summa: PropTypes.number.isRequired,
  otkl: PropTypes.number.isRequired,
  clearActive: PropTypes.func.isRequired,
  saveItem: PropTypes.func.isRequired,
}

export default ItemForm
