import React from 'react';

class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: ''
    };
  }

  calculateTotal(scores, name) {
    let total = 0;
    let frames = [];
    for (let i = 0; i < scores.length; ++i) {
      let frame = 0;
      if (scores[i][0] === 10 && scores[i + 1]) {
        if (scores[i + 1][0] === 10 && scores[i + 2]) {
          frame = 20 + scores[i + 2][0];
        } else {
          frame = 10 + scores[i + 1][0] + scores[i + 1][1];
        }
      } else if (scores[i][0] + scores[i][1] === 10 && scores[i + 1]) {
        frame = 10 + scores[i + 1][0];
      } else if (scores[i][0] === 10) {
        frame = 0;
      } else {
        frame = scores[i][0] + scores[i][1];
      }
      frames.push(frame);
    }
    for (let frame of frames) {
      total += frame;
    }
    return total;
  }

  renderWinner() {
    let s = document.getElementById('scoretable').children;
    let winner = '';
    let highest = 0;
    for (let k = 1; k < s.length; ++k) {
      // console.log(typeof s[k].cells[1].innerText, s[k].cells[0].innerText);
      if (Number(s[k].cells[1].innerText) > highest) {
        highest = Number(s[k].cells[1].innerText);
        winner = s[k].cells[0].innerText;
      }
    }
    return winner;
  }

  render() {
    return (
      <div className='scoreboard'>
        <h3>Scoreboard</h3>
        <table>
          <tbody id='scoretable'>
            <tr>
              <th>Player</th>
              <th>Total</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
              <th>8</th>
              <th>9</th>
              <th>10</th>
            </tr>
            {this.props.state.playerNames.map((player, i) => {
              let playerString = 'player' + (i + 1);
              return (
                <tr key={i} id={i}>
                  <td id='playercell'>{player}</td>
                  <td>{this.calculateTotal(this.props.state[playerString], player)}</td>
                  {this.props.state[playerString].map((tuple, j) => {
                    return (<td key={j}>
                      {tuple[0] === 10 ? 'X' : tuple[0]} {tuple[1] !== undefined ? (tuple[1] === 10 && tuple[0] === 10 ? 'X' : (tuple[0] + tuple[1] === 10 ? '/' : tuple[1])) : ''} {tuple[2] !== undefined ? (tuple[2] === 10 && tuple[1] === 10 ? 'X' : (tuple[2] + tuple[1] === 10 ? '/' : tuple[2])) : ''}
                    </td>);
                  })}
                </tr>);
            })}
          </tbody>
        </table>
        {this.props.state.winner ? <h1>{this.renderWinner()} is the winner!</h1> : ''}
      </div>
    );
  };
}

export default ScoreBoard;