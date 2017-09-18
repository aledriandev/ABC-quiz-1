'use strict';

// Constructor de preguntas
function Questions (question, correct, wrong1,wrong2){
    this.question = question;
    this.choices = [ correct, wrong1, wrong2];
}

const app = {
    num: 1,

    answers: [],

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
        $('#question').html(app.allQuestions['question'+app.num].question);
        const letters = ['assets/img/a.gif' ,'assets/img/b.gif' ,'assets/img/c.gif' ];
        
        //permite colocar al azar las alternativas de respuesta
        let choice = [0,1,2];
        choice.sort(() => {
            return Math.random() - 0.5
        });
        
        let Qchoices = app.allQuestions['question'+app.num].choices;
        for(let j in Qchoices){
            let options =   
                `<div class='col-lg-4 col-md-4 col-sm-6 col-xs-12'>
                    <button class='btn-question' id='${j}'>
                        <img class='letter' src=${letters[j]} alt=""><p>${Qchoices[choice[j]]}</p><img class='check' src='assets/img/check.ico'>
                    </button>
                </div>`;
            $('#choices').append(options);
        }
    },

    next: function () {
        $('#question').empty();
        $('#choices').empty();
        app.num ++;
        app.showQuestions();
        console.log(app.num);
        app.answersUser();
    },

    prev: function () {
        $('#question').empty();
        $('#choices').empty();
        app.num --;
        app.showQuestions();
        console.log(app.num);
        app.answersUser();
    },

    chosen: function () {
        app.next();
    },
    
    answersUser : function () {
        $("button").click((e)=>{
            console.log(e.target.id);
            app.answers.push({
                question: app.num,
                answer: e.target.id
            });
            let check = `<img src='assets/img/check.ico'>`;
            setTimeout(function() {
                e.target.fadeIn(1500);
            },1000);
            setTimeout(app.chosen,1000);
        })
    },
}

$(document).ready(function(){
    app.showQuestions();
    app.setup();
    app.answersUser();
});