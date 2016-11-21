import React from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
export class Header extends React.Component {

  constructor(props) {
    super(props)

  }


  render() {

    return (
      <AppBar title="Title" iconClassNameRight
              iconClassNameRight="muidocs-icon-navigation-expand-more"
              iconElementLeft={<IconButton><NavigationClose /></IconButton>}
      />
    )
  }
}
