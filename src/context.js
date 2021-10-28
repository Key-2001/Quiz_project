import axios from 'axios'
import React, { useState, useContext, useEffect,useReducer } from 'react'
import reducer from './reducer'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const url = ''

const initialState = {
  isWaiting: true,
  isLoading: false,
  questions: [],
  index: 0,
  correct: 0,
  isError: false,
  
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {

  const [state,dispatch] = useReducer(reducer,initialState);
  const [quiz,setQuiz] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'easy',
  })
  const [isModalOpen,setIsModalOpen] = useState(false)

  const fetchQuestions = async (url) => {
    dispatch({type:'SET_LOADING'});
    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data.results)
      dispatch({type:'SET_QUESTIONS',payload:data.results})
      if(data.results < 0){
      dispatch({type:'SET_ERROR'})
      }
    } catch (error) {
      console.log(error)
      dispatch({type:'SET_ERROR'})
    }
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({...quiz,[name]:value})
  }

  const handleSubmit = () => {
    const {amount,category,difficulty} = quiz;
    let url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
    fetchQuestions(url);
  }

  const nextQuestion = () => {
    if(state.index < state.questions.length-1){
      dispatch({type:'NEXT_QUESTION'})
    }else{
      openModal();
      // dispatch({type:'RESET'})
    }
  }
  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal =() => {
    setIsModalOpen(false);
    dispatch({type:'RESET_QUIZ'})
  }

  const checkAnswer = (value) => {
    if(value){
      dispatch({type:'CHECK_ANSWER'});
    }
    nextQuestion();
  }
  // useEffect(()=>{
  //   const {amount,category,difficulty} = state.quiz;
  //   fetchQuestions(`${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`)
  // },[])

  return <AppContext.Provider value={{
    ...state,quiz,handleChange,handleSubmit,
    nextQuestion,checkAnswer,isModalOpen,closeModal
  }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
