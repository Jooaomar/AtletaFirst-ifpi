import React from "react";

export class Cronometro extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        time: 0,
        isRunning: false,
      };
      this.timerId = null;
      this.getFormattedTime = this.getFormattedTime.bind(this);
    }
  
    componentDidMount() {
      const { isRunning } = this.props;
      if (isRunning) {
        this.startTimer();
      }
    }
  
    componentWillUnmount() {
      this.stopTimer();
    }
  
    startTimer() {
      this.setState({ isRunning: true });
      this.timerId = setInterval(() => {
        this.setState(prevState => ({ time: prevState.time + 1 }));
      }, 1000);
    }
  
    stopTimer() {
      clearInterval(this.timerId);
      this.setState({ isRunning: false });
      const timeInMinutes = Math.floor(this.state.time / 60);
      console.log(`Time recorded: ${timeInMinutes} minutes`);
    }
  
    getFormattedTime() {
      const { time } = this.state;
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  
    render() {
      const { isRunning } = this.state;
      const formattedTime = this.getFormattedTime();
  
      return (
        <div className="App">
          <h1>Cronômetro</h1>
          <div className="timer">{formattedTime}</div>
          {isRunning && <button onClick={() => this.stopTimer()}>Stop and Record Time</button>}
        </div>
      );
    }
  }