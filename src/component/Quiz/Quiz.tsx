import { useState, useCallback, useRef } from 'react';
import { QUESTIONS } from '../../questions';
import { Summary } from '../Summary/Summary';
import { QuestionTimer } from '../QuestionTimer/QuestionTimer';
import './Quiz.scss';

export const Quiz = () => {
  const shuffledAnswers = useRef<string[] | null>(null);
  const [answerState, setAnswersState] = useState('');
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);

  const activeQuestionIndex =
    answerState === '' ? userAnswers.length : userAnswers.length - 1;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectedAnswer = useCallback(
    (selectedAnswer: string | null) => {
      setAnswersState('answered');
      setUserAnswers((prevUserAnswer) => {
        return [...prevUserAnswer, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswersState('correct');
        } else {
          setAnswersState('wrong');
        }

        setTimeout(() => {
          setAnswersState('');
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectedAnswer(null),
    [handleSelectedAnswer]
  );

  if (quizIsComplete) {
    return <Summary />;
  }

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <div id='quiz'>
      <div id='question'>
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeOut={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id='answers'>
          {shuffledAnswers.current.map((answer: string) => {
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            let cssClasse = '';

            if (answerState === 'answered' && isSelected) {
              cssClasse = 'selected';
            }

            if (
              (answerState === 'correct' || answerState === 'wrong') &&
              isSelected
            ) {
              cssClasse = answerState;
            }

            return (
              <li key={answer} className='answer'>
                <button
                  id='answer'
                  onClick={() => handleSelectedAnswer(answer)}
                  className={cssClasse}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
