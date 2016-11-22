import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


export class MissionPilots extends React.Component {

  constructor(props) {
    super(props);
    this.handleUpdatePilots = this.handleUpdatePilots.bind(this);
  }

  handleUpdatePilots(inputQuery) {
    console.log('input query', inputQuery)
  }

  render() {
    const pilotsDataSource = [
      'Mariana',
      'Natália',
      'Luíza',
      'Andrea'
    ]

    return (
      <div>
        <AutoComplete
          hintText="Pilotos"
          dataSource={pilotsDataSource}
          onUpdateInput={this.handleUpdatePilots}
        />
        <FloatingActionButton mini={true} >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }

}
