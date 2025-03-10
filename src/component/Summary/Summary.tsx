import quizImg from '../../assets/quiz-complete.png';
import './Summary.scss';

export const Summary = () => {
  return (
    <div id='summary'>
      <img src={quizImg} alt='summary' />
      <h2>Quiz Completed</h2>
    </div>
  );
};
