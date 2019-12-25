import React, { useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import '../../styles/styles.scss'

const Add = () => {
  const [isbn, setIsbn] = useState('')
  const [status, setStatus] = useState(null)

  const submit = async (isbn) => {
    const response = await axios.post(`${ process.env.API_URL }/books/${ isbn }`)
    if (response.status && response.status === 200) {
      setStatus('success')
      setIsbn('')
    } else {
      setStatus('error')
    }
  }

  const handleChange = ({ target }) => {
    const { value } = target
    setIsbn(value)
    setStatus(null)
  }

  return (
    <div>
      <Head>
        <title>Add a book</title>
      </Head>
      <div className="container">
        <section className="section">
          <div className="columns is-multiline">
            <div className="column is-6 is-offset-3">
              <input className="input" type="text" placeholder="ISBN" name="isbn" value={isbn} onChange={ handleChange }/>
            </div>
            <div className="column is-6 is-offset-3">
              <button className="button is-fullwidth is-primary" onClick={() => submit(isbn)}>Submit</button>
            </div>
          </div>
        </section>
        { status &&
          <section className="section">
            <div className="columns">
              <div className="column is-6 is-offset-3">
                { status === 'success'
                  ? <p>Book created successfully</p>
                  : <p>Error creating book</p>
                }
              </div>
            </div>
          </section>
        }
      </div>
    </div>
  )
}

export default Add
