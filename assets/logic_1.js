function generateCardNum(max, min = 0)
{
     return Math.floor(Math.random() * (max-1 - min)) + min;
}

let input = {
	"startInstructions":"Старт",
	"introMp3": "assets\/lessons\/instructions\/look-and-listen.mp3",
	"textInstruction": "\u0421\u043e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u043f\u043e\u0441\u043b\u0435\u0434\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u044c",
	"okSound":"",
	"failSound":"",
	"coolDownTimer":5,
	"cardsCount": 3,
	"cards": [{
		"MIGX_id": "1",
		"text": "\u0434\u0435\u0440\u0435\u0432\u043e",
		"image": "assets\/images\/logic1\/6132448-36471.svg",
		"num": "1"
	}, {
		"MIGX_id": "3",
		"name": "\u041a\u043e\u0442",
		"src": "",
		"num": "1",
		"type": "\u0416\u0438\u0432\u043e\u0442\u043d\u043e\u0435",
		"text": "\u041a\u043e\u0442"
	}],
	"template": {
		"MIGX_id": "2",
		"text": "template",
		"image": "assets\/images\/logic1\/triangle.svg",
		"num": "0"
	}
}

let paramsValue = new progressionParams('img','div','card-placeholder','card','result-zone','cards-zone');
let settings = new excercisesSettings(
	input.startInstructions, 
	input.textInstruction,
	input.introMp3,
	input.okSound,
	input.failSound,
	input.coolDownTimer);


let cardNum = generateCardNum(input.cards.length);

/*name, type,  weight, src
 * Эти данные должны быть получены с бэка в идеале
 */

let resultProgression = [];
for (let element of input.cards){
     resultProgression.push( new progressionCard(
                  element.text,
                  element.type, 
                  (i+1) / input.cardsCount, 
                  element.image));
}


progressionBoard = new progressionBoard(
	resultProgression, 
	paramsValue, 
	input.template,
	settings);


progressionBoard.showStartMessage();

