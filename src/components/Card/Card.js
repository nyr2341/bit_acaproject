import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

const useStyles = makeStyles({
  card: {
    border: "0",
    marginTop: "30px",
    borderRadius: "6px",
    background: "white",
    width: "100%",
    boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
    display: "flex",
    flexDirection: "column",
    fontSize: ".875rem",
  },
  cardPlain: {
    background: "transparent",
    boxShadow: "none",
  },
  cardProfile: {
    marginTop: "30px",
    textAlign: "center",
  },
});

export default function Card(props) {
  const classes = useStyles();
  const { className, children, plain, profile, ...rest } = props;
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile,
    [className]: className !== undefined,
  });
  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  children: PropTypes.node,
};
