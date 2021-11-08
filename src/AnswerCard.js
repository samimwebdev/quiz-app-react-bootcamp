import React from 'react'

export class AnswerCard extends React.Component {
  selectAnswer = answerText => {
    console.log(this.props.selectAnswer(answerText))
  }

  render() {
    const { answerText, correctAnswer, currentAnswer } = this.props
    const isRightAnswer = currentAnswer && answerText === correctAnswer
    const isWrongAnswer =
      answerText === currentAnswer && currentAnswer !== correctAnswer

    const correctClass = isRightAnswer ? 'correct-answer' : ''
    const wrongClass = isWrongAnswer ? 'incorrect-answer' : ''
    const disableClass = currentAnswer && 'disabled-answer'
    return (
      <div
        className={`quiz-answer ${correctClass} ${wrongClass} ${disableClass}`}
        onClick={() => this.selectAnswer(answerText)}
      >
        {' '}
        {answerText}
      </div>
    )
  }
}
