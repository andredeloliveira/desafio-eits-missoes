import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export class MissionPassengers extends React.Component {

  constructor(props) {
    super(props)
    this.handleUpdatePassengers = this.handleUpdatePassengers.bind(this);
  }

  handleUpdatePassengers(inputQuery) {
    console.log('input query', inputQuery);
  }

  render() {
    const passengersDataSource = [
      'Antonio',
      'Diego',
      'Thomas',
      'Hugo'
    ]


    return (
      <div>
        <AutoComplete
          hintText="Passageiros"
          dataSource={passengersDataSource}
          onUpdateInput={this.handleUpdatePassengers}
        />
        <FloatingActionButton mini={true} >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }

}
