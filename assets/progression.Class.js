class progressionCard extends card {
	weight;

	constructor(name, type, weight, src) {
		super();
		this.name = name;
		this.type = type;
		this.src = src;
		this.weight = weight;
	}

	generateProgression(num) {
		let result = [];
		for (let i = 0; i <= num; i++) {
			this.weight = ((i + 1) / num);
			result.push(this);

		}
		return result;
	}
}

class progressionParams {
	sourceNodeType = 'img';
	destNodeType = 'div';
	destNodeClass = 'card-placeholder';
	sourceNodeClass = 'card';
	progressionLineDestClass = 'result-zone';
	progressionLineSourceClass = 'cards-zone';
	sourceSelectedClass = 'selected';
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
		progressionLineSourceClass) {

		this.sourceNodeType = sourceNodeType;
		this.sourceNodeClass = sourceNodeClass;
		this.destNodeType = destNodeType;
		this.destNodeClass = destNodeClass;
		this.progressionLineDestClass = progressionLineDestClass;
		this.progressionLineSourceClass = progressionLineSourceClass;
	}
}

class progressionBoard extends board {
	template;
	constructor(progression, params, template, settings) {
		super(progression, params, settings);
		this.template = template;
	}
	makeTemplate() {
		let parent = document.querySelector('.' + this.params.templateZoneClass);
		for (let element = 0; element < this.progression.length; element++) {
			let node = document.createElement(this.params.templateNodeType);
			node.classList.add(this.params.templateNodeClass);
			node.src = this.template.image;
			//node.dataset.weight = ((element+1) / this.progression.length);
			node.style.transform = "scale(" + ((element + 1) / this.progression.length) + ")";
			parent.appendChild(node);
		}

		// return parent;
	}

	makeZone() {
		let parent = document.querySelector('.' + this.params.progressionLineDestClass);
		for (let element = 0; element < this.progression.length; element++) {
			let node = document.createElement(this.params.destNodeType);
			node.classList.add(this.params.destNodeClass);
			node.dataset.weight = this.progression[element].weight;
			parent.appendChild(node);
		}

		//  return parent;
	}

	makeCards() {
		let parent = document.querySelector('.' + this.params.progressionLineSourceClass);
		for (var element of this.shuffleCards()) {
			let parentNode = document.createElement('div');
			let node = document.createElement(this.params.sourceNodeType);
			node.classList.add(this.params.sourceNodeClass);
			node.draggable = true;
			node.style.transform = "scale(" + this.progression[element].weight + ")";
			node.textContent = this.progression[element].name;
			node.dataset.weight = this.progression[element].weight;
			node.src = this.progression[element].src;
			parentNode.appendChild(node);
			parent.appendChild(parentNode);
		}
	}

	registerActions() {
		super.registerActions();

		let params = this.params;
		//@Task слушать только события связанные с зонами
		document.addEventListener("dragstart", (evt) => {
			if (this.checked === false) {
				this.removeHighlightCard(evt.target)
			}
			this.highlightCard(evt.target);

		});

		document.addEventListener("dragend", (evt) => {
			this.removeHighlightCard(evt.target)
		})

		document.addEventListener("dragenter", (evt) => {
			let currentCard = document.querySelector('.' + this.params.sourceSelectedClass);

			if (this.isCurrentZone(currentCard, evt.target) === true &&
				this.isEmptyZone(evt.target) === true &&
				this.isCard(evt.target) !== true &&
				this.isZone(evt.target) === true) {

				this.highlightZone(evt.target);
			}

		});

		document.addEventListener("dragover", (evt) => {
			evt.preventDefault();
		});

		document.addEventListener("dragleave", (evt) => {

			this.removeHighlightZone(evt.target);
		});

		document.addEventListener("drop", (evt) => {

			evt.preventDefault();

			//Условия при которых мы можем опустить карточку:
			/**
			 * 1. Целевая зона свободна
			 * 2. Целевая зона не та же, что и источник
			 */

			let currentCard = document.querySelector('.' + params.sourceSelectedClass);
			if (this.isCurrentZone(currentCard, evt.target) === true &&
				this.isEmptyZone(evt.target) === true &&
				this.isCard(evt.target) !== true &&
				this.isZone(evt.target) === true &&
				this.checkCard(currentCard, evt.target) == true) {
				this.removeCard(currentCard, currentCard.parentNode);
				this.removeHighlightZone(evt.target);
				this.placeCard(currentCard, evt.target);
				this.removeHighlightCard(currentCard);
				this.removeHighlightZone(evt.target);
				this.okCard(currentCard);
			} else {
				this.removeHighlightZone(evt.target);
			}
		});

		document.addEventListener("drop", (evt) => {
			evt.preventDefault();
			if (this.validateResult()) {
				document.dispatchEvent(this.events['completed']);
			}
		});

		document.addEventListener("completed", (evt) => {
			setTimeout(() => {
				alert("все круто!");         
				document.dispatchEvent(this.events['next-try']);
			 });
		});
	}

	isCard(target) {
		if (target.className === this.params.sourceNodeClass) {
			return true;
		} else return false;
	}

	isZone(target) {
		/*	if (target.classList.contains(this.params.destNodeClass) === true ||
			target.classList.contains(this.params.progressionLineSourceClass) === true  )*/
		if (target.classList.contains(this.params.destNodeClass) === true) {
			return true;
		} else return false;
	}

	isCurrentZone(source, target) {
		if (source.className !== target.className) {
			return true;
		} else return false
	}

	isEmptyZone(target) {
		if (target.childElementCount === 0 ||
			(target.className === this.params.progressionLineSourceClass &&
				target.childElementCount <= this.progression.length)) {

			return true;
		} else return false;
	}

	okCard(target) {
		target.parentNode.classList.add(this.params.destOkClass)
	}

	failCard(target) {
		target.classList.add(this.params.destErrorClass)
	}

	targetZoneisFilled() {
		if (document.querySelector('.' + this.params.progressionLineDestClass).querySelectorAll('.' + this.params.sourceNodeClass).length === this.progression.length) {
			return true;
		}
		return false;
	}

	highlightCard(target) {
		target.classList.add(this.params.sourceSelectedClass);
	}

	removeHighlightCard(target) {
		target.classList.remove(this.params.sourceSelectedClass);
		target.classList.remove(this.params.destErrorClass);
	}

	highlightZone(target) {
		target.classList.add(this.params.sourceOveredClass);
	}

	removeHighlightZone(target) {
		target.classList.remove(this.params.sourceOveredClass);
	}

	removeCard(card, source) {
		source.removeChild(card);
	}

	placeCard(card, target) {
		card.classList.add(this.params.sourceCheckedClass);    // Добавляем метку что карочка перенесена
		target.appendChild(card); 					 // Копируем карточку в целевую позицию
		target.classList.add(this.params.destCheckedClass);		 // Добавляем метку в целевую зону, что она занята
	}

	checkCard(card, target) {
		if (card.dataset.weight === target.dataset.weight) {
			return true;
		} else return false;
	}

	validateResult() {
		if (this.targetZoneisFilled() === true) {
			return true;
		} else return false;
	}

	run() {
		super.run();

		this.makeTemplate(); //Паттерн, который нужно выбрать
		this.makeZone(); //Зона, куда нужно перетаскивать карточки
		this.makeCards(); //Стимулы
	}
}