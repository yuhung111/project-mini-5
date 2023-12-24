import { get } from "../utils/request"

export const getQuestionList = async (topicId) => {
    const result = await get(`questions?topicId=${topicId}`)
    return result
}