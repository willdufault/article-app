import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  interface Article {
    title: string,
    body: string
  }

  const [articles, setArticles] = useState<Article[]>([])

  async function getArticles() {
    const res = await fetch('/getArticles', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    const json = await res.json()
    console.log(json['body']['articles'])
    alert('printed articles to console')
    setArticles(json['body']['articles'])
  }

  async function createArticle() {
    const res = await fetch('/createArticle', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    })
    const json = await res.json()
    console.log(json['body']['article'])
    alert('printed new article to console')
  }

  async function deleteArticles() {
    const res = await fetch('/deleteArticles', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    })
    const json = await res.json()
    console.log(json['body']['message'])
    alert('printed deleteArticles output to console')
  }

  // fetch articles on page load
  useEffect(() => {
    getArticles()
  }, [])

  return (
    <>
      <div>
        <button onClick={getArticles}>get articles</button>
        <button onClick={createArticle}>create article</button>
        <button onClick={deleteArticles}>delete articles</button>
      </div>
      <br />
      <h1>Articles:</h1>
      {articles.map((article, index) =>
        <div key={index}>
          <div style={{ border: 'solid white 1px', padding: '1rem' }}>
            <h1>{article.title}</h1>
            <p>{article.body}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default App
