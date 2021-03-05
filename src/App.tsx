import React from "react";
import { Nav } from "./features/nav/Nav";
import { Sidebar } from "./features/sidebar/Sidebar";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { closeNotification, selectNav } from "./features/nav/navSlice";
import { QuestionList } from "./features/questionList/QuestionList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { selectUserInfo } from "./features/signIn/signInSlice";
import { SignIn } from "./features/signIn/SignIn";

import { QuestionDetail } from "./features/questionDetail/QuestionDetail";
import { Tags } from "./features/tags/Tags";
import { Users } from "./features/users/UsersPage";

// function App() {
//   const notificationStatus = useSelector(selectNav);
//   const userInfo = useSelector(selectUserInfo);
//   const dispatch = useDispatch();

//   return (
//     <Router>
//       <div
//         className="App"
//         onClick={() => {
//           if (notificationStatus.inbox || notificationStatus.achivement) {
//             dispatch(closeNotification());
//           }
//         }}
//       >
//         <header className="header">
//           <Nav></Nav>
//         </header>
//         <main className="main">
//           <div className="main_content">
//             <div className="left_content">
//               <Sidebar></Sidebar>
//             </div>
//             <div className="center_content">
//               <Switch>
//                 <Route exact path="/tags"></Route>
//                 <Route exact path="/questions">
//                   <QuestionList />
//                 </Route>
//                 <Route exact path="/">
//                   {userInfo ? <TopQuestion /> : <SignIn />}
//                 </Route>
//                 <Route path="*">
//                   <div className="temp">404</div>
//                 </Route>
//               </Switch>
//             </div>
//             <Switch>
//               <Route exact path="/questions">
//                 <div className="right_sidebar"></div>
//               </Route>
//               <Route exact path="/">
//                 <div className="right_sidebar"></div>
//               </Route>
//             </Switch>
//           </div>
//         </main>
//       </div>
//     </Router>
//   );
// }

function App() {
  const notificationStatus = useSelector(selectNav);
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  return (
    <Router>
      <div
        className="App"
        onClick={() => {
          if (notificationStatus.inbox || notificationStatus.achivement) {
            dispatch(closeNotification());
          }
        }}
      >
        <header className="header">
          <Nav></Nav>
        </header>
        <main className="main">
          <div className="main_content">
            <Switch>
              <Route exact path="/users">
                <div className="left_content">
                  <Sidebar></Sidebar>
                </div>
                <Users />
              </Route>
              <Route exact path="/tags">
                <div className="left_content">
                  <Sidebar></Sidebar>
                </div>
                <div className="center_content">
                  <Tags />
                </div>
              </Route>
              <Route exact path="/questions">
                <div className="left_content">
                  <Sidebar></Sidebar>
                </div>
                <div className="center_content">
                  <QuestionList />
                </div>
                <div className="right_sidebar"></div>
              </Route>
              <Route exact path="/">
                {userInfo ? (
                  <>
                    <div className="left_content">
                      <Sidebar></Sidebar>
                    </div>
                    <div className="center_content">
                      <QuestionDetail />
                    </div>
                    <div className="right_sidebar"></div>
                  </>
                ) : (
                  <div className="center_content">
                    <SignIn />
                  </div>
                )}
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
