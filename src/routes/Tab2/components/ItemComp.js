import React, { PropTypes } from 'react'
import { ButtonToolbar, ButtonGroup, Button, Glyphicon, Modal, Tooltip, OverlayTrigger } from 'react-bootstrap'
import classes from './Item.scss'

export class ItemComp extends React.Component {

  static getTypeLabel(type) {
    let label = ''
    switch (type) {
      case 'zapas':
        label = 'Запас'
        break
      case 'invest':
        label = 'Инвест'
        break
      default:
        label = ' - '
    }
    return label
  }

  constructor(props) {
    super(props)
    this.state = { showModal: false }

    this.bindAll('confirmDelete', 'close', 'deleteYes')
  }

  bindAll(...methods) {
    methods.forEach((method) => {
      this[method] = this[method].bind(this)
    })
  }

  confirmDelete() {
    this.setState({ showModal: true })
  }

  close() {
    this.setState({ showModal: false })
  }

  deleteYes(id) {
    this.setState({ showModal: false })
    this.props.deleteItem(id)
  }

  render() {
    const item = this.props
    const tooltip = (
      <Tooltip id='modal-tooltip'>
        <strong>id: </strong>
        <span>{item.id}</span>
      </Tooltip>
    )

    return (
      <tr>
        <td className={classes.center}>{item.index}</td>
        <td>{ItemComp.getTypeLabel(item.type)}</td>
        <td>{item.name}</td>
        <td>{item.otchet}</td>
        <td>{item.summa}</td>
        <td>{item.otkl}</td>
        <th className={classes.thButton}>
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Подтверждение</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                <span>Удалить запись</span>
                <OverlayTrigger placement='top' overlay={tooltip}><a>"{item.name}"</a></OverlayTrigger>
                <span>?</span>
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.deleteYes(item.id)} bsStyle='danger'>Удалить</Button>
              <Button onClick={() => this.close()}>Отменить</Button>
            </Modal.Footer>
          </Modal>
          <ButtonGroup>
            <Button bsSize='sm' bsStyle='default' onClick={() => item.setActive(item.id)}>
              <Glyphicon glyph='glyphicon glyphicon-edit'/>
            </Button>
            <Button bsSize='sm' bsStyle='danger' onClick={() => this.confirmDelete(item)}>
              <Glyphicon glyph='glyphicon glyphicon-remove'/>
            </Button>
          </ButtonGroup>
        </th>
      </tr>
    )
  }
}

ItemComp.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['', 'zapas']).isRequired,
  name: PropTypes.string.isRequired,
  otchet: PropTypes.string.isRequired,
  summa: PropTypes.number.isRequired,
  otkl: PropTypes.number.isRequired,
  setActive: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
}

export default ItemComp
