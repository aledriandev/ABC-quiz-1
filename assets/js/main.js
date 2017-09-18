'use strict';

// Constructor de preguntas
function Questions (question, correct, wrong1,wrong2){
    this.question = question;
    this.choices = [ correct, wrong1, wrong2];
}

const app = {
    num: 1,

    answers: [],

    correct: [],

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
                    <button class='btn-question' id='${choice[j]}'>
                        <img class='letter' src=${letters[j]} alt="">
                        <p>${Qchoices[choice[j]]}</p>
                        <div id='check${choice[j]}' class='div-check'></div>
                        <div class='div-option'></div>
                    </button>
                </div>`;
            $('#choices').append(options);
        }
    },

    next: function () {
        let vehicles = ['assets/img/2.svg','assets/img/3.svg','assets/img/4.svg','assets/img/5.svg','assets/img/5.svg'];
        $('#vehicle').attr({src:`${vehicles[app.num-1]}`})
        let progressText = `${app.num} of 5 answered`;
        $('#textProgress').html(progressText);
        $('#progressBar').empty();
        let progress = (app.num)*20;
        let progressBar = `<div class="progress-bar progress-bar-success" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: ${progress}%"></div>`
        $('#progressBar').append(progressBar);
        if(app.num == 5){
            app.allAnswers();
        } else {
            $('#question').empty();
            $('#choices').empty();
            app.num ++;
            app.showQuestions();
            // console.log(app.num);
            app.answersUser();
        }
    },

    prev: function () {
        $('#question').empty();
        $('#choices').empty();
        app.num --;
        app.showQuestions();
        // console.log(app.num);
        app.answersUser();
    },

    chosen: function () {
        app.next();
    },
    
    answersUser: function () {
        let check = `<img class='check' src='assets/img/check.ico'>`;
        $("button").click((e)=>{
            let id = e.target.parentNode.id;
            $(`#check${e.target.parentNode.id}`).append(check);
            // $(`#check${e.target.parentNode}`).css('background-color','#8C8CAD');
            app.answers.push({
                question: app.num,
                answer: id
            });
            if (e.target.parentNode.id == 0) {
                app.correct.push({
                    question: app.num,
                    answer: id
                });
            }
            setTimeout(app.chosen,1000);
        })
    },

    allAnswers: function() {
        $('#game').hide();
        let title = `<h3>Here are you answers:</h3>`;
        $('#result').append(title);
        for( let index in app.answers){
            let list = `<p>${parseInt(index)+1}. ${app.allQuestions['question'+(parseInt(index)+1)].question}: 
            <b>${app.allQuestions['question'+(parseInt(index)+1)].choices[parseInt(app.answers[index].answer)]}</b></p>`;
            $('#result').append(list);
        }
        let submit = `<button class='btn-quiz'  id='submitAnswers'>Submit</button>`;
        $('#result').append(submit);
        $('#submitAnswers').click(app.submitAnswers);
    },

    submitAnswers: function() {
        $('#result').hide();
        let correct = app.correct.length;
        let total = app.answers.length;
        let title = `<h3>${correct} out of ${total} correct!</h3>`;
        $('#again').append(title);
        for( let i in app.answers){
            
            let list = ``;
            if( app.correct.indexOf(app.correct[parseInt(i)]) != -1){
                list = `<p class='correct'>
                            ${parseInt(i)+1}. ${app.allQuestions['question'+(parseInt(i)+1)].question}: 
                            <b>${app.allQuestions['question'+(parseInt(i)+1)].choices[parseInt(app.answers[i].answer)]}</b>
                        </p>`;
            }else{
                list = `<p class='incorrect'>
                            <del>${parseInt(i)+1}. ${app.allQuestions['question'+(parseInt(i)+1)].question}: 
                            <b>${app.allQuestions['question'+(parseInt(i)+1)].choices[parseInt(app.answers[i].answer)]}</b></del>
                            ${app.allQuestions['question'+(parseInt(i)+1)].choices[0]}
                        </p>`;
            }
            $('#again').append(list);
           
        }
        let again = `<button class='btn-quiz' id='startAgain'>Start Again</button>`;
        $('#again').append(again);
        $('#startAgain').click(app.startAgain);
    },

    startAgain: function () {
        app.num= 1;
        app.answers= [];
        app.correct= [];
        $('#again').hide();
        $('#choices').empty();
        $('#game').show();
        app.showQuestions();
    }
}

$(document).ready(function(){
    app.showQuestions();
    app.setup();
    app.answersUser();
    // $('.check').hide();
});