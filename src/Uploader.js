import React, { Component } from "react";
import axios from "axios";

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      url: ""
    };
  }

  handleChange = ev => {
    console.log("handling it");
    this.setState({ success: false, url: "" });
  };

  handleUpload = ev => {
    let file = this.uploadInput.files[0];
    console.log(file);
  };

  render() {
    return (
      <div>
        <h1>UPLOAD A FILE</h1>
        {/* {this.state.success ? <SuccessMessage /> : null}
        {this.state.error ? <ErrorMessage /> : null} */}
        <input
          onChange={this.handleChange}
          ref={ref => {
            this.uploadInput = ref;
          }}
          type="file"
        />
        <br />
        <button onClick={this.handleUpload}>UPLOAD</button>
      </div>
    );
  }
}

export default Uploader;
