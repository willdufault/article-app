import { useRef, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router'
import CONSTANTS from '../../constants'
import { createArticle } from '../../services/ArticleService'
import { Article as ArticleType } from '../../types/Article'

function ArticleWrite() {
  const navigate: NavigateFunction = useNavigate()

  const titleInputElement = useRef<HTMLInputElement>(null)
  const bodyInputElement = useRef<HTMLTextAreaElement>(null)
  const topicSelectElement = useRef<HTMLSelectElement>(null)
  const [titleLength, setTitleLength] = useState<number>(0)
  const [bodyLength, setBodyLength] = useState<number>(0)

  /**
   * Create an article and redirect the user to the read view of their article.
   */
  async function createArticleHandler(): Promise<void> {
    if (titleLength == 0 || titleLength > CONSTANTS.TITLE_MAX_LENGTH) {
      alert(
        `Title must be between 1 and ${CONSTANTS.TITLE_MAX_LENGTH} characters.`
      )
      return
    }
    if (bodyLength == 0 || bodyLength > CONSTANTS.BODY_MAX_LENGTH) {
      alert(
        `Body must be between 1 and ${CONSTANTS.BODY_MAX_LENGTH} characters.`
      )
      return
    }
    if (!CONSTANTS.TOPICS.includes(topicSelectElement.current!.value)) {
      alert(`Topic must be one of  ${CONSTANTS.TOPICS}.`)
      return
    }

    const article: ArticleType | null = await createArticle(
      titleInputElement.current!.value,
      bodyInputElement.current!.value,
      topicSelectElement.current!.value
    )
    if (article !== null) {
      navigate(`/read?id=${article._id}`)
    }
  }

  return (
    <>
      <h1>article write</h1>
      <br />
      <div>
        <label>title: </label>
        <input
          ref={titleInputElement}
          onChange={(event) => setTitleLength(event.target.value.length)}
        />
        <p>
          {titleLength}/{CONSTANTS.TITLE_MAX_LENGTH}
        </p>
      </div>
      <br />
      <div>
        <label>topic: </label>
        <select ref={topicSelectElement} defaultValue={CONSTANTS.TOPICS[0]}>
          {CONSTANTS.TOPICS.map((topic: string, index: number) => (
            <option key={index}>{topic}</option>
          ))}
        </select>
      </div>
      <br />
      <div>
        <label>body: </label>
        <textarea
          ref={bodyInputElement}
          onChange={(event) => setBodyLength(event.target.value.length)}
        ></textarea>
        <p>
          {bodyLength}/{CONSTANTS.BODY_MAX_LENGTH}
        </p>
      </div>
      <br />
      <button onClick={createArticleHandler}>submit</button>
    </>
  )
}

export default ArticleWrite
