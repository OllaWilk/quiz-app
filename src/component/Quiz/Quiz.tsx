import { useState } from 'react';
import { QUESTIONS } from '../../questions';
import './Quiz.scss';

export const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const activeQuestionIndex = userAnswers.length;
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  const handleSelectedAnswer = (selectedAnswer: string) => {
    setUserAnswers((prevUserAnswer) => {
      return [...prevUserAnswer, selectedAnswer];
    });
  };
  return (
    <div id='quiz'>
      <div id='question'>
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id='answers'>
          {shuffledAnswers.map((answer) => (
            <li key={answer} className='answer'>
              <button onClick={() => handleSelectedAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
