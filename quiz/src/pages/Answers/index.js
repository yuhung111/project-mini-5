import { useEffect, useState } from "react"
import { getAnswerByUserId } from "../../services/answerService"
import { getTopicList } from "../../services/topicsService"
import { Table } from "antd"
import { Link } from "react-router-dom"

function Answers() {
    const [ansData, setAnsData] = useState()
    useEffect(() => {
        const fetchApi = async () => {
            const answerByUserId = await getAnswerByUserId()
            const topics = await getTopicList()
            console.log(answerByUserId)
            console.log(topics)
            let result = []
            for (let i = 0; i < answerByUserId.length; i++) {
                result.push({
                    ...topics.find(item => item.id === answerByUserId[i].topicId),
                    ...answerByUserId[i]
                })
            }
            setAnsData(result.reverse())
        }
        fetchApi()
    }, [])
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            render: (_, record) => {
                return (
                    <>{record.id}</>
                )
            }
        },
        {
            title: 'Tên chủ đề',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => {
                return (
                    <>{record.name}</>
                )
            }
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                console.log(record)
                return (
                    <><Link to={"/result/" + record.id}>Xem chi tiết</Link></>
                )
            }
        },
    ];
    return (
        <>
            <h2>Danh sách chủ đề</h2>
            <Table columns={columns} dataSource={ansData} rowKey="id">
            </Table>
        </>
    )
}

export default Answers