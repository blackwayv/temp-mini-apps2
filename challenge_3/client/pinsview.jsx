import React from 'react';

class PinsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: [[0], [0,0], [0,0,0], [0,0,0,0], [0,0,0,0,0]]
    };
  }
  render() {
    return (
      <div className='pins-view'>
        Pins coming soon™
      </div>
    );
  };
}

export default PinsView;