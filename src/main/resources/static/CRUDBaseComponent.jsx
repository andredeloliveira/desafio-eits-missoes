import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Table, Column, Cell } from 'fixed-data-table';
import { NewEntryDialog } from './NewEntryDialog.jsx';
import { DataTableAirplane } from './DataTableAirplane.jsx';
import { DataTableUser } from './DataTableUser.jsx';
import { DataTableMission } from './DataTableMission.jsx';
import { browserHistory } from 'history'

//TODO(andredeloliveira): THis component won't be a dumb one. Many actions will happen in here.
export class CRUDBaseComponent extends React.Component {

  constructor(props) {
    super(props);
    this.canCreate = this.canCreate.bind(this);
  }

  //this method will decide which DataTable Component to render
  fetchedDataContainerRender() {
    const { name, data } = this.props;
    if (name === 'airplane') {
      return <DataTableAirplane data={data} name={name} />
    } else if (name === 'user') {
      return <DataTableUser data={data} name={name} />
    } else if (name === 'mission') {
      return <DataTableMission data={data} name={name} />;
    }
  }
  //Opens a new Entry dialog, that is a dependency of this component.
  redirectPage() {
    console.log(this.props.history)
  }

  canCreate() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
    if (currentUser.perfilAcesso === 'ADMINISTRADOR') {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { label, name } = this.props;
    const dialogContainer = {
      marginBottom: "40px",
      marginTop: "10px"
    }
    const fabStyle = {
      marginRight: '20px',
      float: 'right',
    }
    return (
      <div>
        <div className="container">
          <h2>{label}</h2>
          <div>
            { this.fetchedDataContainerRender() }
          </div>
        </div>
        <div className="dialog-container" style={dialogContainer}>
          { this.canCreate() ?
            <FloatingActionButton secondary={false} style={fabStyle} onTouchTap={this.redirectPage}>
              <ContentAdd />
            </FloatingActionButton>
          : null}
        </div>
      </div>
    )
  }

}
