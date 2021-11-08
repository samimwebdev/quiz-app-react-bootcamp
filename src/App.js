import React from 'react'

import { QuestionCard } from './QuestionCard'
import { shuffle } from './utils'

const initialState = {
  quizzes: [],
  currentQuestionIndex: 0,
  currentAnswers: [],
  startQuiz: false,
  endGame: false,
  currentAnswer: '',
  correctAnswer: '',
  totalScore: 0
}

class App extends React.Component {
  state = initialState

  fetchQuiz = async () => {
    console.log('calling..')
    const res = await fetch(
      'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'
    )

    const { results } = await res.json()

    this.setState({
      quizzes: results,
      currentAnswers: shuffle(results[0]),
      correctAnswer: results[0].correct_answer,
      startQuiz: true,
      endGame: false
    })
  }

  selectAnswer = answerText => {
    const isCorrect = answerText === this.state.correctAnswer
    const { totalScore } = this.state
    this.setState({
      currentAnswer: answerText,
      totalScore: isCorrect ? totalScore + 1 : totalScore
    })
  }

  navigateNext = () => {
    const isLastQuestion =
      this.state.currentQuestionIndex === this.state.quizzes.length - 1

    if (!isLastQuestion) {
      this.setState(prevState => {
        const updatedQuestionIndex = prevState.currentQuestionIndex + 1
        return {
          currentQuestionIndex: updatedQuestionIndex,
          currentAnswers: shuffle(prevState.quizzes[updatedQuestionIndex]),
          correctAnswer: prevState.quizzes[updatedQuestionIndex].correct_answer,
          currentAnswer: ''
        }
      })
    } else {
      this.setState({
        endGame: true
      })
    }
  }

  resetQuiz = () => {
    this.setState({
      ...initialState
    })
  }

  render() {
    const {
      quizzes,
      currentQuestionIndex,
      currentAnswers,
      startQuiz,
      endGame,
      totalScore,
      correctAnswer,
      currentAnswer
    } = this.state

    return (
      <div className='container'>
        {endGame && (
          <div className='result'>
            <h3>Result page</h3>
            <p>Score {totalScore}</p>
            <button onClick={this.resetQuiz} className='btn restart-btn'>
              Start Quiz Again
            </button>
          </div>
        )}

        {!startQuiz && (
          <button className='btn start-quiz' onClick={this.fetchQuiz}>
            Start Quiz
          </button>
        )}

        {startQuiz && !endGame && (
          <QuestionCard
            currentAnswers={currentAnswers}
            quiz={quizzes[currentQuestionIndex]}
            navigateNext={this.navigateNext}
            currentQuestionIndex={currentQuestionIndex}
            selectAnswer={this.selectAnswer}
            quizzes={quizzes}
            correctAnswer={correctAnswer}
            currentAnswer={currentAnswer}
          />
        )}
      </div>
    )
  }
}

export default App
