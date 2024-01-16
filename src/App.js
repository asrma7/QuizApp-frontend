import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./features/auth/components/Login/Login";
import Welcome from "./features/auth/components/Welcome/Welcome";
import {
  RequireAdmin,
  RequireAuth,
  RequireNoAuth,
} from "./features/auth/components/AuthWrapper";
import TopicsList from "./features/topics/components/TopicsList/TopicsList";
import Profile from "./features/auth/components/Profile/Profile";
import Register from "./features/auth/components/Register/Register";
import { CreateTopic } from "./features/topics/components/CreateTopic/CreateTopic";
import TopicView from "./features/topics/components/TopicView/TopicView";
import { CreateQuestion } from "./features/topics/components/CreateQuestion/CreateQuestion";
import QuestionView from "./features/topics/components/QuestionView/QuestionView";
import ResultView from "./features/topics/components/ResultView/ResultView";
import { EditQuestion } from "./features/topics/components/EditQuestion/EditQuestion";
import { EditTopic } from "./features/topics/components/EditTopic/EditTopic";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Home />} />
        <Route element={<RequireNoAuth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="topicslist" element={<TopicsList />} />
          <Route path="topic/:topicId" element={<TopicView />} />
          <Route path="startquiz/:topicId" element={<QuestionView />} />
          <Route path="result" element={<ResultView />} />
        </Route>

        {/* admin routes */}
        <Route element={<RequireAdmin />}>
          <Route path="newtopic" element={<CreateTopic />} />
          <Route path="addquestion/:topicId" element={<CreateQuestion />} />
          <Route path="edittopic/:topicId" element={<EditTopic />} />
          <Route path="editquestion/:questionId" element={<EditQuestion />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
