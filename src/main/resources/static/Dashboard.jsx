import React from 'react';
import { DashboardItem } from './DashboardItem.jsx';

export class Dashboard extends React.Component {

  dashboardItemsRender() {
    const dashboardItems = [
      {
        name: 'mission',
        label: 'Missões',
        image: '',
      },
      {
        name: 'airplane',
        label: 'Aeronaves',
        image: '',
      },
      {
        name: 'user',
        label: 'Usuários',
        image: '',
      }
    ]
    return dashboardItems.map( (item, index) => {
      return (
        <div className="col s4 m4 lg4" key={index}>
          <DashboardItem name={item.name} image={item.image} label={item.label}/>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="row">
        <div className="container">
          { this.dashboardItemsRender() }
        </div>
      </div>
    )
  }

}
