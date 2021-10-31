import React from "react";
import Statistics from "../components/ShoppingStatistics/Statistics";
import Analysis from "../components/ShoppingStatistics/Analysis";
import Compare from "../components/ShoppingStatistics/Compare";
import BottomNavBar from "../components/Navbar/BottomNavbar";

const Contents = (props) => {
  const { children, value, index } = props;

  return (
    <div hidden={value !== index}>
      {value === index && <div>{children}</div>}
    </div>
  );
};

const ShoppingStatistics = (props) => {
  const [value, setValue] = React.useState(0);
  return (
    <div>
      <div style={{ paddingBottom: "71px" }}>
        <Contents value={value} index={0}>
          <Statistics cookies={props.cookies} />
        </Contents>
        <Contents value={value} index={1}>
          <Analysis cookies={props.cookies} />
        </Contents>
        <Contents value={value} index={2}>
          <Compare cookies={props.cookies} />
        </Contents>
      </div>
      <BottomNavBar value={value} setValue={setValue} />
    </div>
  );
};

export default ShoppingStatistics;
