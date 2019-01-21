import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Chart from "./Chart";

const styles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: "white"
  }
});

const Visualization = () => {
  return (
    <Chart />
  );
};

export default withStyles(styles)(Visualization);
