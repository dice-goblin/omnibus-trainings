class card{
	src;
    type;
    name;

	constructor(name, type, src){
		this.name = name;
		this.type = type;
		this.src = src;
		return this
	}}

class excercisesSettings{
     startText;
     introText;
     introSound;
     okSound;
     failSound;
     startCounter;

    constructor (startText, introText, introSpeech, okSound, failSound, startCounter){
        this.startText = startText;
        this.introText = introText;
        this.introSpeech = introSpeech;
        this.okSound = okSound;         
        this.failSound = failSound;
        this.startCounter = startCounter;
     }}

class progressionCard extends card{
    weight;

	constructor(name, type,  weight, src){
		super();
		this.name = name;
		this.type = type;
		this.src = src;
		this.weight = weight;
	}

        generateProgression(num){
             let result= [];
             for (let i = 0; i <=num; i++){
                  this.weight = ((i+1) / num);
                  result.push(this);

             }
             return result;
        }
}

class sequenceCard extends card{
}

class chooseExcecsCard extends card{
}

class progressionParams {
    sourceNodeType = 'img';
	destNodeType = 'div';
	destNodeClass = 'card-placeholder';
	sourceNodeClass = 'card';
	progressionLineDestClass = 'result-zone';
	progressionLineSourceClass = 'cards-zone';
	sourceSelectedClass='selected';
	destErrorClass = 'error';
	sourceOveredClass = 'overed';
	sourceCheckedClass = 'checked';
	destCheckedClass = 'checked';
	progressionLineSourceEmptyClass = 'empty';
	help = true;
	destOkClass = 'ok';
    templateZoneClass = 'template-zone';
    templateNodeType = 'img';
    templateNodeClass = 'card';
	messageType = 'div';
	messageBoxClass = 'message-zone';
	starMessageClass = "message";
        
	constructor(sourceNodeType, 
				destNodeType, 
				destNodeClass, 
				sourceNodeClass, 
				progressionLineDestClass, 
				progressionLineSourceClass){

		this.sourceNodeType = sourceNodeType;
		this.sourceNodeClass = sourceNodeClass;
		this.destNodeType = destNodeType;
		this.destNodeClass = destNodeClass;
		this.progressionLineDestClass = progressionLineDestClass;
		this.progressionLineSourceClass = progressionLineSourceClass;
	}
}

class chooseExcecsParams{
    sourceNodeType 					= 'img'; // Тип элемента истичника
	sourceNodeClass 				= 'card'; //Класс карточки
	progressionLineSourceClass 		= 'cards-zone';
	sourceErrorClass 				= 'error';
	destOkClass = 'ok';
	destErrorClass = 'error';
	help 							= true;
	messageType = 'div';
	messageBoxClass = 'message-zone';
	starMessageClass = "message";
}

class sequenceParams{
	sourceNodeType = 'img';
	destNodeType = 'div';
	destNodeClass = 'card-placeholder';
	sourceNodeClass = 'card';
	progressionLineDestClass = 'result-zone';
	progressionLineSourceClass = 'cards-zone';
	sourceSelectedClass='selected';
	destErrorClass = 'error';
	sourceOveredClass = 'overed';
	sourceCheckedClass = 'checked';
	destCheckedClass = 'checked';
	progressionLineSourceEmptyClass = 'empty';
	help = true;
	destOkClass = 'ok';
	patternNodeClass = 'pattern'
	patternNodeType = 'div'
}




class board{
	progression;
	params;
    settings;

	constructor(progression, params,  settings){
		this.progression = progression;
		this.params = params;
        this.settings = settings;
	}

	shuffleCards()
	{
		let result = [];
		let max = this.progression.length-1;
		let min = 0;
		let digits = [];

		for (let i = min; i <=max; i++)
		{
			digits.push(i);
		}

		while (max >= min) {
			result.push(digits.splice(Math.floor(Math.random() * (max - min)) + min,1).shift());
			max --;
		  }
		return result;
	}

	showStartMessage(){
		let parent = document.querySelector('.'+this.params.messageBoxClass);
		let node = document.createElement(this.params.messageType);
		parent.appendChild(node);
		node.textContent = this.settings.startText;
		parent.addEventListener("click", (evt) =>{ this.run() } );
    }
	
	removeMessage(){
		let node = document.querySelector('.'+this.params.messageBoxClass+' ' +this.params.messageType);
		node.parentNode.removeChild(node);
	}
	showCounterMessage(message){

		let parent = document.querySelector('.'+this.params.messageBoxClass);
		let node = document.createElement(this.params.messageType);
		node.textContent = message;
		parent.appendChild(node);
	}

	showInstructionsMessage(){
		let parent = document.querySelector('.'+this.params.messageBoxClass);
		let node = document.createElement(this.params.messageType);
		parent.appendChild(node);
//		let audio = new Audio(this.settings.introSound);
//		audio.play();
	  
		let startTimer = 1000;
		node.textContent = this.settings.introText;
		//await new Promise(r => setTimeout(r, startTimer));
		

	}

	run(){
		
		this.removeMessage();
		let startTimer = 1000;
		let startTimerProgression = 0.5;
		//Таймер
		for (let i = 1; i <= this.settings.startCounter ; i++){
			this.showCounterMessage(i);
			setTimeout( () => {console.log('yep')},
				startTimer);
			startTimer = startTimer + startTimer*startTimerProgression;
			this.removeMessage();
		}
		this.showInstructionsMessage();
		//Таймер
		this.removeMessage();


		return this.run;	
	}

}

class progressionBoard extends board{
	template;
	constructor(progression, params, template, settings){
		super(progression, params,  settings);
		this.template = template;
	}
    makeTemplate() {
		let parent = document.querySelector('.'+this.params.templateZoneClass);
        for (let element = 0 ; element < this.progression.length; element++) {
            let node = document.createElement(this.params.templateNodeType);
            node.classList.add(this.params.templateNodeClass);
            node.src = this.template.image;
			//node.dataset.weight = ((element+1) / this.progression.length);
			node.style.transform = "scale("+((element+1) / this.progression.length)+")";
            parent.appendChild(node);
        }
    
       // return parent;
    }

	makeZone() {
		let parent = document.querySelector('.'+this.params.progressionLineDestClass);
        for (let element = 0 ; element < this.progression.length; element++) {
            let node = document.createElement(this.params.destNodeType);
            node.classList.add(this.params.destNodeClass);
            node.dataset.weight = this.progression[element].weight;
            parent.appendChild(node);
        }
    
      //  return parent;
	}

	makeCards(){
		let parent = document.querySelector('.'+this.params.progressionLineSourceClass);
		for (var element of this.shuffleCards()) {
			let parentNode = document.createElement('div');
            let node = document.createElement(this.params.sourceNodeType);
			node.classList.add(this.params.sourceNodeClass);
			node.draggable = true;
			node.style.transform = "scale("+this.progression[element].weight+")";
			node.textContent = this.progression[element].name;
			node.dataset.weight = this.progression[element].weight;
			node.src=this.progression[element].src;
			parentNode.appendChild(node);
			parent.appendChild(parentNode);
		}	
	}

	dragStartLookUp(){
		let params = this.params; 
		//@Task слушать только события связанные с зонами
		document.addEventListener("dragstart", (evt) => {
			if (this.checked === false) {
				this.removeHighlightCard(evt.target)
			}
			this.highlightCard(evt.target);
			
		});
	

		document.addEventListener("dragend", (evt) =>{
			this.removeHighlightCard(evt.target)
		})
	

		document.addEventListener("dragenter", (evt) =>{
			let currentCard = document.querySelector('.'+this.params.sourceSelectedClass);

			if (this.isCurrentZone(currentCard,evt.target) === true &&
			    this.isEmptyZone(evt.target)===true && 
				this.isCard(evt.target) !== true &&
				this.isZone(evt.target) === true){

				this.highlightZone(evt.target);
			}
			
		});


		document.addEventListener("dragover", (evt) =>{
			evt.preventDefault();
		});
	

		document.addEventListener("dragleave", (evt) =>{
	
			this.removeHighlightZone(evt.target);
		});

		document.addEventListener("drop", (evt) =>{

		evt.preventDefault();

		//Условия при которых мы можем опустить карточку:
		/**
		 * 1. Целевая зона свободна
		 * 2. Целевая зона не та же, что и источник
		 */

		let currentCard = document.querySelector('.'+params.sourceSelectedClass);
		if (this.isCurrentZone(currentCard,evt.target) === true &&
			this.isEmptyZone(evt.target)===true && 
			this.isCard(evt.target) !== true &&
			this.isZone(evt.target) === true &&
			this.checkCard(currentCard,evt.target) == true){
				this.removeCard(currentCard, currentCard.parentNode);
				this.removeHighlightZone(evt.target);
				this.placeCard(currentCard,evt.target);
				this.removeHighlightCard(currentCard);
				this.removeHighlightZone(evt.target);
				this.okCard(currentCard);
		}  else {
			this.removeHighlightZone(evt.target);
		}
	});
	}

	isCard(target) {
		if (target.className === this.params.sourceNodeClass ){
			return true;
		} else return false;	
	}

	isZone(target) {
		/*	if (target.classList.contains(this.params.destNodeClass) === true ||
		    target.classList.contains(this.params.progressionLineSourceClass) === true  )*/
		if (target.classList.contains(this.params.destNodeClass) === true ){
			return true;
		} else return false;
	}

	isCurrentZone(source, target){
		if (source.className !== target.className){
			return true;
		} else return false
	}

	isEmptyZone(target){
		if(target.childElementCount === 0 ||
			 (target.className === this.params.progressionLineSourceClass &&
			  target.childElementCount <= this.progression.length )) {

			return true;
		} else return false;
	}

	okCard(target){
		target.parentNode.classList.add(this.params.destOkClass)
	}

	failCard(target){
		target.classList.add(this.params.destErrorClass)
	}

	targetZoneisFilled(){
		if (document.querySelector('.'+this.params.progressionLineDestClass).querySelectorAll('.'+this.params.sourceNodeClass).length === this.progression.length){
			return true;
		}
		return false;
	}

	highlightCard(target){
		target.classList.add(this.params.sourceSelectedClass);
	}

	removeHighlightCard(target){
		target.classList.remove(this.params.sourceSelectedClass);
		target.classList.remove(this.params.destErrorClass);
	}

	highlightZone(target){
		target.classList.add(this.params.sourceOveredClass);
	}

	removeHighlightZone(target){
		target.classList.remove(this.params.sourceOveredClass);
	}

	removeCard(card,source){
		source.removeChild(card);     
	}

	placeCard(card,target){
		card.classList.add(this.params.sourceCheckedClass);    // Добавляем метку что карочка перенесена
		target.appendChild(card); 					 // Копируем карточку в целевую позицию
		target.classList.add(this.params.destCheckedClass);		 // Добавляем метку в целевую зону, что она занята
	}

	checkCard(card, target){
		if (card.dataset.weight === target.dataset.weight){
			return true;
		} else return false;
	}

	validateResult(help = true){
		let params = this.params; 
		let result;
		document.addEventListener("drop", (evt) => {
			evt.preventDefault();
			if (this.targetZoneisFilled() === true) {
				document.location.href = 'file:///Users/pavelk.gudkov/Documents/Omnibus/logic_1.html';
				}
		});	
	}

	run(){
		super.run();
		
		this.makeTemplate();
		this.makeZone();
		this.makeCards();
		
		this.dragStartLookUp();
		this.validateResult(this.help);
	}
}

class chooseExcecsBoard extends board{

	correct;

	constructor(progression, params, correct, settings){
		super(progression, params,  settings);
		this.correct = correct;
	}
	// Функция генерирует зону для выбора карточек
	makeZone(){
		let parent = document.querySelector('.'+this.params.progressionLineSourceClass);
		parent.dataset.correct = this.correct;
        for (var element of this.shuffleCards()) {
            let node = document.createElement(this.params.sourceNodeType);
            node.classList.add(this.params.sourceNodeClass);
			node.draggable = true;
			node.dataset.type = this.progression[element].type;
			node.dataset.weight = this.progression[element].weight;
			node.src=this.progression[element].src;
            parent.appendChild(node);
        }
	}

	//Функция отслеживает события управления мышью
	eventManager(){
		var params = this.params; 
		document.querySelector('.'+params.progressionLineSourceClass).addEventListener("click", (evt) => {
			if (this.checkCard(evt.target) === true){
				this.okCard(evt.target);
				//ЗВУК СЮДА
			} else this.failCard(evt.target);
			}
		);
	}

	checkCard(card){
		if (card.parentNode.dataset.correct === card.dataset.type) {
			return true;
		} else return false;
	}

	okCard(target){
		target.classList.add(this.params.destOkClass)
	}

	failCard(target){
		target.classList.add(this.params.destErrorClass)
	}

	run(){
		super.run();
		this.makeZone();
		if(this.eventManager() === true){
			// Редирект дальше
		}
	}
}

class sequenceBoard extends board{

	sequence;

	constructor(progression, params,sequence, settings){
		super(progression, params,  settings);
		this.progression = progression;
		this.params = params;
		this.sequence = sequence
	}

    makeZone() {
		let parent = document.querySelector('.'+this.params.progressionLineDestClass);
        for (let element = 0 ; element < this.sequence.length; element++) {
            let node = document.createElement(this.params.destNodeType);
            node.classList.add(this.params.destNodeClass);
            node.dataset.weight = this.sequence[element];
			node.textContent = this.sequence[element];
            parent.appendChild(node);

        }
    
        return parent;
    }

	makeCards(){
		let parent = document.querySelector('.'+this.params.progressionLineSourceClass);
		for (let element = 0 ; element < this.progression.length; element++) {
            let node = document.createElement(this.params.sourceNodeType);
			node.classList.add(this.params.sourceNodeClass);
			node.draggable = true;
			node.textContent = this.progression[element].name;
			node.dataset.weight = this.progression[element].weight;
			node.src=this.progression[element].src;
			parent.appendChild(node);
		}	
	}

	dragStartLookUp(){
		let params = this.params; 
		//@Task слушать только события связанные с зонами
		document.addEventListener("dragstart", (evt) => {
			if (this.checked === false) {
				this.removeHighlightCard(evt.target)
			}
			this.highlightCard(evt.target);
			
		});
	

		document.addEventListener("dragend", (evt) =>{
			this.removeHighlightCard(evt.target)
		})
	

		document.addEventListener("dragenter", (evt) =>{
			let currentCard = document.querySelector('.'+this.params.sourceSelectedClass);

			if (this.isCurrentZone(currentCard,evt.target) === true &&
			    this.isEmptyZone(evt.target)===true && 
				this.isCard(evt.target) !== true &&
				this.isZone(evt.target) === true){

				this.highlightZone(evt.target);
			}
			
		});


		document.addEventListener("dragover", (evt) =>{
			evt.preventDefault();
		});
	

		document.addEventListener("dragleave", (evt) =>{
	
			this.removeHighlightZone(evt.target);
		});

		document.addEventListener("drop", (evt) =>{

			evt.preventDefault();

			//Условия при которых мы можем опустить карточку:
			/**
			 * 1. Целевая зона свободна
			 * 2. Целевая зона не та же, что и источник
			 */

			let currentCard = document.querySelector('.'+params.sourceSelectedClass);
			if (this.isCurrentZone(currentCard,evt.target) === true &&
				this.isEmptyZone(evt.target)===true && 
				this.isCard(evt.target) !== true &&
				this.isZone(evt.target) === true){
					this.removeHighlightZone(evt.target);
					this.placeCard(currentCard,evt.target);
					this.removeHighlightCard(currentCard);
					this.removeHighlightZone(evt.target);
			}  
		});
	}

	isCard(target) {
		if (target.className === this.params.sourceNodeClass ){
			return true;
		} else return false;	
	}

	isZone(target) {
		if (target.classList.contains(this.params.destNodeClass) === true){
			return true;
		} else return false;
	}

	isCurrentZone(source, target){
		if (source.className !== target.className){
			return true;
		} else return false
	}

	isEmptyZone(target){
		if(target.childElementCount === 0 ||
			 (target.className === this.params.progressionLineSourceClass &&
			  target.childElementCount <= this.progression.length )) {

			return true;
		} else return false;
	}

	okCard(target){
		target.classList.add(this.params.destOkClass)
	}

	failCard(target){
		target.classList.add(this.params.destErrorClass)
	}

	targetZoneisFilled(){
		if (document.querySelector('.'+this.params.progressionLineDestClass).querySelectorAll('.'+this.params.sourceNodeClass).length === this.progression.length){
			return true;
		}
		return false;
	}

	highlightCard(target){
		target.classList.add(this.params.sourceSelectedClass);
	}

	removeHighlightCard(target){
		target.classList.remove(this.params.sourceSelectedClass);
		target.classList.remove(this.params.destErrorClass);
	}

	highlightZone(target){
		target.classList.add(this.params.sourceOveredClass);
	}

	removeHighlightZone(target){
		target.classList.remove(this.params.sourceOveredClass);
	}

	removeCard(card,source){
		source.removeChild(card);     
	}

	placeCard(card,target){
		card.classList.add(this.params.sourceCheckedClass);    	// Добавляем метку что карочка перенесена
		target.appendChild(card.cloneNode()); 					 			// Копируем карточку в целевую позицию
		target.classList.add(this.params.destCheckedClass);		 // Добавляем метку в целевую зону, что она занята
	}

	checkCard(target){
		if (target.parentNode.dataset.weight === target.dataset.weight){
			return true;
		} else return false;
	}

	validateResult(help = true){
		let params = this.params; 
		let result;
		document.addEventListener("drop", (evt) => {
			evt.preventDefault();
			if (this.targetZoneisFilled() === true) {
				result = document.querySelector('.'+params.progressionLineDestClass).querySelectorAll('.'+params.sourceNodeClass);
	
			
				for (let resultCard of result) {
					if (help === true){

						if (this.checkCard(resultCard) === true){
							this.okCard(resultCard);
						} else {this.failCard(resultCard);}
					}
				}
			} 
		});	
	}




	run(){
		//this.makeZone();
		//this.makeCards();
		super.run();
		this.dragStartLookUp();
	}
}
