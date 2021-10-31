import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  cardFooter: {
    padding: "0.9375rem 20px",
    paddingTop: "10px",
    margin: "0 15px 10px",
    borderRadius: "0",
    alignItems: "center",
    display: "flex",
    backgroundColor: "transparent",
    border: "0",
  },
  cardFooterProfile: {
    marginTop: "-15px",
  },
  cardFooterPlain: {
    paddingLeft: "5px",
    paddingRight: "5px",
    backgroundColor: "transparent",
  },
  cardFooterStats: {
    borderTop: "1px solid #eee",
    marginTop: "20px",
    "& svg": {
      position: "relative",
      top: "4px",
      marginRight: "3px",
      marginLeft: "3px",
      width: "16px",
      height: "16px",
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      fontSize: "16px",
      position: "relative",
      top: "4px",
      marginRight: "3px",
      marginLeft: "3px",
    },
  },
  cardFooterChart: {
    borderTop: "1px solid #eee",
  },
});

export default function CardFooter(props) {
  const classes = useStyles();
  const { className, children, plain, profile, stats, chart, ...rest } = props;
  const cardFooterClasses = classNames({
    [classes.cardFooter]: true,
    [classes.cardFooterPlain]: plain,
    [classes.cardFooterProfile]: profile,
    [classes.cardFooterStats]: stats,
    [classes.cardFooterChart]: chart,
    [className]: className !== undefined,
  });
  return (
    <div className={cardFooterClasses} {...rest}>
      {children}
    </div>
  );
}

CardFooter.propTypes = {
  className: PropTypes.string,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  stats: PropTypes.bool,
  chart: PropTypes.bool,
  children: PropTypes.node,
};
