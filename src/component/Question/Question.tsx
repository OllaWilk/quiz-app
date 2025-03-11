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

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

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
      }, 2000);
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
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeOut={answer.selectedAnswer === '' ? onSkipAnswer : null}
        mode={answerState}
      />
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
