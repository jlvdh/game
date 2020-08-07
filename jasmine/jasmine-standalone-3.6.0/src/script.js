//hello-section
//greeting on the 1st screen
//track the input
let greetingButton = document.getElementsByClassName('name-btn')[0]
let inputName = document.getElementById('stranger-name');
let parentGreetingElement = document.getElementsByClassName('hello-section')[0]
let startBtn = document.createElement('button')

//check that a user put the name
function strangerNameLength() {
   return inputName.value.length;
} 
//what to show if the name was added
function addPAndStartButton() {
  let p = document.createElement('p')
  p.appendChild(document.createTextNode(`${inputName.value}! I have a nice game for you! If you wanna play - click the Start button!`))
  parentGreetingElement.appendChild(p)
  //let startBtn = document.createElement('button')
  parentGreetingElement.appendChild(startBtn)
  startBtn.classList.add('start-btn')
  startBtn.innerHTML = 'LET\'S GO!!'
  return startBtn

}
//if a user submitted the input by Enter
function greetAfterKeypress(event) {
  if (strangerNameLength() > 0 && event.keyCode === 13) {
    addPAndStartButton();
   // let letgoButton = document.getElementsByClassName('start-btn')[0]
  } else if (event.keyCode === 13) {
    alert('please, put your name');
  }
}
//if a user submitted the unput by clicking the button 
function greetAfterClick() {
  if (strangerNameLength() > 0) {
    addPAndStartButton();
   // let letgoButton = document.getElementsByClassName('start-btn')[0]
    
  } else {
    alert('please, put your name');
  }
}  
//add listeners to greet a user
inputName.addEventListener('keypress', greetAfterKeypress)
greetingButton.addEventListener('click', greetAfterClick)

//add listener for the start button
startBtn.addEventListener('click', function() {
  addQuizSection();
}) 



//working with the new elements in the quiz page
let bannerSectionQuiz = document.createElement('div')
let bannerParent = document.getElementsByClassName('parent-section')[0]
let bodyParent = document.querySelector('body')

//after click of the start button -  generate the 1st section of the game
function addQuizSection() {
  quizHolers();
}

//generate the questions and answers holders
let quizSection = document.getElementsByClassName('quiz')[0]

function quizHolers() {
  quizSection.classList.toggle('hide')
  showData()
}


class Quiz {
  constructor(questions,question, answers, correctness) {
      this.questions = questions;
      this.question = question;
      this.answers = answers;
      this.correctness = correctness;
      this.score = 0;
      this.usedQuestions = [];
      this.index = 0;
      this.message = '';
  }
  provideQuestion() {
    if (this.index  ===  this.questions.length) {
     this.message = `Hey! I don't have any questions for you, your score is ${this.score}`
     clearQuizPart()

    } else {
      this.question = this.questions[this.index].question;
      this.answerOne = this.questions[this.index].answers[1];
      this.answerTwo = this.questions[this.index].answers[2];
      this.answerThree = this.questions[this.index].answers[3];
      this.answerFour = this.questions[this.index].answers[4];
      this.correctness = this.questions[this.index].correct;

    }

  }
  nextQuestion() {
    this.index += 1;
    console.log(this.index)
    console.log(this.questions.length)
    this.provideQuestion();
  }
    /* add an event after clicking as a par-r of the method */
    correctAnswer() {
      this.score += 1;
      switch (this.score) {

        case 1: 
        this.message = `Cool! you increased your score, now it is ${this.score}`
        break;
        case 2:
          this.message = `Wow, ${inputName.value}! What is next?`
          break;
        case 3:
          this.message = `${inputName.value}, you are unstoppable!`
          break;
      }
      
    }

}

const questionObject = new Quiz(questionsList, questionsList.question, questionsList.answers, questionsList.correct)

//add listeners for the question and answers and next button
let questionHolder = document.getElementById('question')
//let allAnswerButtons = [...document.getElementsByClassName('btn-answer')];
let answerOneHolder = document.getElementsByClassName('answer-one')[0]
let answerOTwoHolder = document.getElementsByClassName('answer-two')[0]
let answerThreeHolder = document.getElementsByClassName('answer-three')[0]
let answerFourHolder = document.getElementsByClassName('answer-four')[0]
let nextBtn = document.getElementsByClassName('next')[0]
let btn = [...document.getElementsByClassName('btn-answer')]
let scoreHolder = document.getElementById('score')
let congrats = document.getElementById('congratulation');
let parentOfQuizSection = document.getElementById('all-buttons')
let parentOFAnswerButtons = document.getElementById('answer-buttons')
//the next button to load the new section




//add content to the quiz section on the webpage
function showData() {
  questionObject.provideQuestion()
  //show the question
  questionHolder.innerHTML = questionObject.question
  //show the answer option
  answerOneHolder.innerHTML = questionObject.answerOne;
  answerOTwoHolder.innerHTML = questionObject.answerTwo;
  answerThreeHolder.innerHTML = questionObject.answerThree;
  answerFourHolder.innerHTML = questionObject.answerFour;
  //make the buttons clickable
  answerOneHolder.disabled = false;
  answerOTwoHolder.disabled = false;
  answerThreeHolder.disabled = false;
  answerFourHolder.disabled = false;
  nextBtn.disabled = true;

}




btn.forEach(element => {
  element.addEventListener('click', function() {
    if (element.innerHTML === questionObject.correctness) {
      alert("correct")
      questionObject.correctAnswer()
      scoreHolder.innerHTML = questionObject.score
      congrats.innerHTML = questionObject.message;

    } else {
      alert('incorrect')
      //show correct answer
      congrats.innerHTML = questionObject.message;
      
    }
    //work with the next button
    answerOneHolder.disabled = true;
    answerOTwoHolder.disabled = true;
    answerThreeHolder.disabled = true;
    answerFourHolder.disabled = true;
    nextBtn.disabled = false
    nextBtn.classList.toggle('active')
  })
})

nextBtn.addEventListener('click', function() {
 /*  questionObject.correctAnswer(); */
  questionObject.nextQuestion();
  //questionObject.provideQuestion();
  questionObject.message = ''
  showData();
})

function clearQuizPart() {
  parentOfQuizSection.removeChild(questionHolder);
  btn.forEach(item => {
    parentOFAnswerButtons.removeChild(item);
  })
  parentOfQuizSection.removeChild(nextBtn);
  questionObject.message = `ok, ${inputName.value}, let\'s check a new adventure! Maybe you can increase your score even more?`
  congrats.innerHTML = questionObject.message;
  showNextBtnAfterQuiz()

}
let startSecondGame = document.createElement('button')
let parentSecondGame  = document.getElementById('question-container')

function showNextBtnAfterQuiz() {
 
  startSecondGame.innerHTML = 'Hey, what is next?'
  parentSecondGame.appendChild(startSecondGame)
}

//second game
let gameSection = document.getElementsByClassName('second-game')[0]

//after click of the start button -  generate the 1st section of the game
startSecondGame.addEventListener('click', gameHolders)
//content
let secondScore = document.getElementsByClassName('score-wrapper-second-game')[0]
let catchBtn = document.getElementsByClassName('catch')[0]
let info = document.getElementsByClassName('info')[0]
let animationSection = document.getElementsByClassName('animation')[0]




function gameHolders() {
  gameSection.classList.toggle('hide')
  secondScore.innerHTML = ''
}

catchBtn.addEventListener('click', function() {
  catchBtn.classList.add('first')
  catchBtn.addEventListener('click', function() {
    catchBtn.classList.remove('first')
    catchBtn.classList.add('second')
    catchBtn.addEventListener('click', function() {
      catchBtn.classList.remove('second')
      catchBtn.classList.add('third')
      catchBtn.addEventListener('click', function() {
        info.innerHTML = "It was a small joke 😀 Here are 10 points for you!"
        questionObject.score += 10
        secondScore.innerHTML = `YOUR SCORE IS: ${questionObject.score}`
        catchBtn.innerHTML = 'Let\'s check the results!'
        catchBtn.addEventListener('click', function() {
          animationSection.classList.toggle('hide')

        })
      })
    })
  })
})




