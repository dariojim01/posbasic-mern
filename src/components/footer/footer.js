import React, { Component } from "react";

class Footer extends Component {
  render() {
    return <div>
          <div>
      <footer className="main-footer">
        <strong>Copyright © 2014-2024 <a href="https://adminlte.io">AdminLTE.io</a>.</strong>
        All rights reserved.
        <div className="float-right d-none d-sm-inline-block">
          <b>Version</b> 3.2.0
        </div>
      </footer>
      {/* Control Sidebar */}
      <aside className="control-sidebar control-sidebar-dark">
        {/* Control sidebar content goes here */}
      </aside>
    </div>

      </div>;
  }
}

export default Footer;
