import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Head from 'next/head'
import '../../styles/styles.scss'

const Show = () => {
  const router = useRouter()
  const { id } = router.query
  const [book, setBook] = useState({ title: 'Bookshelf' })

  useEffect(() => {
    getData(id)
  }, [id])

  const getData = async (id) => {
    if (!id) return false
    const response = await axios.get(`${ process.env.API_URL }/books/${id}`)
    return setBook(response.data)
  }

  return (
    <div>
      <Head>
        <title>{ book.title }</title>
      </Head>
      <div className="container">
        <section className="section">
          <div className="columns">
            <div className="column is-6 is-offset-3">
              <div className="card">
                <div className="card-content">
                  <div className="media">
                    <div className="media-left">
                      <figure className="image">
                        <img src={ book.image } alt="Book image"/>
                      </figure>
                    </div>
                    <div className="media-content">
                      <p className="title is-4">{book.title}</p>
                      <p className="subtitle is-6">{book.author}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Show
