import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { actions } from '../modules/Tab1'
import { ItemListComp } from '../components/ItemListComp'

class ItemListCont extends Component {

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData()
    }
  }

  fetchData() {
    const { filter, fetchItems } = this.props
    fetchItems(filter)
  }

  render() {
    return (
      <ItemListComp
        {...this.props}
      />
    )
  }
}

ItemListCont.propTypes = {
  filter: PropTypes.oneOf(['all', 'zapas', 'invest']).isRequired,
  active: PropTypes.string,
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
  setActive: PropTypes.func.isRequired,
  clearActive: PropTypes.func.isRequired,
  saveItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  newActiveItem: PropTypes.func.isRequired,
}

const mapStateToProps = (state, params) => {
  const filter = (params && params.filter) || 'all'
  return {
    isFetching: false,
    // isFetching: getIsFetching(state, filter),
    // errorMessage: getErrorMessage(state, filter),
    // items: getVisibleTodos(state, filter),
    active: state.tab1.active,
    items: state.tab1.items,
    filter,
  }
}

export default withRouter(connect(
  mapStateToProps,
  actions,
)(ItemListCont))
