import React from "react";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      selectedMonth: 6,
      selectedDay: 18,
      selectedYear: 2019,
      selectedHistory: [],
      filteredHistory: []
    };
    this.getMonth = this.getMonth.bind(this);
    this.getDay = this.getDay.bind(this);
    this.selectDate = this.selectDate.bind(this);
  }

  componentDidMount() {
    this.getData();
  }
  getData() {
    fetch(process.env.REACT_APP_MYFILEPATH)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ history: data });
        this.selectDate(8, 19);
      })
      .catch(err => {
        console.log("Error Reading data " + err);
      });
  }
  getMonth(month) {
    this.setState({ selectedMonth: month });
    this.selectDate(month, this.state.selectedDay);
  }
  getDay(day) {
    this.setState({ selectedDay: day });
    this.selectDate(this.state.selectedMonth, day);
  }
  selectDate(selectedMonth, selectedDay) {
    let selectedHistory = this.state.history.filter(
      ({ month, day }) => month === selectedMonth && day === selectedDay
    );
    let filteredHistory = [
      ...new Set(
        selectedHistory.map(obj => [obj.title, obj.hour, obj.year, obj.url])
      )
    ];
    let filteredHistory_2 = [
      ...new Set(filteredHistory.map(obj => obj.join()))
    ];
    this.setState({ selectedHistory: selectedHistory });
    this.setState({ filteredHistory: filteredHistory_2 });
  }

  render() {
    const month_nums = Array.from(Array(12).keys());
    const day_nums = Array.from(Array(31).keys());
    const filteredHistory = this.state.filteredHistory;
    return (
      <div>
        <h1>DASHBOARD</h1>
        <h2>PICK MONTH</h2>
        {month_nums.map(month => {
          return (
            <span
              key={month + 876}
              value={month + 1}
              onClick={() => this.getMonth(month + 1)}
            >
              {" "}
              {month + 1} |
            </span>
          );
        })}
        <h2>PICK DAY</h2>
        {day_nums.map(day => {
          return (
            <span
              key={day + 876}
              value={day + 1}
              onClick={() => this.getDay(day + 1)}
            >
              {" "}
              {day + 1} |
            </span>
          );
        })}
        <h2>FILTERED HISTORY</h2>
        <h3>
          for {this.state.selectedMonth} - {this.state.selectedDay}
        </h3>
        <div className="bj_container">
          {filteredHistory.map((visit, i) => {
            let new_visit = visit.split(",");
            return (
              <div className="bj_row" key={new_visit}>
                <div className="bj_column">{new_visit[2]}</div>
                <div className="bj_column">
                  {new_visit[1] > 12
                    ? (new_visit[1] - 12).toString() + " pm"
                    : new_visit[1].toString() + " am"}
                </div>
                <div className="bj_column">
                  <a href={new_visit[3]}>{new_visit[0]}</a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Dashboard;
