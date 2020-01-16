import React from 'react';

class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  calculateTotal(scores) {
    let total = 0;
    let frames = [];
    for (let i = 0; i < scores.length; ++i) {
      let frame = 0;
      if (scores[i][0] === 10 && scores[i+1] && scores[i+2]) {
        if (scores[i+1][0] === 10) {
          frame = 20 + scores[i+2][0];
        } else {
          frame = 10 + scores[i+1][0] + scores[i+1][1];
        }
      } else if (scores[i][0] + scores[i][1] === 10 && scores[i+1]) {
        frame = 10 + scores[i+1][0];
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

  render() {
    return (
      <div className='scoreboard'>
        <h3>Scoreboard</h3>
        <table>
          <tbody>
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
              return (
                <tr key={i}>
                  <td>{player}</td>
                  <td>{this.calculateTotal(this.props.state['player' + (i+1)])}</td>
                  {this.props.state['player' + (i+1)].map((tuple, j) => {
                    return (<td key={j}>{tuple[0]} {tuple[1] !== undefined ? tuple[1] : ''} {tuple[2] !== undefined ? tuple[2] : ''}</td>);
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
}

export default ScoreBoard;