const url = "https://sportstrivia.quizinc.co.za/trivia-service/save-user-answers";

function sendScore(productId, gameId, msisdn, questionCategoryId, questionId, answer )
{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "productId": productId,
        "gameId": gameId,
        "answer": [{
            "msisdn": msisdn,
            "questionCategoryId": questionCategoryId,
            "questionId": questionId,
            "answer": answer
        }]
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    
    var response = {
        "status": 0,
        "Correct": false,
        "GameEnded": false,
    };

    fetch(url, requestOptions)
    .then((res) => res.json()).then((data) => {
        
        if(data.hasOwnProperty('recordset')) {
            if (data.recordset && data.recordset[0]) {
                const forced = 10;
                if (data.recordset[0].GameEnded && typeof window.trackGameCompletion === "function") {
                    window.trackGameCompletion(forced);
                }
                c2_callFunction("get_answer_status", [
                    data.recordset[0].Correct,
                    data.recordset[0].GameEnded,
                    forced // use the forced value here too
                ]);
            }
        }
    }).catch((err) => {
        console.log(err);
    });
}

//productId - Number
//gameId - string
//msisdn - Mobile number string
//questionCategoryId - string 
//questionId  - string
//answer - string

/*var productId = 6;  
var gameId = "7";
var msisdn = "27844696041";
var questionCategoryId = "47";
var questionId = "429";
var answer = "rob";


sendScore(productId, gameId, msisdn, questionCategoryId, questionId, answer);*/
