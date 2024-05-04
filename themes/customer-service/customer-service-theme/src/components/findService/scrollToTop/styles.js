import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const Styles = makeStyles(theme => ({
  btnStyle: {
    position: "fixed",
    bottom: 15,
    right: 20,
    height: 40,
    width: 40,
    borderRadius: "50%",
    backgroundColor: "#fff",
    border: "2px solid #333",
    color: "#333",
    cursor: "pointer",
  },
}))

export default Styles
