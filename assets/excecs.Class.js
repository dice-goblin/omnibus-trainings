class chooseExcecsBoard extends board {

	correct;

	constructor(progression, params, correct, settings) {
		super(progression, params, settings);
		this.correct = correct;
	}
	// Функция генерирует зону для выбора карточек
	makeZone() {
		let parent = document.querySelector('.' + this.params.progressionLineSourceClass);
		parent.dataset.correct = this.correct;
		for (var element of this.shuffleCards()) {
			let node = document.createElement(this.params.sourceNodeType);
			node.classList.add(this.params.sourceNodeClass);
			node.draggable = true;
			node.dataset.type = this.progression[element].type;
			node.dataset.weight = this.progression[element].weight;
			node.src = this.progression[element].src;
			parent.appendChild(node);
		}
	}

	//Функция отслеживает события управления мышью
	registerActions() {
		super.registerActions();
		document.querySelector('.' + this.params.progressionLineSourceClass).addEventListener("click", (evt) => {
			if ( this.validateResult(evt.target)){
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

	validateResult(card) {
		if (document.querySelectorAll("img[data-type='" + card.dataset.type + "']").length == 1) {
			return true;
		} else return false;
	}

	okCard(target) {
		target.classList.add(this.params.destOkClass)
	}

	failCard(target) {
		target.classList.add(this.params.destErrorClass)
	}

	run() {
		super.run();
		this.makeZone();
	}
}

class chooseExcecsParams {
	sourceNodeType = 'img'; // Тип элемента истичника
	sourceNodeClass = 'card'; //Класс карточки
	progressionLineSourceClass = 'cards-zone';
	sourceErrorClass = 'error';
	destOkClass = 'ok';
	destErrorClass = 'error';
	help = true;
	messageType = 'div';
	messageBoxClass = 'message-zone';
	starMessageClass = "message";
}

class chooseExcecsCard extends card {
}