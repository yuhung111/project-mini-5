import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getTopic } from '../../services/topicsService'
import { getQuestionList } from '../../services/questionService'
import { getCookie } from '../../helpers/cookie'
import { createAnswer } from '../../services/quizService'
import { Form, Radio, Space } from 'antd'

function Quiz() {
    const params = useParams()
    const [topicData, setTopicData] = useState([])
    const navigate = useNavigate()
    const [questionsData, setQuestionsData] = useState([])
    useEffect(() => {
        const fetchApi = async () => {
            const result = await getTopic(params.id)
            setTopicData(result)
        }
        fetchApi()
    }, [])
    useEffect(() => {
        const fetchApi = async () => {
            const result = await getQuestionList(params.id)
            setQuestionsData(result)
        }
        fetchApi()
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()
        let selectedAnswers = []
        for (let i = 0; i < e.target.elements.length; i++) {
            if (e.target.elements[i].checked) {
                const name = e.target.elements[i].name
                const value = e.target.elements[i].value
                console.log(name, value)
                selectedAnswers.push({
                    questionId: parseInt(name),
                    answer: parseInt(value)
                })
            }
        }
        let options = {
            userId: parseInt(getCookie("id")),
            topicId: topicData.id,
            answers: selectedAnswers
        }
        const result = await createAnswer(options)
        if (result) {
            navigate(`/result/${result.id}`)
        }
    }
    return (
        <>
            <h2>Bài quiz chủ đề: {topicData && (<>{topicData.name}</>)}</h2>
            <div className="form-quiz">
                <form onSubmit={handleSubmit}>
                    {questionsData.map((item, index) => (
                        <div className='form-quiz__item' key={item.id}>
                            <p>Câu {index + 1}: {item.question}</p>
                            {item.answers.map((ansItem, ansIndex) => (
                                <div className='form-quiz__answer' key={ansIndex}>
                                    <input type="radio" value={ansIndex} name={item.id} id={`quiz-${item.id}-${ansIndex}`} />
                                    <label htmlFor={`quiz-${item.id}-${ansIndex}`}>{ansItem}</label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button type='submit'>Nộp bài</button>
                </form>
            </div>
        </>
    )
}

export default Quiz