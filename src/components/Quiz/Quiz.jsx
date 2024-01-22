import { useState } from "react";
import { resultInitialState } from "../../constants";
import AnswerTimer from "../Answertimer/AnswerTimer";
import "./Quiz.scss";
import Result from "../Result/Result";

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);
  const [showAnswerTimer, setshowAnswerTimer] = useState(true);
  const [inputAnswer, setInputAnswer] = useState("");

  const { question, choices, correctAnswer, type } = questions[currentQuestion];

  const onAnswerClick = (choice, index) => {
    setAnswerIdx(index);
    if (choice === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const onClickNext = (finalAnswer) => {
    setAnswerIdx(null);
    setshowAnswerTimer(false);
    setInputAnswer("");

    setResult((prev) =>
      finalAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    setAnswerIdx(null);
    setAnswer(null);

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }

    setTimeout(() => {
      setshowAnswerTimer(true);
    });
  };

  const onTryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false);
    setCurrentQuestion(0);
  };

  const handleTimeup = () => {
    setAnswer(false);
    onClickNext(false);
  };

  const handleInputChange = (evt) => {
    setInputAnswer(evt.target.value);
    if (evt.target.value === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const getAnswerUI = () => {
    if (type === "FIB") {
      return <input value={inputAnswer} onChange={handleInputChange} />;
    }

    return (
      <ul>
        {choices.map((choice, index) => (
          <li
            onClick={() => onAnswerClick(choice, index)}
            key={choice}
            className={answerIdx === index ? "selected-answer" : null}
          >
            {choice}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
          {showAnswerTimer && (
            <AnswerTimer duration={15} onTimeUp={handleTimeup} />
          )}
          <span className="active-question-no">{currentQuestion + 1}</span>
          <span className="total-question">/{questions.length}</span>
          <h2>{question}</h2>
          {getAnswerUI()}
          <div className="footer">
            <button
              onClick={() => onClickNext(answer)}
              disabled={answerIdx === null && !inputAnswer}
            >
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <Result
          result={result}
          onTryAgain={onTryAgain}
          totalQuestions={questions.length}
        />
      )}
    </div>
  );
};

export default Quiz;
