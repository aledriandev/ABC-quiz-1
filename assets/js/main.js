'use strict';

// Constructor de preguntas
function Questions (question, correct, wrong1,wrong2){
    this.question = question;
    this.choices = [ correct, wrong1, wrong2];
}

const app = {
    num: 1,
    allQuestions : {
        question1 : new Questions ('Which is the oldest airline in the world?','KLM', 'Abianca', 'Qantas'),
        question2 : new Questions ('Which is the largest port in the world?','Port of Shanghai', 'Port de Singapore', 'Port of Rotterdam'),
        question3 : new Questions ('What is the longest distance cycling backwards?','337.60 Km', '89.30 Km', '675.10 Km'),
        question4 : new Questions ('What is the highest speed ever reached by a school bus?','590 Km/h', '320 Km/h', '245 Km/h'),
        question5 : new Questions ('What is the longest car trip on one tank of gas?','2617 Km', '3568 Km', '1732 Km')
    },
    setup: function () {
        $('#next').click(app.next);
        $('#prev').click(app.prev);
    },
    showQuestions : function(){
        let divQuestion = document.createElement('div');
        //permite colocar al azar las alternativas de respuesta
        let choice = [0,1,2];
        choice.sort(() => {
            return Math.random() - 0.5
        });
        // console.log(choice);
        // for(let i in app.allQuestions){
        let h2 = document.createElement('h2');
        h2.innerHTML = app.allQuestions['question'+app.num].question;
        let divChoices = document.createElement('div');
        for(let j in app.allQuestions['question'+app.num].choices){
            let Qchoices = app.allQuestions['question'+app.num].choices;
            let input = document.createElement('input');
                input
            // console.log(Qchoices[choice[j]]);
            input.setAttribute('value',Qchoices[choice[j]]);
            divChoices.appendChild(input);
        }
        divQuestion.appendChild(h2);
        divQuestion.appendChild(divChoices);
        // }
        $('#game').append(divQuestion);
    },
    next: function () {
        $('#game').empty();
        app.num ++;
        app.showQuestions();
        console.log(app.num);
    },
    prev: function () {
        
    }
}

$(document).ready(function(){
    app.showQuestions();
    app.setup();
});