import React from 'react';
import { DashboardItem } from './DashboardItem.jsx';

export class Dashboard extends React.Component {

  dashboardItemsRender() {
    const dashboardItems = [
      {
        name: 'mission',
        label: 'Missões',
        image: '',
        url: '/missoes',
      },
      {
        name: 'airplane',
        label: 'Aeronaves',
        image: '',
        url: '/aeronaves',
      },
      {
        name: 'user',
        label: 'Usuários',
        image: '',
        url: '/usuarios',
      }
    ]
    return dashboardItems.map( (item, index) => {
      return (
        <div className="col3" key={index}>
          <DashboardItem name={item.name} image={item.image} label={item.label} url={item.url}/>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="onerow">
        { this.dashboardItemsRender() }
      </div>
    )
  }

}
