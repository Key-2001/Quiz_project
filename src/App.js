import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
function App() {
  const {isWaiting,
        isLoading,
        correct,
        index,questions,
        nextQuestion,checkAnswer
     } 
          = useGlobalContext();
  
  if(isWaiting){
    return <SetupForm/>
  }

  if(isLoading){
    return <Loading/>
  }

  // console.log(questions)
  const {correct_answer,incorrect_answers,question} = questions[index]
  // const answers = [...incorrect_answers,correct_answer]
  const answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  if(tempIndex === 3){
    answers.push(correct_answer);
  }else{
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }
  return <main>
    {/* modal */}
      <Modal/>
    {/* render question */}
    <section className='quiz'>
      <p className='correct-answers'>
        correct_answer : {correct}/{index}
      </p>
      <article className='container'>
        <h2>{question}</h2>
        <div className='btn-container'>
          {answers.map((answer,index) => {
            return (
              <button key={index} 
                      className='answer-btn'
                      onClick={() => checkAnswer(answer === correct_answer)}
              >{answer}</button>
            )
          })}
        </div>
      </article>
      <button className='next-question' onClick={nextQuestion}>next question</button>
    </section>
  </main>
}

export default App
