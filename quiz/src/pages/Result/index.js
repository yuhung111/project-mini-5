import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAnswer } from "../../services/answerService"
import { getQuestionList } from "../../services/questionService"
import { Tag } from "antd"
import './Result.scss'

function Result() {
    const params = useParams()
    const [resultData, setResultData] = useState([])
    useEffect(() => {
        const fetchApi = async () => {
            const answersData = await getAnswer(params.id)
            const questionsData = await getQuestionList(answersData.topicId)
            console.log(answersData)
            console.log(questionsData)
            let finalResult = []
            for (let i = 0; i < questionsData.length; i++) {
                finalResult.push({
                    ...questionsData[i],
                    ...answersData.answers.find(item => item.questionId === questionsData[i].id)
                })
            }
            setResultData(finalResult)
        }
        fetchApi()
    }, [])
    console.log(resultData)
    return (
        <>
            <h2>Kết quả:</h2>
            <div className="result__list">
                {resultData.map((item, index) => (
                    <div className='result__item' key={item.id}>
                        <p>
                            Câu {index + 1}: {item.question}
                            {item.answer === item.correctAnswer ? (
                                <Tag color="green">Đúng</Tag>
                            ): (
                                <Tag color="red">Sai</Tag>
                            )}
                        </p>
                        {item.answers.map((ansItem, ansIndex) => {
                            let checked = false
                            let className = ""
                            if (item.answer === ansIndex) {
                                checked = true
                                className = "result__item--selected"
                            }
                            if (item.correctAnswer === ansIndex) {
                                className = "result__item--correct"
                            }
                            return (
                                <div className='result__answer' key={ansIndex}>
                                    <input type="radio" value={ansIndex} name={item.id} checked={checked} disabled id={`quiz-${item.id}-${ansIndex}`} />
                                    <label htmlFor={`quiz-${item.id}-${ansIndex}`} className={className}>{ansItem}</label>
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Result