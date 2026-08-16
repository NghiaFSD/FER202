import { useReducer } from "react";

function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "RESET":
      return 0;
    default:
      return state;
  }
}

const questions = [
  {
    id: 1,
    question: "What is the capital of Australia?",
    options: ["Sydney", "Canberra", "Melbourne", "Perth"],
    answer: "Canberra",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    id: 3,
    question: "Which React hook is used for complex state transitions?",
    options: ["useEffect", "useRef", "useReducer", "useMemo"],
    answer: "useReducer",
  },
  {
    id: 4,
    question: "Which method creates a new array from every element?",
    options: ["find", "map", "includes", "pop"],
    answer: "map",
  },
  {
    id: 5,
    question: "What does JSX allow developers to write?",
    options: [
      "SQL in React",
      "HTML-like syntax in JavaScript",
      "Only CSS rules",
      "Server commands",
    ],
    answer: "HTML-like syntax in JavaScript",
  },
];

const initialState = {
  questions,
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  answers: [],
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      return { ...state, selectedOption: action.payload };

    case "NEXT_QUESTION": {
      if (!state.selectedOption) return state;

      const activeQuestion = state.questions[state.currentQuestion];
      const isCorrect = state.selectedOption === activeQuestion.answer;
      const isLastQuestion =
        state.currentQuestion === state.questions.length - 1;
      const answerRecord = {
        questionId: activeQuestion.id,
        selected: state.selectedOption,
        correct: activeQuestion.answer,
        isCorrect,
      };

      return {
        ...state,
        currentQuestion: isLastQuestion
          ? state.currentQuestion
          : state.currentQuestion + 1,
        selectedOption: "",
        score: state.score + (isCorrect ? 1 : 0),
        showScore: isLastQuestion,
        answers: [...state.answers, answerRecord],
      };
    }

    case "RESTART_QUIZ":
      return initialState;

    default:
      return state;
  }
}

function Counter() {
  const [count, dispatch] = useReducer(counterReducer, 0);

  return (
    <section className="counter-card">
      <div className="section-title">
        <span>01</span>
        <div>
          <h2>Reducer Counter</h2>
          <p>Dispatch INCREMENT, DECREMENT and RESET actions.</p>
        </div>
      </div>

      <div className="counter-demo">
        <div className="counter-number" aria-live="polite">
          {count}
        </div>
        <div className="counter-actions">
          <button
            className="round-button"
            onClick={() => dispatch({ type: "DECREMENT" })}
            aria-label="Decrease counter"
          >
            −
          </button>
          <button
            className="reset-button"
            onClick={() => dispatch({ type: "RESET" })}
          >
            Reset
          </button>
          <button
            className="round-button"
            onClick={() => dispatch({ type: "INCREMENT" })}
            aria-label="Increase counter"
          >
            +
          </button>
        </div>
        <div className="action-legend">
          <code>dispatch({"{ type: ACTION }"})</code>
          <span>→</span>
          <code>counterReducer(state, action)</code>
        </div>
      </div>
    </section>
  );
}

function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const {
    questions: quizQuestions,
    currentQuestion,
    selectedOption,
    score,
    showScore,
    answers,
  } = state;

  if (showScore) {
    const percentage = Math.round((score / quizQuestions.length) * 100);

    return (
      <section className="quiz-card">
        <div className="section-title">
          <span>02</span>
          <div>
            <h2>Question Bank</h2>
            <p>The final state is calculated by the reducer.</p>
          </div>
        </div>

        <div className="score-view">
          <div
            className="score-ring"
            style={{ "--score-angle": percentage * 3.6 + "deg" }}
          >
            <div>
              <strong>{percentage}%</strong>
              <span>Your score</span>
            </div>
          </div>
          <h3>
            You answered {score} of {quizQuestions.length} questions correctly.
          </h3>
          <p>
            {percentage >= 80
              ? "Excellent result. You understand these concepts well."
              : percentage >= 50
                ? "Good attempt. Review the answers below and try again."
                : "Review the answers below, then restart the quiz."}
          </p>

          <div className="answer-review">
            {answers.map((answer, index) => (
              <div
                key={answer.questionId}
                className={answer.isCorrect ? "correct" : "incorrect"}
              >
                <span>{answer.isCorrect ? "✓" : "×"}</span>
                <p>
                  <strong>Question {index + 1}</strong>
                  Your answer: {answer.selected}
                  {!answer.isCorrect && <em>Correct: {answer.correct}</em>}
                </p>
              </div>
            ))}
          </div>

          <button
            className="restart-quiz"
            onClick={() => dispatch({ type: "RESTART_QUIZ" })}
          >
            Restart Quiz
          </button>
        </div>
      </section>
    );
  }

  const activeQuestion = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <section className="quiz-card">
      <div className="section-title">
        <span>02</span>
        <div>
          <h2>Question Bank</h2>
          <p>Manage selection, progress, score and restart actions.</p>
        </div>
      </div>

      <div className="quiz-body">
        <div className="quiz-progress-heading">
          <div>
            <span>Question</span>
            <strong>
              {currentQuestion + 1} / {quizQuestions.length}
            </strong>
          </div>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="quiz-progress-track" aria-hidden="true">
          <span style={{ width: progress + "%" }} />
        </div>

        <div className="question-content">
          <p className="question-label">QUESTION {activeQuestion.id}</p>
          <h3>{activeQuestion.question}</h3>
          <div className="options-list">
            {activeQuestion.options.map((option, index) => (
              <button
                key={option}
                className={selectedOption === option ? "selected" : ""}
                onClick={() =>
                  dispatch({ type: "SELECT_OPTION", payload: option })
                }
                aria-pressed={selectedOption === option}
              >
                <span>{String.fromCharCode(65 + index)}</span>
                <strong>{option}</strong>
                <i aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>

        <div className="quiz-footer">
          <span>
            {selectedOption
              ? "Answer selected: " + selectedOption
              : "Select one answer to continue"}
          </span>
          <button
            onClick={() => dispatch({ type: "NEXT_QUESTION" })}
            disabled={!selectedOption}
          >
            {currentQuestion === quizQuestions.length - 1
              ? "Finish Quiz"
              : "Next Question"}
            <b aria-hidden="true">→</b>
          </button>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main>
      <header className="hero">
        <div>
          <p>FER202 · PREDICTABLE STATE</p>
          <h1>Exercise 15: useReducer</h1>
          <span>
            Centralize state transitions in pure reducer functions and trigger
            them with explicit actions.
          </span>
        </div>
        <div className="reducer-flow" aria-hidden="true">
          <span>State</span>
          <b>+</b>
          <span>Action</span>
          <b>→</b>
          <strong>New State</strong>
        </div>
      </header>

      <div className="content-grid">
        <Counter />
        <QuestionBank />
      </div>
    </main>
  );
}

