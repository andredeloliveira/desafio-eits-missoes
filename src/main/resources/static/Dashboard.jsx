/*
  Renders the Dashboard component
*/
import React from 'react';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import DeviceAirplanemodeActive from 'material-ui/svg-icons/device/airplanemode-active';
import SocialPerson from 'material-ui/svg-icons/social/person';
import { DashboardItem } from './DashboardItem.jsx';

export class Dashboard extends React.Component {

  dashboardItemsRender() {
    const iconStyle = {
      width: "100px",
      height: "100px",
    }
    const dashboardItems = [
      {
        name: 'mission',
        label: 'Missões',
        icon: <ActionFlightTakeoff style={iconStyle}/>,
        url: '/missoes',
      },
      {
        name: 'airplane',
        label: 'Aeronaves',
        icon: <DeviceAirplanemodeActive style={iconStyle} />,
        url: '/aeronaves',
      },
      {
        name: 'user',
        label: 'Usuários',
        icon: <SocialPerson style={iconStyle} />,
        url: '/usuarios',
      }
    ]
    return dashboardItems.map( (item, index) => {
      return (
        <div className="col3" key={index}>
          <DashboardItem name={item.name} icon={item.icon} label={item.label} url={item.url}/>
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
