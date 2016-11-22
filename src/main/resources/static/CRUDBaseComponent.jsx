import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Table, Column, Cell } from 'fixed-data-table';

//TODO(andredeloliveira): THis component won't be a dumb one. Many actions will happen in here.
export class CRUDBaseComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  tableRender() {
    const rows = [
      ['a1', 'b1', 'c1'],
      ['a2', 'b2', 'c2'],
      ['a3', 'b3', 'c3'],
    ]
    return (
      <span>Table goes here</span>
    )
  }

  render() {
    const fabStyle = {
      marginRight: '20px',
      float: 'right',
      marginBottom: '50px'
    };
    const { label } = this.props;
    return (
      <div>
        <div className="container">
          <h2>{label}</h2>
          <div>
            { this.tableRender() }
          </div>
        </div>
          <FloatingActionButton secondary={false} style={fabStyle}>
            <ContentAdd />
          </FloatingActionButton>
      </div>
    )
  }

}
