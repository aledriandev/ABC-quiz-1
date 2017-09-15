'use strict';

// Constructor de preguntas
function Questions (question, correct, wrong1,wrong2){
    this.question = question;
    this.choices = [ correct, wrong1, wrong2];
}

const app = {
    allQuestions : {
        question1 : new Questions ('Which is the oldest airline in the world?','KLM', 'Abianca', 'Qantas'),
        question2 : new Questions ('Which is the largest port in the world?','Port of Shanghai', 'Port de Singapore', 'Port of Rotterdam'),
        question3 : new Questions ('What is the longest distance cycling backwards?','337.60 Km', '89.30 Km', '675.10 Km'),
        question4 : new Questions ('What is the highest speed ever reached by a school bus?','590 Km/h', '320 Km/h', '245 Km/h'),
        question5 : new Questions ('What is the longest car trip on one tank of gas?','2617 Km', '3568 Km', '1732 Km')
    },
    showQuestions : function(){
        let div = document.createElement('div');
        let choice = [0,1,2];
        choice.sort(() => {
            return Math.random() - 0.5
        });
        // console.log(choice);
        for(let i in app.allQuestions){
            let h2 = document.createElement('h2');
            h2.innerHTML = app.allQuestions[i].question;
            let divChoices = document.createElement('div');
            for(let j in app.allQuestions[i].choices){
                let Qchoices = app.allQuestions[i].choices;
                let input = document.createElement('input');
                // console.log(Qchoices[choice[j]]);
                input.setAttribute('value',Qchoices[choice[j]]);
                divChoices.appendChild(input);
            }
            div.appendChild(h2);
            div.appendChild(divChoices);
        }
        $('#game').append(div);
    }
}

$(document).ready(app.showQuestions);