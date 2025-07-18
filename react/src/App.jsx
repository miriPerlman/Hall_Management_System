import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Order from './Components/Order';
import Menus from './components/Menus';
import Feedback from './Components/Feedback';
import CreateFeedback from './Components/CreateFeedback';
import LogIn from './Components/LogIn';
import Home from './Components/Home';
import Calendar from './Components/Calander';
import SignUp from './Components/SignUp';
import GaleryMenuButton from './Components/GaleryMenuButton';
import Galery from './Components/Galery';
import Worker from './Components/Worker';
import PersonalArea from './Components/PersonalArea';
import { useState } from 'react';
import Manager from './Components/Manager';
import AllWorkers from './Components/AllWorkers';
import CreateNewWorker from './Components/createNewWorker';

const initialFeedbacks = [
  { name: "דנה לוי", comment: "היה ערב מדהים! השירות היה מצוין והאוכל טעים מאוד.", rating: 5, avatar: "" },
  { name: "יוסי כהן", comment: "נהנינו מכל רגע, האולם מהמם והצוות אדיב במיוחד.", rating: 4, avatar: "" },
  { name: "רונית ישראלי", comment: "חוויה בלתי נשכחת, ממליצה בחום!", rating: 5, avatar: "" },
  { name: "משה פרץ", comment: "האירוע היה מושלם, הכל תקתק כמו שצריך. תודה רבה!", rating: 5, avatar: "" },
  { name: "אורית בן דוד", comment: "מקום מהמם, אוכל ברמה גבוהה ושירות מכל הלב.", rating: 4, avatar: "" },
  { name: "אלון שמואלי", comment: "הצוות היה מקצועי, האווירה הייתה נהדרת. ממליץ בחום!", rating: 5, avatar: "" },
  { name: "גלית כהן", comment: "היה פשוט מושלם! תודה על הכל.", rating: 5, avatar: "" },
];
const App = () => {
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks);

  const addFeedback = (newFeedback) => {
    setFeedbacks(prev => [newFeedback, ...prev]);
  };
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
        <NavLink to="/LogIn" className={({ isActive }) => isActive ? "active" : ""}>Log in</NavLink>
        {/* <Galery /> */}
        <GaleryMenuButton />
        {/* <NavLink to="/Catalog" className={({ isActive }) => isActive ? "active" : ""}>Catalog</NavLink>
        <NavLink to="/Calendar" className={({ isActive }) => isActive ? "active" : ""}>Calendar</NavLink> */}
      </nav>
      <Routes>
        <Route path="/SignUp/:id" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/Order/:name" element={<Order />} />
        <Route path="/Calendar" element={<Calendar />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/Galery" element={<Galery />} />
        <Route path="/Menus" element={<Menus />} />
        <Route path="/Feedback" element={<Feedback feedbacks={feedbacks} />} />
        <Route path="/Worker/:name" element={<Worker />} />
        <Route path="/PersonalArea/:name" element={<PersonalArea />} />
        <Route path="/CreateFeedback" element={<CreateFeedback addFeedback={addFeedback} />} />
        <Route path="/Manager/:name" element={<Manager />} />
        <Route path="/AllWorkers" element={<AllWorkers />} />
        <Route path='/CreateNewWorker' element={<CreateNewWorker/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;