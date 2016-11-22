import React from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
import { NewEntryDialog } from './NewEntryDialog.jsx';

//TODO(andredeloliveira): THis component won't be a dumb one. Many actions will happen in here.
export class CRUDBaseComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  fetchedDataContainerRender() {
    const rows = [
      ['a1', 'b1', 'c1'],
      ['a2', 'b2', 'c2'],
      ['a3', 'b3', 'c3'],
    ]
    return (
      <span>Table goes here</span>
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
      marginBottom: "40px"
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
