import { useState, useCallback } from 'react';
import { QUESTIONS } from '../../questions';
import { Summary } from '../Summary/Summary';
import './Quiz.scss';
import { Question } from '../Question/Question';

export const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectedAnswer = useCallback(function (
    selectedAnswer: string | null
  ) {
    setUserAnswers((prevUserAnswer) => {
      return [...prevUserAnswer, selectedAnswer];
    });
  },
  []);

  const handleSkipAnswer = useCallback(
    () => handleSelectedAnswer(null),
    [handleSelectedAnswer]
  );

  if (quizIsComplete) {
    return <Summary />;
  }
  return (
    <div id='quiz'>
      <Question
        key={activeQuestionIndex}
        questionIndex={activeQuestionIndex}
        onSelectedAnswer={handleSelectedAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
};
