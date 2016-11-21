import React from 'react';
export class SideNav extends React.Component {


  render() {
    return (
      <div>
        <ul id="slide-out" className="side-nav">
          <li>
            <div className="userView">
              <div className="background">
                <img src="images/office.jpg"/>
              </div>
            </div>
          </li>
          <li>
            <a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a>
          </li>
          <li>
            <a href="#!">Second Link</a>
          </li>
          <li>
            <div className="divider"></div>
          </li>
          <li>
            <a className="subheader">Subheader</a>
          </li>
          <li>
            <a className="waves-effect" href="#!">Third Link With Waves</a>
          </li>
        </ul>
        <a href="#" data-activates="slide-out" className="button-collapse">MENU</a>
      </div>
    )
  }
}
