import React from 'react'
import { useGlobalContext } from './context'

const SetupForm = () => {

  const {quiz,handleChange,isError,handleSubmit} = useGlobalContext();

  const {amount,category,difficulty} = quiz;

  return <section className='quiz quiz-small'>
    <form className='setup-form' onSubmit={handleSubmit}>
      <h2>setup quiz</h2>
      {/* amount */}
      <div className='form-control'>
        <label htmlFor='amount'>number of questions</label>
        <input type='number' name='amount' id='amount' className='form-input'
              min='1' max='50' value={amount} onChange={(e)=>handleChange(e)}/>
      </div>
      {/* category */}
      <div className='form-control'>
        <label htmlFor='category'>number of questions</label>
        <select name='category' id='category' className='form-input' value={category} onChange={(e)=>handleChange(e)}>
          <option value='sports'>sports</option>
          <option value='history'>history</option>
          <option value='politics'>politics</option>
        </select>
      </div>
      {/* difficulty */}
      <div className='form-control'>
        <label htmlFor='difficulty'>number of questions</label>
        <select name='difficulty' id='difficulty' className='form-input' value={difficulty} onChange={(e)=>handleChange(e)}>
          <option value='easy'>easy</option>
          <option value='medium'>medium</option>
          <option value='hard'>hard</option>
        </select>
      </div>
      {isError && <p className='error'>can't generate questions, please try different options</p>}
      <button type='submit' className='submit-btn'>start</button>
    </form>
  </section>
}

export default SetupForm
