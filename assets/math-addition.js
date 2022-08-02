let input = {
    'task':'Было #0# конфеты. Папа <span>положил</span> на стол еще #1#. Сколько всего стало конфет?',
    'summand':[2,2],
    'subjectPic':'#PIC_PLACEHOLDER',
    'voiseOver':['/////',['asdasd'],['asdasd']]
}

let tast = 

mathBoard = new mathBoard(
    new Task (input.task, input.summand,input.subjectPic,input.voiseOver),
    new boardParams(),
);

mathBoard.run();