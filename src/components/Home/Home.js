import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const content = (
    <section className="home">
      <header>
        <h1>Welcome to QuizMaster Pro - Your Ultimate Exam Preparation Hub!</h1>
      </header>
      <main className="home-main">
        <div className="home-content">
          <p>
            Embark on a journey of academic excellence with QuizMaster Pro, your
            go-to destination for seamless exam preparation. Our cutting-edge
            quiz app is meticulously designed to replicate the authentic exam
            environment, ensuring you're well-equipped to conquer your upcoming
            tests.
          </p>
          <p>
            QuizMaster Pro is not just a quiz app; it's your personal exam
            coach, dedicated to helping you achieve academic success. Whether
            you're gearing up for a standardized test, final exams, or any
            assessment, let QuizMaster Pro be your trusted companion on the road
            to success. Start your journey today!
          </p>
          <Link to="topicslist" className="btn btn-primary">View Topics</Link>
        </div>
        <div className="features-list">
          <h3>Key Features:</h3>
          <ol type="1">
            <li>
              <b>Simulated Exam Environment:</b> Immerse yourself in a realistic
              exam setting to enhance your familiarity and confidence.
              Experience the pressure, time constraints, and question formats
              just like in the real exam.
            </li>
            <li>
              <b>Unlimited Practice:</b> Practice makes perfect! With QuizMaster
              Pro, there are no limits to how many times you can take a quiz.
              Hone your skills, master your subjects, and boost your confidence
              at your own pace.
            </li>
            <li>
              <b>Comprehensive Question Bank:</b> Our extensive question bank
              covers a wide range of topics and difficulty levels. From
              multiple-choice to scenario-based questions, we've got you covered
              across various subjects and disciplines.
            </li>
            <li>
              <b>Instant Feedback:</b> Receive immediate feedback on your
              performance after each quiz. Identify strengths and areas for
              improvement, allowing you to tailor your study plan effectively.
            </li>
          </ol>
        </div>
      </main>
    </section>
  );
  return content;
};
export default Home;
