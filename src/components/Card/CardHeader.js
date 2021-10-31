import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

const useStyles = makeStyles({
  cardHeader: {
    padding: "0.75rem 1.25rem",
    margin: "0 24px",
    marginBottom: "0",
    borderBottom: "none",
    background: "transparent",
    position: "relative",
    color: "#fff",
    borderRadius: "3px",
    marginTop: "-20px",
  },
  redCardHeader: {
    color: "#fff",
    backgroundColor: "#ef5350",
  },
  orangeCardHeader: {
    color: "#fff",
    backgroundColor: "#ffa21a",
  },
  greenCardHeader: {
    color: "#fff",
    backgroundColor: "#5cb860",
  },
  blueCardHeader: {
    color: "#fff",
    backgroundColor: "#4B89DC",
  },
});

export default function CardHeader(props) {
  const classes = useStyles();
  const { className, children, color, plain, stats, icon, ...rest } = props;
  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[color + "CardHeader"]]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderStats]: stats,
    [classes.cardHeaderIcon]: icon,
    [className]: className !== undefined,
  });
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
}
