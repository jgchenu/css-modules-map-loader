import React, { useState } from "react";
import { useSelector } from "react-redux";
import classnames from "classnames";

import styles from "./style.less";
function Home() {
  const state = useSelector(state => state);
  const [hide, setHide] = useState(true);
  function handleClick() {
    setHide(!hide);
  }

  return (
    <div className={styles.home}>
      <p>this is react home page</p>
      <p>my name is {state.name}</p>
      <button onClick={handleClick}>click</button>
      <div
        className={classnames(styles.modal, {
          [styles.hide]: hide
        })}
      >
        这是一个弹窗
      </div>
    </div>
  );
}

export default Home;
