import { useState } from 'react';
import { QUESTIONS } from '../../questions';
import './Quiz.scss';

export const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const activeQuestionIndex = userAnswers.length;

  const handleSelectedAnswer = (selectedAnswer: string) => {
    setUserAnswers((prevUserAnswer) => {
      return [...prevUserAnswer, selectedAnswer];
    });
  };
  return (
    <div id='question'>
      <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
      <ul id='answers'>
        {QUESTIONS[activeQuestionIndex].answers.map((answer) => (
          <li key={answer} className='answer'>
            <button onClick={() => handleSelectedAnswer(answer)}>
              {answer}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
