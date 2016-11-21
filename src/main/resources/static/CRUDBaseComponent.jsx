import React from 'react';


//TODO(andredeloliveira): THis component won't be a dumb one. Many actions will happen in here.
export class CRUDBaseComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { label, name, params } = this.props;
    return (
      <h1>Faça algo com com o modulo de {label}</h1>
    )
  }

}
