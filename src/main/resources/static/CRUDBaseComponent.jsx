import React from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
import { NewEntryDialog } from './NewEntryDialog.jsx';
import { DataTable } from './DataTable.jsx';

//TODO(andredeloliveira): THis component won't be a dumb one. Many actions will happen in here.
export class CRUDBaseComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  fetchedDataContainerRender() {
    return (
      <DataTable />
    )
  }
  //Opens a new Entry dialog, that is a dependency of this component.
  openCreateNewEntryDialog() {
    this.refs.openDialog.handleOpen();
  }

  render() {
    const { label, name } = this.props;
    console.log('name inside render on CRUDBaseComponent', name)
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
