import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { getTopicList } from '../../services/topicsService';
import { Link } from 'react-router-dom';

function Topics() {
    const [topics, setTopics] = useState([])
    useEffect(() => {
        const fetchApi = async () => {
            const result = await getTopicList()
            setTopics(result)
        }
        fetchApi()
    },[])
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
                    <><Link to={"/quiz/" + record.id}>Xem chi tiết</Link></>
                )
            }
        }
    ];
    return (
        <>
            <h2>Danh sách chủ đề</h2>
            <Table columns={columns} dataSource={topics} rowKey="id">
            </Table>
        </>
    )
}

export default Topics