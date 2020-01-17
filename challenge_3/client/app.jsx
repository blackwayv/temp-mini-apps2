import React from 'react';
import ReactDOM from 'react-dom';
import NewGame from './newgame';
import PinsView from './pinsview';
import ScoreBoard from './scoreboard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: 0,
      playerNames: [],
      status: 'Press GO! to start the game!',
      player1: [],
      player2: [],
      player3: [],
      player4: [],
      player5: [],
      score: []
    };

    this.updateState = this.updateState.bind(this);
    this.go = this.go.bind(this);
  }

  go(e) {
    let state = this.state;
    let bowl;
    let playerString = 'player' + (state.player + 1);
    if (state[playerString].length === 10) {
      this.setState({ winner: true });
    } else if (state.score.length === 3 || state.score[0] + state.score[1] < 10) {
      let i = state.player;
      if (state.playerNames[i + 1] === undefined) {
        i = -1;
      }
      let playerScore = state[playerString].slice();
      playerScore.push(state.score);
      this.setState({
        player: i + 1,
        [playerString]: playerScore,
        score: []
      });
    } else if (state[playerString].length === 9 && state.score.length > 0) {
      // logic for last frame 3 SHOTS
      if (state.score[0] === 10 && state.score[1] < 10) {
        bowl = Math.round(Math.random() * (10 - state.score[1]));
        let status;
        if (bowl + state.score[0] === 10) {
          status = state.playerNames[state.player] + ' scored a SPARE!';
        } else if (bowl === 0) {
          status = state.playerNames[state.player] + ' got a gutterball!';
        } else {
          status = state.playerNames[state.player] + ` scored a ${bowl}!`;
        }
        this.setState({
          status,
          score: state.score.concat(bowl)
        });
      } else if (state.score[0] === 10 || state.score[0] + state.score[1] === 10) {
        bowl = Math.round(Math.random() * 10);
        let status;
        if (bowl === 10) {
          status = state.playerNames[state.player] + ' scored a STRIKE!';
        } else if (bowl === 0) {
          status = state.playerNames[state.player] + ' got a gutterball!';
        } else {
          status = state.playerNames[state.player] + ` scored a ${bowl}!`;
        }
        this.setState({
          status,
          score: state.score.concat(bowl)
        });
      } else {
        bowl = Math.round(Math.random() * (10 - state.score[0]));
        let status;
        if (bowl + state.score[0] === 10) {
          status = state.playerNames[state.player] + ' scored a SPARE!';
        } else if (bowl === 0) {
          status = state.playerNames[state.player] + ' got a gutterball!';
        } else {
          status = state.playerNames[state.player] + ` scored a ${bowl}!`;
        }
        this.setState({
          status,
          score: state.score.concat(bowl)
        });
      }
    } else if (state.score.length === 2 || state.score[0] === 10) {
      // if last frame was over
      let i = state.player;
      if (state.playerNames[i + 1] === undefined) {
        i = -1;
      }
      let playerScore = state[playerString].slice();
      playerScore.push(state.score);
      this.setState({
        player: i + 1,
        [playerString]: playerScore,
        score: []
      });
    } else if (state.score[0]) {
      // if second turn of frame
      bowl = Math.round(Math.random() * (10 - state.score[0]));
      let status;
      if (bowl + state.score[0] === 10) {
        status = state.playerNames[state.player] + ' scored a SPARE!';
      } else if (bowl === 0) {
        status = state.playerNames[state.player] + ' got a gutterball!';
      } else {
        status = state.playerNames[state.player] + ` scored a ${bowl}!`;
      }
      this.setState({
        status,
        score: state.score.concat(bowl)
      });
    } else {
      // if first turn of frame
      bowl = Math.round(Math.random() * 10);
      let status;
      if (bowl === 10) {
        status = state.playerNames[state.player] + ' scored a STRIKE!';
      } else if (bowl === 0) {
        status = state.playerNames[state.player] + ' got a gutterball!';
      } else {
        status = state.playerNames[state.player] + ` scored a ${bowl}!`;
      }
      this.setState({
        status,
        score: [bowl]
      });
    }
  }

  updateState(obj) {
    this.setState(obj);
  }

  render() {
    return (
      <div className='bowling'>
        <h2 className='center'>Bowling Game!</h2>
        {this.state.playerNames.length === 0 ? <NewGame update={this.updateState} /> :
          <div className='game'>
            {this.state.status}<br />
            {this.state.playerNames[this.state.player] + "'s turn"}<br />
            <button className='big' onClick={this.go}>GO!</button><br />
            <button onClick={(e) => {
              this.setState({
                player: 0,
                playerNames: [],
                status: 'Press GO! to start the game!',
                player1: [],
                player2: [],
                player3: [],
                player4: [],
                player5: [],
                score: [],
                winner: false
              })}}>New Game</button>
            <PinsView />
            <ScoreBoard state={this.state} update={this.updateState} />
          </div>}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));