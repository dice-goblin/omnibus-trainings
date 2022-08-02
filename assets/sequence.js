function generateCardNum(max, min = 0)
{
     return Math.floor(Math.random() * (max-1 - min)) + min;
}

//На входе получаем все что необходимо - карточек на сервере

let input = {
	"startInstructions":"Старт",
	"introMp3": "assets\/lessons\/instructions\/look-and-listen.mp3",
	"textInstruction": "\u0421\u043e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u043f\u043e\u0441\u043b\u0435\u0434\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u044c",
	"okSound":"",
	'okMessage': '109660-great-congratulation',
	"failSound":"",
	"coolDownTimer":5,
	"cardsCount": 3,
	"redirect":'',
	"cards": [{
		"MIGX_id": "1",
		"text": "\u0434\u0435\u0440\u0435\u0432\u043e",
		"src": "B",
		"type": "B",
		"num": "1"
	}, {
		"MIGX_id": "3",
		"name": "\u041a\u043e\u0442",
		"src": "A",
		"num": "1",
		"type": "A",
		"text": "\u041a\u043e\u0442"
	}],
	'sequence':{
		"sequence": ['A','B','A','A','A','B'],
		"sequenceEqu": {'A':"A", 'B':"B"},
		"sequencePreNum":3}
}


let settings = new excercisesSettings(
	input.startInstructions, 
	input.textInstruction,
	input.introMp3,
	input.okSound,
	input.failSound,
	input.coolDownTimer,
	input.okMessage,
	input.redirect);


let paramsValue = new sequenceParams();

/*
 * Эти данные должны быть получены с бэка в идеале
 */
sequenceCards = [];
for (let element  of input.cards){
	sequenceCards.push( new sequenceCard(
				 element.text,
				 element.type, 
				 element.image));
}
sequenceBoard = new sequenceBoard(
	sequenceCards, 
	paramsValue, 
	input.sequence,
	settings);

sequenceBoard.start();