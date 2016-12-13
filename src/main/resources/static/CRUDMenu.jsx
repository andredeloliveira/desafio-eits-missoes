import React from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { UpdateButton, RemoveButton, DetailsButton } from './CRUDButtons.jsx';

export class CRUDMenu extends React.Component {

  constructor(props) {
    super(props)
  }

  isAdmin() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
    if (currentUser.perfilAcesso === 'ADMINISTRADOR') {
      return true;
    } else {
      return false;
    }
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

  render() {
    const { remove, data, dispatch, name, find } = this.props;
    return (
      <div>
        {this.isAdmin() ? <UpdateButton name={name} data={data}/>: null}
        {this.isAdmin() ? <RemoveButton actions={{remove: remove, find: find}} data={data} dispatch={dispatch} /> : null}
        <DetailsButton name={name} data={data} />
        {this.renderCustomButtons()}
      </div>
    )
  }

}
