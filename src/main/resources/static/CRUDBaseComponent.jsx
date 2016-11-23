import React from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
import { NewEntryDialog } from './NewEntryDialog.jsx';
import { DataTableAirplane } from './DataTableAirplane.jsx';

//TODO(andredeloliveira): THis component won't be a dumb one. Many actions will happen in here.
export class CRUDBaseComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  //this method will decide which DataTable Component to render
  fetchedDataContainerRender() {
    const { name, data } = this.props;
    if (name === 'airplane') {
      return <DataTableAirplane data={data} />
    }
  }
  //Opens a new Entry dialog, that is a dependency of this component.
  openCreateNewEntryDialog() {
    this.refs.openDialog.handleOpen();
  }

  render() {
    const { label, name } = this.props;
    const dialogContainer = {
      marginBottom: "40px",
      marginTop: "10px"
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
          <NewEntryDialog ref="openDialog" name={name}/>
        </div>
      </div>
    )
  }

}
