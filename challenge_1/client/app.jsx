import React from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      events: [],
      query: ''
    };

    this.handlePageClick = this.handlePageClick.bind(this);
    this.searchRecords = this.searchRecords.bind(this);
  }

  getRecords() {
    axios.get(`http://localhost:3000/events?_page=${this.state.page}&limit=10`)
      .then(events => {
        this.setState({ events: events.data, total: events.headers['x-total-count'] });
      })
  }

  searchRecords() {
    axios.get(`http://localhost:3000/events?_page=${this.state.page}&limit=10&q=${this.state.query}`)
      .then(events => {
        this.setState({ events: events.data, total: events.headers['x-total-count'] });
      })
  }

  handlePageClick(data) {
    this.setState({ page: data.selected + 1 }, () => {
      if (this.state.query) {
        this.searchRecords();
      } else {
        this.getRecords();
      }
    });
  }

  formatDate(date) {
    if (!isNaN(Number(date))) {
      if (Number(date) < 0) {
        date = date.slice(1);
        return date + 'BC';
      } else {
        return date + 'AD';
      }
    } else if (date[0] === '-') {
      date = date.slice(1);
      return date.slice(0, date.indexOf('/')) + 'BC' + date.slice(date.indexOf('/'));
    } else {
      return date;
    }
  }

  componentDidMount() {
    this.getRecords();
  }

  render() {
    return (
      <div className='eventBox'>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.setState({ page: 1 }, () => {
            this.searchRecords();
          });
        }}>
          <input id='search' placeholder='Search historical events...' onChange={() => {
            this.setState({ query: document.getElementById('search').value.trim().toLowerCase() })
          }}></input>
          <button id='searchButt' className='btn btn-outline-primary' type='submit'>Search</button>
        </form>
        <table className='eventList'>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Event Description</th>
            </tr>
            {this.state.events.map((record, i) => {
              return (<tr key={i}>
                <td className='date'>{this.formatDate(record.date)}</td>
                <td className='date'>{record.category2}</td>
                <td>{record.description}</td></tr>);
            })}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={'Prev'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(this.state.total / 10)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'} />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));