import React from "react";
import { withRouter } from "react-router-dom";

@withRouter
class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    const { history } = this.props;

    history.listen((location, action) => {
      if (this.state.hasError) {
        this.setState({
          hasError: false,
        });
      }
    });
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    console.error(error, errorInfo);
  }

  render() {
    const { message } = this.props;
    if (this.state.hasError) {
      return (
        <div className="ui padded segment">
          <h3>Error Occured</h3>
          <p>"Page is broken. Please report to QA."</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default GlobalErrorBoundary;
export { GlobalErrorBoundary };
