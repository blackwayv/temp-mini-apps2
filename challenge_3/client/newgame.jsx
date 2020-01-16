import React from 'react';

class NewGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: ['']
    };
  }

  render() {
    return (
      <div className='new-game'>
        {this.state.players.map((player, i) => {
          return <div className='newBox' key={i}>
            Player {i + 1}: <input id={'new' + i} type='text' onChange={(e) => {
              let players = this.state.players.slice();
              players[i] = document.getElementById('new' + i).value;
              this.setState({ players });
            }}></input>
          </div>;
        })}
        <button onClick={(e) => {
          if (this.state.players.length < 5) {
            this.setState({players: this.state.players.concat('')});
          }
        }}>Add New</button>
        <button onClick={(e) => {
          let players = [];
          for (let player of this.state.players) {
            if (player.length) {
              players.push(player);
            }
          }
          this.props.update({ playerNames: players });
        }}>Start!</button>
      </div>
    );
  };
}

export default NewGame;