import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./assets/style.css";
import quizservice from './quizservice/index'
import QuestionBox from './components/QuestionBox'
import Result from './components/Result'

class Quiz extends Component {
    state={
        questionBank: [],
        score:0,
        response:0
    };

    computeAnswer=(answer, correctAnswer)=>{
        if(answer === correctAnswer){
            this.setState({
                score:this.state.score+1
            })

        }
        this.setState({
            response:this.state.response < 5 ? this.state.response+1:5
        })

    };

    getquestions=()=>{
        quizservice().then(question =>{
            this.setState({
                questionBank:question
            });
        });
    };

playAgain =()=>{
this.getquestions();
this.setState({
    score:0,
    response:0
})
}


    componentDidMount(){
        this.getquestions();
    }
    
    render() {
        return (
            <div className="container">
                <div className="title">Bazooka</div>
                
                {this.state.questionBank.length > 0 &&
                this.state.response<5
                && this.state.questionBank.map(
                    ({question,answers,correct,questionId}) => (
                 <QuestionBox 
                 question ={question}
                 options={answers}
             
                 selected={answer => this.computeAnswer(answer,correct)}
                />)
                )}
            {this.state.response ===5 ?(<Result score={this.state.score} playAgain={this.playAgain}/>):null}
            </div>

        );
    }
}



ReactDOM.render(<Quiz/>, document.getElementById('root'));
