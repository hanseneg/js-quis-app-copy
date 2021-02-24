import React, { useState, useEffect } from 'react'
import axios from "axios"
import QuestionsForm from "./QuestionsForm"
import { useHistory } from "react-router-dom"

function Questions(props) {
    const [questions, setQuestions] = useState([])
    const [submittedAnswers, setSubmittedAnswers] = useState([])
    const [finalScore, setFinalScore] = useState(0)
    const [showFinalScore, setShowFinalScore] = useState(false)

    let history = useHistory()

    useEffect(() => {
        axios.get("/questions")
            .then(response => setQuestions(response.data))
            .catch(error => console.log(error))
    }, [])

    function submitQuestion(value) {
        console.log(value)
        setSubmittedAnswers(prevSubmittedAnswers => [...prevSubmittedAnswers, value])
    }

    function scoreQuiz() {
        console.log(submittedAnswers)
        let totalCorrect = submittedAnswers.filter(each => each === "true")
        console.log(totalCorrect.length)

        setFinalScore(totalCorrect.length)
        console.log(finalScore)
        setShowFinalScore(true)
    }

    function goToLeaderBoard(event) {
        event.preventDefault()
        history.push("/leaderboard")
    }

    let quizQuestions = questions.map(each => {
        return (
            <QuestionsForm key={each._id} questions={each} submitQuestion={submitQuestion} />
        )
    })
    return (
        <div>
            <h1>Questions</h1>
            {quizQuestions}
            <button onClick={scoreQuiz}>Score Quiz</button>
            <button onClick={goToLeaderBoard}>Scores</button>
            <h1 style={{ display: showFinalScore ? "block" : "none" }}>Final Score: {`You got ${finalScore}/10 correct!`}</h1>
        </div>
    )
}
export default Questions;