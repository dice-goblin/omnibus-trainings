class card {
    src;
    type;
    name;

    constructor(name, type, src) {
        this.name = name;
        this.type = type;
        this.src = src;
        return this
    }
}


class board {
    progression;
    params;
    settings;
    events = [];

    constructor(progression, params, settings) {
        this.progression = progression;
        this.params = params;
        this.settings = settings;
    }

    shuffleCards() {
        let result = [];
        let max = this.progression.length - 1;
        let min = 0;
        let digits = [];

        for (let i = min; i <= max; i++) {
            digits.push(i);
        }

        while (max >= min) {
            result.push(digits.splice(Math.floor(Math.random() * (max - min)) + min, 1).shift());
            max--;
        }
        return result;
    }

    start() {
        this.registerEvents();
		this.registerActions();

        this.showStartMessage();
    }

    showMessage(parentClass, containerType, message) {
        let parent = document.querySelector('.' + parentClass);
        let node = document.createElement(containerType);
        parent.appendChild(node);
        node.textContent = message;
    }

    showStartMessage() {
        this.showMessage(this.params.messageBoxClass, this.params.messageType, this.settings.startText);
    }

    showInstruction() {
        this.showMessage(this.params.messageBoxClass, this.params.messageType, this.settings.introText);
        document.dispatchEvent(this.events['instructions-showed']);
    }

    removeStartMessage() {
        this.removeMessage(this.params.messageType, this.params.messageBoxClass);
        document.dispatchEvent(this.events['start-message-removed']);
    }

    removeInstruction() {
        this.removeMessage(this.params.messageType, this.params.messageBoxClass);
    }

    PlayInstruction() {
        this.playMessage(this.settings.introSound)
    }

    playMessage(message) {
        let audio = new Audio(message);
        audio.play();
    }

    removeMessage(containerType, containerClass) {
        let node = document.querySelector('.' + containerClass + ' ' + containerType);
        node.parentNode.removeChild(node);

    }

    registerEvents() {
        this.events['start-message-removed'] = new CustomEvent('start-message-removed', {});
        this.events['instructions-showed'] = new CustomEvent('instructions-showed', {});
        this.events['completed'] = new CustomEvent('completed', {});
        this.events['next-try'] = new CustomEvent('next-try', {});
    }

    registerActions() {
        /* Cобытия, связанные с зоной вывода сообщений */
        let zone = document.querySelector('.' + this.params.messageBoxClass);
        zone.addEventListener("click", (evt) => {
            setTimeout(() => { this.removeStartMessage(); })
        });

        document.addEventListener("start-message-removed", (evt) => {
            this.showInstruction(); this.PlayInstruction();
        });

        document.addEventListener("instructions-showed", (evt) => {
            setTimeout(() => { this.removeInstruction(); this.run() }, 5000)
        });

        document.addEventListener("next-try", (evt) => {
            setTimeout(() => { this.redirect('/') }, 5000)
        });

    }

    run() {
    }


    redirect(location) {
        document.location.href = location;
    }

}

class excercisesSettings {
    startText;
    introText;
    introSound;
    okSound;
    failSound;
    startCounter;

    constructor(startText, introText, introSpeech, okSound, failSound, startCounter) {
        this.startText = startText;
        this.introText = introText;
        this.introSpeech = introSpeech;
        this.okSound = okSound;
        this.failSound = failSound;
        this.startCounter = startCounter;
    }
}
