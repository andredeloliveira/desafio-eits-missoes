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
    const { remove, data, dispatch } = this.props;
    console.log(dispatch)
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
      >
        <UpdateButton />
        <RemoveButton action={remove} data={data} dispatch={dispatch}/>
        <DetailsButton />
        {this.renderCustomButtons()}
      </IconMenu>
    )
  }

}
