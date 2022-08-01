//Описание последовательности
//Карточки
// --Тип


let sequence;


let paramsValue = new sequenceParams();

sequence= ['A','B','A']
/*
 * Эти данные должны быть получены с бэка в идеале
 */
sequenceCards = [];
for (i = 0; i <= 1; i++){
	sequenceCards.push(new sequenceCard(i,i,i,i));
}

sequenceBoard = new sequenceBoard(sequenceCards, paramsValue,sequence);
sequenceBoard.run();