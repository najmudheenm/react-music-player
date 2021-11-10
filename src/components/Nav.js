import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
const Nav = ({ libraryStatus, setLibraryStatus }) => {
  return (
    <nav>
      <h1>Wave</h1>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
