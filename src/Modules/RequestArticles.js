import axios from 'axios'

const apiUrl = 'http://localhost:3000/api/v1/'

const getData = async () => {
  try {
    let response = await axios.get(apiUrl + 'articles')
    return response
  } catch (error) {
    return {
      error_message: error.message,
      status: 400
    }
  }
}

const submitArticle = async (title, content, author, category, publish_date) => {
  try {
    let response = await axios.post(
      apiUrl + 'articles',
      {
        title: title,
        content: content,
        author: author,
        category: category,
        publish_date: publish_date
      }
    )
    return response
  } catch (error) {
    return error.message
  }
}

const getArticle = async (chosenArticle) => {
  try {
    let response = await axios.get(apiUrl + `articles/${chosenArticle}`)
    return response 
  } catch(error) {
    return error.response.data.error_message
  }
}

export { getData, submitArticle, getArticle }