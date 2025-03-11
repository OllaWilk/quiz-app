import { useRef } from 'react';
import './Answers.scss';

interface Props {
  answers: string[];
  selectedAnswer: string | null;
  answerState: string;
  onSelect: (answer: string) => void;
}

export const Answers = ({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}: Props) => {
  const shuffledAnswers = useRef<string[] | null>(null);

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id='answers'>
      {shuffledAnswers.current.map((answer: string) => {
        const isSelected = selectedAnswer === answer;
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
              onClick={() => onSelect(answer)}
              className={cssClasse}
              disabled={answerState !== ''}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
