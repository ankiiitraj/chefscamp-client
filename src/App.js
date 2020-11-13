import React, { Component } from "react";
import Login from "./components/Login.jsx";
import NavBar from "./components/NavBar.jsx";
import Search from "./components/seachComponent/Search.jsx";
import Ranklist from "./components/ranklist/Ranklist.jsx";
import ProblemInfo from "./components/problemPage/ProblemInfo.jsx";
import Ide from "./components/ide/Ide.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ContestPage from "./components/contestPage/ContestPage.jsx";
import axios from "axios";
import Cookie from "js-cookie";
import NotFound from "./components/NotFound.jsx";
import Footer from "./components/Footer";
import {light, dark} from "./theme";
import { ToastProvider } from "react-toast-notifications";
import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      band: "",
      isLoggedIn: false,
      loading: false,
      contests: null,
      // eslint-disable-next-line
      theme: Cookie.get("theme") == 0 ? dark : light,
      // eslint-disable-next-line
      themeBool: Cookie.get("theme") == 0 ? 0 : 1,
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleLiftContests = this.handleLiftContests.bind(this);
  }
  handleLiftContests(data) {
    let contest = data.result.data.content.contestList,
      contestsList = [];
    for (let i = 0; i < contest.length; ++i) {
      contestsList.push({
        detail: `${contest[i].name}(${contest[i].code})`,
        code: contest[i].code,
      });
    }
    this.setState({ contests: contestsList });
  }
  handleLogin(userName, band) {
    this.setState({
      userName: userName,
      band: band,
      isLoggedIn: true,
      loading: false,
    });
  }
  handleLogout() {
    this.setState({
      userName: "",
      band: "",
      isLoggedIn: false,
      loading: false,
      message: null
    });
    Cookie.remove("userName");
    Cookie.remove("band");
  }
  componentDidMount() {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    let code = params.get("code");
    if (Cookie.get("userName")) {
      this.setState({
        isLoggedIn: true,
        userName: Cookie.get("userName"),
        band: Cookie.get("band"),
      });
    } else if (code) {
      this.setState({ loading: true });
      axios
      .get(`/api/auth/?code=${code}`)
      .then((res) => {
        Cookie.set("userName", res.data.result.data.content.username, {
          expires: 30,
        });
        Cookie.set("band", res.data.result.data.content.band, {
          expires: 30,
        });
        this.handleLogin(
          res.data.result.data.content.username,
          res.data.result.data.content.band
          );
        })
        .catch(() => {
          this.setState({ loading: false, message: "Login failed, please try again!" });
        });
    }
  }

  handleToggle() {
    this.state.theme === light
      ? Cookie.set("theme", 0, { expires: 30 })
      : Cookie.set("theme", 1, { expires: 30 });
    let toggleTo = this.state.theme === light ? dark : light;
    this.setState({
      theme: toggleTo,
      themeBool: !this.state.themeBool,
    });
  }

  render() {
    return (
      <div
        style={this.state.theme}
        ref={(el) => {
          if (el && this.state.theme === dark) {
            el.style.setProperty("color", "white", "important");
            el.style.setProperty("borderColor", "white", "important");
          }
        }}
      >
        <center>
          <div style={{ width: "963px", maxWidth: "963px", position: "relative" }}>
            <ToastProvider>
              <Router>
                <NavBar
                  handleToggle={this.handleToggle}
                  color={this.state.theme.color}
                  handleLogout={this.handleLogout}
                  userName={
                    this.state.loading
                      ? ". . ."
                      : this.state.userName === ""
                      ? "User"
                      : this.state.userName
                  }
                  band={this.state.band === "" ? "N/A" : this.state.band}
                />
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={(props) =>
                      this.state.isLoggedIn ? (
                        <Search
                          {...this.state}
                          contests={this.state.contests}
                          handleLiftContests={this.handleLiftContests}
                        />
                      ) : (
                        <Login message={this.state.message} loading={this.state.loading}/>
                      )
                    }
                  />
                  <ProtectedRoute
                    exact
                    userDetails={this.state}
                    path="/contest/:contestCode"
                    component={ContestPage}
                  />
                  <ProtectedRoute
                    exact
                    userDetails={this.state}
                    path="/ranklist/:contestCode"
                    component={Ranklist}
                  />
                  <ProtectedRoute
                    exact
                    userDetails={this.state}
                    path="/contest/:contestCode/problem/:problemCode"
                    component={ProblemInfo}
                  />  
                  <ProtectedRoute
                    exact
                    userDetails={this.state}
                    path="/ide"
                    component={Ide}
                  />
                  <Route path="/" component={NotFound} />
                </Switch>
                <Footer userDetails={this.state} />
              </Router>
            </ToastProvider>
          </div>
        </center>
      </div>
    );
  }
}

export default App;
