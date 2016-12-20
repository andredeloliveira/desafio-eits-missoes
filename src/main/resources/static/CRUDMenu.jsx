import React from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { UpdateButton, RemoveButton, DetailsButton } from './CRUDButtons.jsx';

@connect((Store) => {
  return {
    login: Store.loginReducer,
  }
})
export class CRUDMenu extends React.Component {

  constructor(props) {
    super(props)
  }


  renderCustomButtons() {
    const { customButtons } = this.props;
    if (customButtons) {
      return customButtons.map((customButton, index) => {
        return(
            customButton
        )
      })
    } else {
      return null;
    }
  }

  isAdmin() {
    const currentUser = this.props.login.currentUser || cookie.load('currentUser');
    return currentUser.perfilAcesso === 'ADMINISTRADOR';
  }

  render() {
    const { remove, data, dispatch, name, find } = this.props;
    return (
      <div>
        {this.isAdmin() ? <UpdateButton name={name} data={data}/> : null}
        {name === 'usuarios' || !this.isAdmin() ? null : <RemoveButton actions={{remove: remove, find: find}} data={data} dispatch={dispatch} />}
        <DetailsButton name={name} data={data} />
        {this.renderCustomButtons()}
      </div>
    )
  }

}
