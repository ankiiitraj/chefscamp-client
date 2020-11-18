import React from "react";
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch() {
    console.log("markdown rendering error");
  }

  render() {
    if (this.state.hasError) {
      return (
        <center>
          <h1 style={{marginTop: "100px"}}>Something went wrong with markdow.</h1>
          <br />
          <Link to={`/`}>{"<-"}go back</Link>
        </center>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;