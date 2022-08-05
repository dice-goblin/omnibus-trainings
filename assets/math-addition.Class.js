class Task {
    subjectPic;
    task;
    voiceover;
    summand = [];

    constructor(
        task = '',
        summand,
        subjectPic,
        voiceover,
    ) {
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

    getVoiseover(step) {
        return this.voiceover[step];
    }

    getSummand(n) {
        if (n > this.summand.length) throw new Error();
        return this.summand[n]
    }

    getImage(n) {
        return '/'; //@Implement
    }
}

class boardParams {
    structure = {
        'message': {
            'container': 'message-container',
            'currentElementClass': 'current-container',
            'staticElementClass': 'static-container',
            'smallElementClass': '',
            'upper': 'upper',
            'normal': 'normal',
            'element': 'div'
        },
        'table': {
            'container': 'table-container',
            'textContainer': {
                'class': 'imgLine',
                'element': 'div'
            },
            'graphContainer': {
                'class': 'imgLine',
                'element': 'img'
            },
            'summandContainer': {
                'class': 'imgLine',
                'element': 'div'
            },
            'cardsContainer': {
                'class': 'imgLine',
                'element': 'img'
            }
        }
    }
    signs = {
        'plus': ['положили'],
        'minus': ['убрали']
    }
    delay = {
        'start': 5000,
    }

    constructor(message, delay) {
    }

    getContainer(type) {
        switch (type) {
            case 'table':
                return this.structure.table.container;
            case ' message':
                return this.structure.message.container;
        }
    }

    getTableElementClass(type) {
        switch (type) {
            case 'textContainer':
                return this.structure.table.textContainer.imgLineClass;
            case 'imgContainer':
                return this.structure.table.imgContainer.imgLineClass;
            case 'summandContainer':
                return this.structure.table.summandContainer.imgLineClass;
            case 'cardsContainer':
                return this.structure.table.cardsContainer.imgLineClass;
            default:
                throw new Error();
        }
    }

    getTableElement(type) {
        switch (type) {
            case 'textContainer':
                return this.structure.table.textContainer.element;
            case 'imgContainer':
                return this.structure.table.graphContainer.element;
            case 'summandContainer':
                return this.structure.table.summandContainer.element;
            case 'cardsContainer':
                return this.structure.table.cardsContainer.element;
            default:
                throw new Error();
        }
    }

    getMessageElement() {
        return this.structure.message.element;
    }
    getMessageElementClass() {
        return this.structure.message.container;
    }

    getCurrentMessageClass() {
        return this.structure.message.currentElementClass;
    }

    getStaticMessageClass() {
        return this.structure.message.staticElementClass;
    }

    getUpperClass() {
        return this.structure.message.upper;
    }

    getNormalClass() {
        return this.structure.message.normal;
    }

    getStartDelay() {
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

    registerEvents(details = { 'step': 0 }) {
        this.events['onStartEnd'] = new CustomEvent('onStartEnd', {});
        this.events['onTaskStart'] = new CustomEvent('onTaskStart', {});
        this.events['onTaskEnd'] = new CustomEvent('onTaskEnd', {});
        this.events['onTaskStepStart'] = new CustomEvent('onTaskStepStart', { 'detail': details });
        this.events['onTaskStep1'] = new CustomEvent('onTaskStep1', { 'detail': details });
        this.events['onTaskStep2'] = new CustomEvent('onTaskStep2', { 'detail': details });
        this.events['onTaskStepEnd'] = new CustomEvent('onTaskStepEnd', {});
    }
    /**
     * 
     * СОБЫТИЯ
     * 
     */

    registerActions() {
        // let startNode = document.querySelector(this.boardParams.getMessageElementClass());
        document.addEventListener("click", (evt) => {
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
            this.playTask(); //@Implement
            document.dispatchEvent(this.events['onTaskEnd']);

        });

        document.addEventListener("onTaskEnd", (evt) => {
            this.moveTastToStaticContainer();
            document.dispatchEvent(this.events['onTaskStepStart']);
        });

        document.addEventListener("onTaskStepStart", (evt) => {

            this.showTaskStep(evt.detail.step);
            this.playTask(evt.detail.step);
            evt.detail.step += 1;
            document.dispatchEvent(this.events['onTaskStep1'], { 'step': 1 });
            // document.dispatchEvent(this.events['onTaskStepStart']);
        });

        document.addEventListener("onTaskStep1", (evt) => {

            this.showTaskStep(evt.detail.step);
            this.playTask(evt.detail.step);
            evt.detail.step += 1;
            document.dispatchEvent(this.events['onTaskStep2'], { 'step': 2 });

            // document.dispatchEvent(this.events['onTaskStepStart']);
        });

        document.addEventListener("onTaskStep2", (evt) => {


            this.showTaskStep(evt.detail.step);
            this.playTask(evt.detail.step);
            evt.detail.step += 1;

            // document.dispatchEvent(this.events['onTaskStepStart']);
        });

    }

    run() {
        this.showStartMessage();
    }



    showStartMessage() {
        this.showMessage(this.boardParams.getCurrentMessageClass(), this.boardParams.getMessageElement(), [], "Старт");

    }

    removeStartMessage() {
        this.hideMessage(this.boardParams.getMessageElement(), this.boardParams.getCurrentMessageClass())
    }

    showTask() {
        this.showMessage(
            this.boardParams.getCurrentMessageClass(),
            this.boardParams.getMessageElement(),
            [this.boardParams.getUpperClass()],
            this.task.getTask(),
            true);
    }

    moveTastToStaticContainer() {
        let node = document.querySelector('.' + this.boardParams.getCurrentMessageClass() + ' ' + this.boardParams.getMessageElement());
        node.classList.remove(this.boardParams.getUpperClass());
        node.classList.add(this.boardParams.getNormalClass());
        let targetNode = document.querySelector('.' + this.boardParams.getStaticMessageClass());
        targetNode.appendChild(node.cloneNode(true));
        node.parentNode.removeChild(node);
    }

    playTask() {
        return true;
    }

    showTaskStep(step) {
        //Очистить контейнер
        this.showMessage(
            this.boardParams.getMessageElementClass(),
            this.boardParams.getMessageElement(),
            [this.boardParams.getNormalClass()],
            this.task.getTaskStep(step),
            true)
        this.showStep(step);
        //Вывести первый блок таблицы
    }


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

    clearContainer(containerClass){
        let node = document.querySelector('.'+containerClass);
        for (let element of node.children){
            node.removeChild(element);
        }
        
    }

    showMessage(parentClass, containerType, containerClass = [], message = '', withTags = false) {
        let parent = document.querySelector('.' + parentClass);
        let node = document.createElement(containerType);
        for (let element of containerClass) {
            node.classList.add(element);
        }
        parent.appendChild(node);
        if (withTags == true) { node.innerHTML = message } else { node.textContent = message }
    }

    hideMessage(containerType, containerClass) {
        let node = document.querySelector('.' + containerClass + ' ' + containerType);
        node.parentNode.removeChild(node);
    }

    showStep(step) {
        let headerNode = '';
        let summandNode = '';
        let textNode ='';
        let imgNode = '';
        switch (step) {
            case 0:

                /* Генерация картинки */
                headerNode = document.createElement(this.boardParams.getTableElement('textContainer'));
                headerNode.innerText = "Было";

                imgNode = document.createElement(this.boardParams.getTableElement('textContainer'));
                //imgNode.src = this.task.getImage(this.task.summand[1]); //@implement

                summandNode = document.createElement(this.boardParams.getTableElement('summandContainer'));
                summandNode.innerHTML = this.task.getSummand(1);

                document.querySelector('.' +
                    this.boardParams.getContainer('table')).appendChild(
                        headerNode);
                document.querySelector('.' +
                    this.boardParams.getContainer('table')).appendChild(
                        imgNode);
                document.querySelector('.' +
                    this.boardParams.getContainer('table')).appendChild(
                        summandNode);
                break;
            case 1:
                headerNode = document.createElement(this.boardParams.getTableElement('textContainer'));
                headerNode.innerText = document.querySelector('span').innerText;

                textNode = document.createElement(this.boardParams.getTableElement('textContainer'));
                textNode.innerHTML = '+'; //@implement

                document.querySelector('.'+this.boardParams.getContainer('table')).appendChild(headerNode);
                document.querySelector('.'+this.boardParams.getContainer('table')).appendChild(textNode);
                document.querySelector('.'+this.boardParams.getContainer('table')).appendChild(textNode);
                break;
            case 2:
                headerNode = document.createElement(this.boardParams.getTableElement('textContainer'));
                headerNode.innerText = "Сколько положили"

                imgNode = document.createElement(this.boardParams.getTableElement('textContainer'));
                imgNode.src = this.task.getImage(this.task.summand[2]); //@implement

                textNode = document.createElement(this.boardParams.getTableElement('textContainer'));
                textNode.innerHTML = this.task.getSummand(2); //@implement

                document.querySelector(this.boardParams.getContainer('table')).appendChild(headerNode);
                document.querySelector(this.boardParams.getContainer('table')).appendChild(imgNode);
                document.querySelector(this.boardParams.getContainer('table')).appendChild(textNode);



                break;
            default:
                throw new Error();
        }
    }


}