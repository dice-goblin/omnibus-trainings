class Task {
    subjectPic;
    task;
    voiceover;
    summand = [];

    constructor(subjectPic,
        task,
        voiceover,
        summand) {
        this.subjectPic = subjectPic;
        this.task = task;
        this.voiceover = voiceover;
        this.summand = summand;
    }

    getTask() {
        return this.task.replace('#0#', this.summand[0]).replace('#1#', this.summand[1]);
    }

    getTaskStep(step) {
        return this.getTask().split('.')[step];
    }

    getVoiseover(step){
        return this.voiceover[step];
    }

    getSummand(n){
        if (n > this.summand.length) throw new Error();
            return this.summand[n]
    }
}

class boardParams {
    message = {
        'elementClass':'message-container',
        'smallElementClass':'',
        'upper':'upper',
        'element':'div'
    }
    delay = {
        'start':5000,
    }

    constructor(message, delay) {
    }

    getMessageElement(){
        return this.message.element;
    }
    getMessageElementClass(){
        return this.message.elementClass;
    }
    
    getUpperClass(){
        return this.message.upper;
    }

    getStartDelay(){
        return this.delay.start;
    }
}

class mathBoard {

    events = [];
    task;
    boardParams;

    constructor(task, boardParams) {
        this.task = task;
        this.boardParams = boardParams;

        this.registerEvents();
        this.registerActions();
    }

    registerEvents(){
        this.events['onStartEnd'] = new CustomEvent('onStartEnd', {});
        this.events['onTaskStart'] = new CustomEvent('onTaskStart', {});
        this.events['onTaskEnd'] = new CustomEvent('onTaskEnd', {});
        this.events['onTaskStepStart'] = new CustomEvent('onTaskStepStart', {detail:{'step':'0'}});
        this.events['onTaskStepEnd'] = new CustomEvent('onTaskStepEnd', {});
    }

    registerActions(){
        let startNode = document.querySelector('.'+this.boardParams.getMessageElementClass());
        startNode.addEventListener("click", (evt) => {
			setTimeout(() => {
                this.removeStartMessage();
                document.dispatchEvent(this.events['onTaskStart']);
            }, this.boardParams.getStartDelay());
		});

        document.addEventListener("onStartEnd", (evt) => {
			setTimeout(() => {
                this.removeStartMessage();
                document.dispatchEvent(this.events['onTaskStart']);
            }, this.boardParams.getStartDelay());
		});

        document.addEventListener("onTaskStart", (evt) => {
            this.showTask();
            this.playTask();
            document.dispatchEvent(this.events['onTaskEnd']);

		});

        document.addEventListener("onTaskEnd", (evt) => {
            this.makeTaskSmaller();
            document.dispatchEvent(this.events['onTaskStepStart']);
		});

        document.addEventListener("onTaskStepStart", (evt) => {
            this.makeTaskSmaller();

            switch(evt.detail.step){
                case '0':
                    this.showTaskStep(evt.detail.step);
                    this.playTask(evt.detail.step);
                    //this.initTable();
                    //вывести вводные
                    evt.detail.step +=1;
                    break;
                case '1':
                    //Вывести кусок
                    //озвучить кусок
                    //вывести таблицу
                    //вывести вводные
                    break;
                case '2':
                    break;
                default:
                    throw new Error();
            }
            document.dispatchEvent(this.events['onTaskStepStart']);
		});

    }

    run(){
        this.showStartMessage();
    }

    showStartMessage() {
        this.showMessage(this.boardParams.getMessageElementClass(), this.boardParams.getMessageElement(), "Старт");
        document.dispatchEvent(this.events['onStartEnd']);
     }

     removeStartMessage(){
        this.hideMessage(this.boardParams.getMessageElement(), this.boardParams.getMessageElementClass())
     }

    showTask(){
        this.showMessage(this.boardParams.getMessageElementClass(), this.boardParams.getMessageElement(), this.task.getTask()); 
    }

    makeTaskSmaller(){
        //Изменить класс
    }

    playTask(){
        return true;
    }

    showTaskStep(step){
        this.showMessage(this.boardParams.getMessageElementClass(), this.boardParams.getMessageElement(), this.task.getTaskStep(step))
    }


    showTask() { }
    showTaskByPart() { }
    showLessTask() { }
    showInstruction() { }
    //Вывести старт
    //вывести и зачитать задание.
    //вывести задание по преложениям
    //подсветить действие
    //вывести краткулю запись
    //инструкция
    // вывести карточки позиция правильной меняется
    // таймер на 7 секунт,
    //если нет ответа  - показать подсказку на 2 секунды
    //


    
    showMessage(parentClass, containerType, message) {
        let parent = document.querySelector('.' + parentClass);
        let node = document.createElement(containerType);
        node.classList.add(this.boardParams.getUpperClass());
        parent.appendChild(node);
        node.textContent = message;
    }

    hideMessage(containerType, containerClass) {
        let node = document.querySelector('.' + containerClass + ' ' + containerType);
        node.parentNode.removeChild(node);
    }
}