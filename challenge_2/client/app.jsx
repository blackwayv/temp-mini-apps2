import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currPrice: '',
      data: {}
    };

  }

  fetchBitCoin() {
    fetch('https://api.coindesk.com/v1/bpi/historical/close.json')
      .then(res => res.json())
      .then(res => {
        this.setState({ data: res });
        let labels = [];
        let data = [];
        for (let key in res.bpi) {
          labels.push(key);
          data.push(res.bpi[key]);
        }
        let ctx = document.getElementById('coinChart').getContext('2d');
        let chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Bitcoin Price (USD)',
              backgroundColor: 'rgb(255, 0, 0, 0.25)',
              borderColor: 'rgb(255, 0, 0)',
              data: data
            }]
          },
          options: {}
        });
        return fetch('https://api.coindesk.com/v1/bpi/currentprice/USD.json');
      })
      .then(res => res.json())
      .then(res => {
        this.setState({ currPrice: '$' + res.bpi.USD.rate });
      })
  }

  fetchOtherCurr(curr) {
    fetch(`https://api.coindesk.com/v1/bpi/currentprice/${curr}.json`)
      .then(res => res.json())
      .then(res => {
        let price = '$' + res.bpi[curr].rate;
        if (curr === 'CAD') {
          price = '$' + res.bpi[curr].rate + ' ' + curr;
        } else if (curr === 'EUR') {
          price = '€' + res.bpi[curr].rate;
        } else if (curr === 'GBP') {
          price = '£' + res.bpi[curr].rate;
        } else if (curr !== 'USD') {
          price = res.bpi[curr].rate + ' ' + curr;
        }
        this.setState({ currPrice: price });
      });
  }

  componentDidMount() {
    this.fetchBitCoin();
  }

  render() {
    return (
      <div id='overview' >
        <div className='center'><h2>Cryptocurrency Charting Tool</h2></div>
        <div id='btcprice'>Bitcoin <h3>{this.state.currPrice}</h3>
          <select id='curr' onChange={() => {
            let c = document.getElementById('curr');
            this.fetchOtherCurr(c.options[c.selectedIndex].value);
          }}>
            <option value='USD' defaultValue>USD</option>
            <option value='CAD'>CAD</option>
            <option value='EUR'>EUR</option>
            <option value='GBP'>GBP</option>
          </select>
        </div>
        <canvas id='coinChart'></canvas>
        <div className='center coindesk'>Powered by <a href='https://www.coindesk.com/price/bitcoin'>CoinDesk</a></div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));