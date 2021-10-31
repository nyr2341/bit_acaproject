import React from "react";

import { Route } from "react-router-dom";
import AddNote from "../components/ShoppingNote/AddNote";
import CheckNote from "../components/ShoppingNote/CheckNote";
import NoteList from "../components/ShoppingNote/NoteList";

import axios from "axios";
import Note from "../components/ShoppingNote/Note";
const ShoppingNote = (props) => {
  const [noteList, setNoteList] = React.useState(null);
  const [checkState, setCheckState] = React.useState(true);
  const checkStateHandler = () => {
    setCheckState(!checkState);
  };

  React.useEffect(() => {
    axios
      .get("http://3.35.250.22:8080/Shop-0.0.1-SNAPSHOT/totalnote", {
        headers: {
          Authorization: "Bearer " + props.cookies.Authorization,
        },
      })
      .then((response) => {
        setNoteList(response.data);
      });
  }, [checkState, props.cookies.Authorization]);

  return (
    <div>
      <Route
        path={["/main/shoppingnote"]}
        render={(history) => (
          <NoteList
            noteList={noteList}
            history={history}
            cookies={props.cookies}
          />
        )}
        exact={true}
      />

      <Route
        path={["/main/shoppingnote/checknote"]}
        render={(history) => (
          <CheckNote
            history={history}
            cookies={props.cookies}
            checkStateHandler={checkStateHandler}
          />
        )}
        exact={true}
      />

      <Route
        path={["/main/shoppingnote/addnote"]}
        render={(history) => (
          <AddNote
            history={history}
            cookies={props.cookies}
            checkStateHandler={checkStateHandler}
          />
        )}
        exact={true}
      />

      <Route
        path={["/main/shoppingnote/note"]}
        render={(history) => (
          <Note
            checkStateHandler={checkStateHandler}
            history={history}
            cookies={props.cookies}
          />
        )}
        exact={true}
      />

      <Route
        path={["/main/shoppingnote/note/:note_id"]}
        component={Note}
        exact={true}
      />
    </div>
  );
};

export default ShoppingNote;
