import { useState } from 'react';
import { Answers } from '../Answers/Answers';
import { QuestionTimer } from '../QuestionTimer/QuestionTimer';
import './Question.scss';
import { QUESTIONS } from '../../questions';

interface Props {
  onSelectedAnswer: (answer: string) => void;
  onSkipAnswer: () => void;
  questionIndex: number;
}

export const Question = ({
  questionIndex,
  onSelectedAnswer,
  onSkipAnswer,
}: Props) => {
  const [answer, setAnswer] = useState<{
    selectedAnswer: string;
    isCorrect: boolean | null;
  }>({
    selectedAnswer: '',
    isCorrect: null,
  });

  const handleSelectAnswer = function (answer: string) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[questionIndex].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectedAnswer(answer);
      }, 500);
    }, 1000);
  };

  let answerState = '';
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }

  return (
    <div id='question'>
      <QuestionTimer timeout={10000} onTimeOut={onSkipAnswer} />
      <h2>{QUESTIONS[questionIndex].text}</h2>
      <Answers
        answers={QUESTIONS[questionIndex].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
};
