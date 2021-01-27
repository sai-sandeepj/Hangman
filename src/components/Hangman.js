import React, { Component } from 'react';
import generateRandomWord from "./Words.js"

import step0 from "./images/0.jpg"
import step1 from "./images/1.jpg"
import step2 from "./images/2.jpg"
import step3 from "./images/3.jpg"
import step4 from "./images/4.jpg"
import step5 from "./images/5.jpg"
import step6 from "./images/6.jpg"

class Hangman extends Component{

    static defaultProps={
        maxMistakes: 6,
        images: [step0, step1, step2, step3, step4, step5, step6]
    }

    constructor(props){
        super(props);
        this.state = {
            mistakes: 0, //Number of mistakes
            guessedLetters: new Set([]), //Set to store all the guessed letters by the user
            answer: generateRandomWord() //Random word that is to be guessed by the user
        }
    }

    //Update the state of guessedLetters and mistake when the user enter a letter
    handleGuess = (e) => {
        let letter = e.target.value
        this.setState((previousState=>({
            guessedLetters: previousState.guessedLetters.add(letter),
            mistakes: previousState.mistakes + (previousState.answer.includes(letter) ? 0 : 1)
        })))
    }

    //Create blanks(" _ ") and update the blanks based on user input
    guessedWord(){
        return this.state.answer.split("").map(letter => (this.state.guessedLetters.has(letter) ? letter : " _ "))
    }

    //Alphabets as buttons for user input
    generateButtons(){
        return "abcdefghijklmnopqrstuvwxyz".split("").map(letter=>(
            <button 
                className="btn btn-lg btn-primary m-2"
                key={letter}
                value={letter}
                onClick={this.handleGuess}
                disabled={this.state.guessedLetters.has(letter)}
            >
                {letter}
            </button>
        ))
    }

    //Reset the game
    resetButton = () =>{
        this.setState({
            mistakes: 0,
            guessedLetters: new Set([]),
            answer: generateRandomWord()
        })
    }


    render(){
        const gameOver = this.state.mistakes >= this.props.maxMistakes; //Condition to check if wrong guesses has exceded maximum allowed mistakes
        const isWinner=this.guessedWord().join("") === this.state.answer; //Condition to check if the user has guessed the correct word
        let result=""

        if (isWinner){
            result="You Won!"
        }

        if(gameOver){
            result="You lost!"
        }

        return(
            <div className="container">
                <h1 className="text-center">Hangman</h1>
                <div className="float-right">Wrong guesses: {this.state.mistakes} of {this.props.maxMistakes}</div> 
                <div className="text-center">
                    <img src={this.props.images[this.state.mistakes]} alt=""/>
                </div>
                <div className="text-center">
                    <p>Guess the programming language!</p>
                    <p>
                        {gameOver ? this.state.answer : this.guessedWord()}
                    </p>
                    {(isWinner || gameOver) ? "" : <p>{this.generateButtons()}</p>}
                    <p>{result}</p>
                    <button className="btn btn-info" onClick={this.resetButton}>Reset</button>
                </div>
            </div>
        )
    }
}

export default Hangman;