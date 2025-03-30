import axios from 'axios'
import { useEffect, useState } from "react"
import { Location, useLocation } from "react-router"
import { Article } from "../../types/Article.ts"
import { Reaction } from '../../types/Reaction.ts'

function ArticleRead() {
  const location = useLocation()

  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)


  // TODO: tie reactions to user, persistent + block >1 reactions
  async function addReaction(articleId: string, reaction: Reaction): Promise<void> {
    const res = await axios.post('/api/addReaction', { articleId, reaction })
    const data = res.data
    console.log(data)
  }

  // TODO fix this jank
  useEffect(() => {
    function getArticleId(location: Location<any>): string | null {
      const queryParameters = new URLSearchParams(location.search)
      return queryParameters.get('id')
    }

    // TODO split up so not setting in get fcn, make sure namespace makes sense
    async function getArticle(articleId: string): Promise<void> {
      const res = await axios.get('/api/getArticle', { params: { articleId } })
      const data = res.data
      console.log(data)
      if (data.body.article !== null) {
        setArticle(data.body.article)
      }
    }

    const articleId: string | null = getArticleId(location)
    if (articleId === null) {
      setError(true)
    }
    else {
      // TODO: something like pendingArticle = getArticle(...); if pendingArtciel !== null, setArticle(...)
      getArticle(articleId)
    }
    setLoading(false)

  }, [])

  if (loading) {
    console.log('loading')
    return <>
      <p>loading...</p>
    </>
  }

  if (error) {
    console.log('error')
    return <p>error</p>
  }

  // TODO: clean this up, need to use? to make not error... i think it gets past load before article is set so it runs it before article = anything so it errors, idk
  return (
    <>
      <h1>article view</h1>
      <br />
      <div style={{ border: 'solid black 1px', padding: '1rem' }}>
        <h1>title: {article?.title}</h1>
        <p>body: {article?.body}</p>
        <button onClick={() => addReaction(article!._id, Reaction.ThumbsUp)}>👍 {article?.reactions[Reaction.ThumbsUp] ?? 0}</button>
        <button onClick={() => addReaction(article!._id, Reaction.ThumbsDown)}>👎 {article?.reactions[Reaction.ThumbsDown] ?? 0}</button>
      </div>
    </>
  )
}

export default ArticleRead
