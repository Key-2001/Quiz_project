

const reducer = (state,action) => {
    switch (action.type){
        case ('SET_LOADING'):{
            return{
                ...state,
                isLoading: true,
                isWaiting: false,
                isError: false
            }
        }
        case 'SET_WAITING':{
            return{
                ...state,
                isLoading: false,
                isWaiting: true,
                isError: false
            }
        }
        case 'SET_QUESTIONS':{
            return{
                ...state,
                isLoading: false,
                isWaiting: false,
                isError: false,
                questions: action.payload
            }
        }
        case 'SET_ERROR':{
            return{
                ...state,
                isLoading:false,
                isWaiting: true,
                isError: true,
            }
        }
        case 'NEXT_QUESTION' :{
            return{
                ...state,
                index: state.index + 1
            }
        }
        case 'CHECK_ANSWER':{
            return{
                ...state,
                correct: state.correct + 1
            }
        }
        case 'RESET':{
            return{
                ...state,
                index: 0
            }
        }
        case 'RESET_QUIZ':{
            return{
                ...state,
                isWaiting:true,
                isLoading:false,
                isError:false,
                index: 0,
                correct: 0
            }
        }
        default: return state
    }
}

export default reducer
