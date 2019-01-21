import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { withStyles } from "@material-ui/core/styles";
import {LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line} from "recharts";
import CircularProgress from '@material-ui/core/CircularProgress';

const cardStyles = theme => ({
  root: {
    background: theme.palette.secondary.main
  },
  label: {
    color: theme.palette.primary.main
  },
  wrapper: {
    margin: '80px'
  },
  progress: {
    'display': 'flex',
    'justify-content': 'center',
    'align-items': 'center'
  }
});

class MyChart extends Component {
  componentDidMount() {
    this.props.fetchDroneData();
    this.pollDroneData()
  }

  pollDroneData = () => {
    setInterval(() => {
      this.props.fetchDroneData();
    }, 4000)
  }
    
  render() {
    const {data} = this.props;
    const getTime = (timestamp) => (
      ('0' + new Date(timestamp).getHours()).slice(-2) 
           + ':' + ('0' +new Date(timestamp).getMinutes()).slice(-2)
    )
    let dataMax, dataMin;
    if(data && data.length) {
      dataMax = data[0].metric ? data[0].metric : 0;
      dataMin = data[0].metric ? data[0].metric : 0;
    }
    
    const refinedData = (data || []).map((item)=> {
      if(item.metric > dataMax) {
        dataMax = Math.floor(item.metric)
      }

      if(item.metric < dataMin) {
        dataMin = Math.floor(item.metric)
      }

      item.time = getTime(item.timestamp)
      return item;
    })

    if (!data.length) return <CircularProgress className={this.props.classes.progress}/>;
    else 
    return <div className={this.props.classes.wrapper}>
      <LineChart
        width={700}
        height={415}
        data={refinedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid />
        <XAxis
          dataKey="time"
          minTickGap={75}
          stroke="black"
          fontFamily="sans-serif"
          label={{ value: new Date(data[0].timestamp).toDateString(), position: 'insideBottomLeft', dy:10 }}/>
        <YAxis
          domain={[dataMin - 10, dataMax + 10]}
          dataKey="metric"
          stroke="black"
          fontFamily="sans-serif"
          allowDecimals={false}
          label={{ value: 'Metric', angle: -90, position: 'insideLeft' }}/>
        <Tooltip />
        <Line type="monotone"
          animationDuration={500}
          dataKey="metric"
          dot={false}
          animationEasing="linear"/>
      </LineChart>
    </div>
  }
} 

const mapStateToProps = state => {
  console.log(state);
  return {
    data: state.data,
    error: state.error
  } = state.drone;
};
  
const mapDispatchToProps = dispatch => {
  return {
    fetchDroneData: () => dispatch({ type: actions.FETCH_DRONE_DATA })
  };
};

const StyledChart = withStyles(cardStyles)(MyChart)
  
export default connect(mapStateToProps, mapDispatchToProps)(StyledChart);




