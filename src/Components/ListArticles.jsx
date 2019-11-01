import React, { Component } from 'react'
import { getData } from '../Modules/RequestArticles'
import { Container, Header, Item } from 'semantic-ui-react'
import ViewArticle from './ViewArticle';

class ListArticles extends Component {
  state = {
    articles: [],
    error_message: null,
    renderArticle: false,
    renderArticleId: null
  }

  componentDidMount() {
    this.getArticles()
  }

  setErrorMessage = (error) => {
    this.setState({
      error_message: error
    })
  }

  makeIngress = (content, wordcount) => {
    let ingress = content.split(' ').slice(0, wordcount).join(' ')
    return ingress + ' ...'
  }

  async getArticles() {
    let result = await getData()

    if (result.status === 400) {
      this.setErrorMessage(result.error_message)
    } else {
      this.setState({
        articles: result.data
      })
    }
  }

  renderArticleHandler = (chosenArticle) => {
     this.setState({
       renderArticle: true,
       chosenArticleId: chosenArticle 
    })
  }

  render() {
    let renderListArticles;
    let renderArticle = this.state.renderArticle
    const articleData = this.state.articles
    let specificArticle
    let error_message

    if (this.state.error_message) {
      error_message = <p>{ this.state.error_message }</p>
    }
  if (articleData.length !== 0) {
      if (renderArticle === false) {
        renderListArticles = (
          <>
            {articleData.map(article => {
              return <div id={`article_${article.id}`} onClick={() => {this.renderArticleHandler(article.id)}} key={article.id}>
                <Item.Group> 
                  <Item>
                    <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    <Item.Content>
                      <Item.Description>{article.publish_date}</Item.Description>
                      <Item.Header as="h1">{article.title}</Item.Header>
                      <Item.Meta name="article-content">{this.makeIngress(article.content, 15)}</Item.Meta>
                      <Item.Extra>{article.author}</Item.Extra>
                    </Item.Content>
                  </Item>
                </Item.Group> 
              </div>
            })}
          </>
        )
      }
    }
    if (renderArticle === true) {
      specificArticle = (
        <ViewArticle
          chosenArticle = {this.state.chosenArticleId}
          renderErrorMessage = {this.setErrorMessage}
        />
      )
    }

    return(
      <>
        <Container text>
          <Item.Group>
            <Header as='h1' id="header-title">Classy News</Header>
            {renderListArticles}
            {specificArticle}
            {error_message}
          </Item.Group>
        </Container>
      </>
    )
  }
}

export default ListArticles