class sequenceCard extends card {
}

class sequenceParams {
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
	patternNodeClass = 'pattern'
	patternNodeType = 'div'
	messageType = 'div';
	messageBoxClass = 'message-zone';
	starMessageClass = "message";

}



class sequenceBoard extends board {

	sequence;


	constructor(progression, params, sequence, settings) {
		super(progression, params, settings);
		this.sequence = new sequenceSetting(
			sequence.sequence,
			sequence.sequenceEqu,
			sequence.sequencePreNum);
	}

	makeSeqence() {
		let parent = document.querySelector('.' + this.params.patternNodeClass);
		for (let element of this.sequence.sequence) {
			let node = document.createElement(this.params.destNodeType);
			node.classList.add(this.params.destNodeClass);
			node.dataset.type = element;
			node.textContent = element;
			parent.appendChild(node);
		}
	}

	makeZone() {
		let parent = document.querySelector('.' + this.params.progressionLineDestClass);
		for (let element of this.sequence.sequence) {
			let node = document.createElement(this.params.destNodeType);
			node.classList.add(this.params.destNodeClass);
			node.dataset.type = element;
			node.textContent = element;
			parent.appendChild(node);
		}
	}

	makeCards() {
		let parent = document.querySelector('.' + this.params.progressionLineSourceClass);
		for (let element = 0; element < this.progression.length; element++) {
			let node = document.createElement(this.params.sourceNodeType);
			node.classList.add(this.params.sourceNodeClass);
			node.draggable = true;
			node.textContent = this.progression[element].name;
			node.dataset.type = this.progression[element].type;
			node.src = this.progression[element].src;
			parent.appendChild(node);
		}
	}



	registerActions() {
		super.registerActions();
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



		document.addEventListener("completed", (evt) => {
			setTimeout(() => {
				alert("все круто!");
				document.dispatchEvent(this.events['next-try']);
			});
		});

		document.addEventListener("drop", (evt) => {

			evt.preventDefault();

			//Условия при которых мы можем опустить карточку:
			/**
			 * 1. Целевая зона свободна
			 * 2. Целевая зона не та же, что и источник
			 */

			let currentCard = document.querySelector('.' + this.params.sourceSelectedClass);
			if (this.isCurrentZone(currentCard, evt.target) === true &&
				this.isEmptyZone(evt.target) === true &&
				this.isCard(evt.target) !== true &&
				this.isZone(evt.target) === true &&
				this.checkCard(currentCard, evt.target) === true) {
					this.placeCard(currentCard, evt.target);
					this.removeHighlightCard(currentCard);
					this.removeHighlightZone(evt.target);
			} else {
				this.removeHighlightCard(currentCard);
				this.removeHighlightZone(evt.target);
			}

			if (this.validateResult()) {
				document.dispatchEvent(this.events['completed']);
			}
		});
	}

	isCard(target) {
		if (target.className === this.params.sourceNodeClass) {
			return true;
		} else return false;
	}

	isZone(target) {
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
		target.classList.add(this.params.destOkClass)
	}

	failCard(target) {
		target.classList.add(this.params.destErrorClass)
	}

	targetZoneisFilled() {
		if (document.querySelector('.' + this.params.progressionLineDestClass).querySelectorAll('.' + this.params.sourceNodeClass).length === this.sequence.sequence.length) {
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
		//card.classList.add(this.params.sourceCheckedClass);    	// Добавляем метку что карочка перенесена

		target.textContent = "";				 			// Копируем карточку в целевую позицию
		target.classList.add(this.params.destCheckedClass);	
		this.removeHighlightCard(card); // Добавляем метку в целевую зону, что она занята
		target.appendChild(card.cloneNode());
	}

	checkCard(card, target) {
		if (card.dataset.type === target.dataset.type) {
			return true;
		} else return false;
	}

	validateResult(help = true) {
		if (this.targetZoneisFilled() === true) {
				return true;
		}
		else {
			return false;

		}
	}

	preFillZone() {
		for (let i = 1; i <= this.sequence.sequencePreFill; i++) {
			let parent = document.querySelector('.' + this.params.progressionLineDestClass + ' .' + this.params.destNodeClass + ':nth-child(' + i + ')');
			let node = document.querySelector('.' + this.params.sourceNodeClass + '[data-type=' + this.sequence.getAssocType(this.sequence.sequence[i - 1]) + ']');
			parent.textContent = "";
			parent.classList.add(this.params.destCheckedClass);
			parent.appendChild(node.cloneNode());
		}
	}




	run() {
		super.run();
		this.makeSeqence();
		this.makeZone();
		this.makeCards();
		this.preFillZone();
	}
}
