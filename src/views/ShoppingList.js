import React from "react";
import { Route } from "react-router-dom";
import HistoryList from "../components/ShoppingList/HistoryList";
import History from "../components/ShoppingList/History";
import AddHistory from "../components/ShoppingList/AddHistory";

import axios from "axios";

const ShoppingList = (props) => {
  const [historyList, setHistoryList] = React.useState(null);
  const [checkState, setCheckState] = React.useState(true);
  const checkStateHandler = () => {
    setCheckState(!checkState);
  };

  React.useEffect(() => {
    axios
      .get("http://3.35.250.22:8080/Shop-0.0.1-SNAPSHOT/viewitems", {
        headers: {
          Authorization: "Bearer " + props.cookies.Authorization,
        },
      })
      .then((response) => {
        setHistoryList(response.data);
      });
  }, [checkState, props.cookies.Authorization]);

  return (
    <div>
      <Route
        path={["/main/shoppinglist"]}
        render={(history) => (
          <HistoryList
            historyList={historyList}
            history={history}
            cookies={props.cookies}
          />
        )}
        exact={true}
      />

      <Route
        path={["/main/shoppinglist/history"]}
        render={(history) => (
          <History
            checkStateHandler={checkStateHandler}
            history={history}
            cookies={props.cookies}
          />
        )}
        exact={true}
      />

      <Route
        path={["/main/shoppinglist/history/:list_id"]}
        component={History}
        exact={true}
      />

      <Route
        path={["/main/shoppinglist/addhistory"]}
        render={(history) => (
          <AddHistory
            history={history}
            checkStateHandler={checkStateHandler}
            cookies={props.cookies}
          />
        )}
        exact={true}
      />
    </div>
  );
};

export default ShoppingList;
