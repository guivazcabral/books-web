import React, { useEffect, useState } from 'react'
import axios from 'axios'
import qs from 'qs'
import Head from 'next/head'
import '../styles/styles.scss'
import Link from 'next/link'

const Home = () => {
  const [books, setBooks] = useState([])
  const [totalBooks, setTotalBooks] = useState(null)
  const [page, setPage] = useState(1)
  const [loadMore, setLoadMore] = useState(true)

  const [search, setSearch] = useState({
    title: '',
    author: '',
    isbn: ''
  })

  useEffect(() => {
    loadMore && getData(search, page)
  }, [search, loadMore])

  useEffect(() => {
    const list = document.getElementById('list')
    window.addEventListener('scroll', () => {
      if (window.scrollY + window.innerHeight === list.clientHeight + list.offsetTop) {
        setLoadMore(true)
      }
    })
  }, [])

  const getData = async (search, page) => {
    setLoadMore(false)
    const query = qs.stringify({ ...search, page })
    const response = await axios.get(`${ process.env.API_URL }/books?${ query }`)
    setBooks([...books, ...response.data.data])
    setTotalBooks(response.data.total)
    setPage(page + 1)
  }

  const handleChange = ({ target }) => {
    const { name, value } = target
    setSearch({ ...search, [name]: value })
    setBooks([])
    setLoadMore(true)
    setPage(1)
  }

  return (
    <div>
      <Head>
        <title>Bookshelf</title>
      </Head>
      <div className="container" id="list">
        <section className="section">
          <div className="columns">
            <div className="column">
              <input className="input" type="text" placeholder="ISBN" name="isbn" onChange={ handleChange }/>
            </div>
            <div className="column">
              <input className="input" type="text" placeholder="Title" name="title" onChange={ handleChange }/>
            </div>
            <div className="column">
              <input className="input" type="text" placeholder="Author" name="author" onChange={ handleChange }/>
            </div>
          </div>
          <div className="columns is-vcentered">
            <div className="column is-narrow">
              <Link href={ `/book/add` }><a className="button">Add new book</a></Link>
            </div>
            <div className="column is-narrow">
              { totalBooks !== null
                && <>{ totalBooks } { totalBooks === 1 ? 'book' : 'books' }</>
              }
            </div>
          </div>
        </section>
        <section className="section">
          <div className="columns">
            <div className="column is-12">
              <div className="table-container">
                <table className="table">
                  <thead>
                  <tr>
                    <td>ISBN</td>
                    <td>Title</td>
                    <td>Author</td>
                  </tr>
                  </thead>
                  <tbody>
                  { books.map(b => (
                    <tr key={ b._id }>
                      <td>{ b.isbn }</td>
                      <td><Link href={ `/book/[id]` } as={ `/book/${ b._id }` }><a>{ b.title }</a></Link></td>
                      <td>{ b.author }</td>
                    </tr>
                  )) }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
