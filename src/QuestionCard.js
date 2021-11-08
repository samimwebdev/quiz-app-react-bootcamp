import React from 'react'
import { AnswerCard } from './AnswerCard'

export class QuestionCard extends React.Component {
  navigateNext = () => {
    this.props.navigateNext()
  }
  render() {
    const {
      quiz,
      quizzes,
      currentAnswers,
      currentQuestionIndex,
      selectAnswer,
      correctAnswer,
      currentAnswer
    } = this.props

    console.log(this.props)

    return (
      <div className='question-card'>
        <p>
          Question:{currentQuestionIndex + 1}/ {quizzes.length}{' '}
        </p>
        <h2>{quiz?.question}</h2>
        {currentAnswers.map((q, i) => (
          <AnswerCard
            correctAnswer={correctAnswer}
            selectAnswer={selectAnswer}
            currentAnswer={currentAnswer}
            key={i}
            answerText={q}
          />
        ))}
        <button className='next-question' onClick={this.navigateNext}>
          Next Question
        </button>
      </div>
    )
  }
}
