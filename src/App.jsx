import { useEffect, useReducer } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Start from "./components/Start";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const initialState = {
  questions: [],
  status: "loading", //"loading", "error", "ready", "active", "finished"
  index: 0,
  answered: null,
  points: 0,
  highScore: 0,
  timeRemaining: null, // in seconds
};

const SEC_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "DATA_RECEIVED": {
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    }
    case "FETCH_FAILED": {
      return {
        ...state,
        status: "error",
      };
    }
    case "START_QUIZ": {
      return {
        ...state,
        status: "active",
        timeRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    }
    case "SET_ANSWER": {
      const currentQuestion = state.questions.at(state.index);
      return {
        ...state,
        answered: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    }
    case "SET_NEXT_QUESTION": {
      return {
        ...state,
        index: state.index + 1,
        answered: null,
      };
    }
    case "END_QUIZ": {
      return {
        ...state,
        status: "finished",
        highScore: Math.max(state.highScore, state.points),
      };
    }
    case "RESTART_QUIZ": {
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
      };
    }
    case "TICK": {
      return {
        ...state,
        timeRemaining: state.timeRemaining - 1,
        status: state.timeRemaining > 0 ? state.status : "finished",
      };
    }
    default:
      throw new Error("Invalid action");
  }
}

export default function App() {
  const [
    { questions, status, index, answered, points, highScore, timeRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPoints = questions.reduce(
    (pointsSum, question) => pointsSum + question.points,
    0
  );

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("http://localhost:8000/questions");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        dispatch({ type: "DATA_RECEIVED", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAILED" });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Start numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answered={answered}
            />
            <Question
              question={questions[index]}
              answered={answered}
              dispatch={dispatch}
            />
            <Footer>
              <Timer dispatch={dispatch} timeRemaining={timeRemaining} />
              <NextButton
                answered={answered}
                dispatch={dispatch}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
