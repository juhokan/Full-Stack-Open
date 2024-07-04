import axios from "axios"
import { DiaryEntry, NewDiaryEntry } from "../model"
import { BASE_URL } from "../config"

const getAll = async () => {
  const { data } = await axios.get(`${BASE_URL}/diaries`)
  return data
}

const create = async (object: NewDiaryEntry) => {
  const { data } = await axios.post<DiaryEntry>(`${BASE_URL}/diaries`, object)
  return data
}

export default {
  getAll, create
}
