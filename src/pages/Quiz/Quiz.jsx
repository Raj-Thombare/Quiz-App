import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import Question from "../../components/Question/Question";
import { useData } from "../../context/data-context";
import classes from "./Quiz.module.css";

const Quiz = () => {
  const [options, setOptions] = useState([]);
  const [currQues, setCurrQues] = useState(0);

  const { name, questions, score, error } = useData();

  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          questions[currQues]?.correctAnswer,
          ...questions[currQues]?.incorrectAnswers,
        ])
    );
  }, [questions, currQues]);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  let content;

  if (error) {
    content = <p>{error}</p>;
  } else {
    content = (
      <>
        <span className={classes.subtitle}>Welcome, {name}</span>;
        {questions ? (
          <>
            <div className={classes.quizInfo}>
              <span className={classes.highlight}>
                {questions[currQues]?.category}
              </span>
              <span className={classes.highlight}>Score: {score}</span>
            </div>
            <Question
              options={options}
              currQues={currQues}
              setCurrQues={setCurrQues}
              correct={questions[currQues]?.correctAnswer}
            />
          </>
        ) : (
          <CircularProgress
            style={{ margin: 100 }}
            color="inherit"
            size={50}
            thickness={1}
          />
        )}
      </>
    );
  }

  return <div className={classes.quiz}>{content}</div>;
};

export default Quiz;
