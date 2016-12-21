/*
  Component that renders all the Datatables and basic CRUD actions (including permission)
*/
import React from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Table, Column, Cell } from 'fixed-data-table';
import { NewEntryDialog } from './NewEntryDialog.jsx';
import { DataTableAirplane } from './DataTableAirplane.jsx';
import { DataTableUser } from './DataTableUser.jsx';
import { DataTableMission } from './DataTableMission.jsx';
import { hashHistory } from 'react-router';



@connect((Store) => {
  return {
    login: Store.loginReducer,
  }
})
export class CRUDBaseComponent extends React.Component {

  constructor(props) {
    super(props);
    this.redirectPage = this.redirectPage.bind(this)
  }


  //this method will decide which DataTable Component to render
  fetchedDataContainerRender() {
    const { name, data } = this.props;
    if (name === 'aeronaves') {
      return <DataTableAirplane data={data} name={name} />
    } else if (name === 'usuarios') {
      return <DataTableUser data={data} name={name} />
    } else if (name === 'missoes') {
      return <DataTableMission data={data} name={name} />;
    }
  }
  //Opens a new Entry dialog, that is a dependency of this component.
  redirectPage() {
    const { name, data } = this.props;
    hashHistory.push('/'+ name + '/novo')
  }

  isAdmin() {
    const currentUser = this.props.login.currentUser || cookie.load('currentUser');
    return currentUser.perfilAcesso === 'ADMINISTRADOR';
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
        {this.isAdmin() ?
          <div className="dialog-container" style={dialogContainer}>
            <FloatingActionButton secondary={false} style={fabStyle} onTouchTap={this.redirectPage}>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        : null}
      </div>
    )
  }

}
