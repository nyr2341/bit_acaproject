import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

//import RestoreIcon from "@material-ui/icons/Restore";
//import FavoriteIcon from "@material-ui/icons/Favorite";
//import LocationOnIcon from "@material-ui/icons/LocationOn";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

const useStyles = makeStyles({
  footer: {
    position: "fixed",
    width: "100%",
    bottom: "0px",
    zIndex: 2,
  },
});

const BottomNavBar = (props) => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <BottomNavigation
        value={props.value}
        onChange={(event, newValue) => {
          props.setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="통계" icon={<ShowChartIcon />} />
        <BottomNavigationAction label="분석" icon={<BubbleChartIcon />} />
        <BottomNavigationAction label="가격비교" icon={<AttachMoneyIcon />} />
      </BottomNavigation>
    </footer>
  );
};
export default BottomNavBar;
