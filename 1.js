let cross = document.querySelectorAll('.row div i');
let square = document.querySelectorAll('.row div');
let rows = document.querySelectorAll('.row');
let count = 0;

cross.forEach(elem => {
    elem.style.display = "none";
});


for (let i = 0; i < square.length; i++) {
    square[i].id = i;
}

function funcAdd(preCount) {
    preCount++;
    return preCount;
}

function funcMin(preCount) {
    preCount--;
    return preCount;
}

function roundOrCross(element,equalTo,textCont,preCount,func) {
    let count = preCount;
    [...element.children].forEach(item => {
        if (item.textContent == equalTo) {
            item.style.display = "block";
            count = func(count);
        } else if (item.textContent == textCont){
            item.remove();
        }
    });
    return count;
}


square.forEach(elem => {
    elem.onclick = () => {
        if (count == 0) {
            count = roundOrCross (elem,'clear','panorama_fish_eye',count,funcAdd);
            console.log(count);
        } else if (count == 1) {
            count = roundOrCross (elem,'panorama_fish_eye','clear',count,funcMin);
            console.log(count);
        }
        checkIf();
        checkRows();
        checkFirstCol();
        checkDiagonal();
    }
});

function checkIf() {
    square.forEach(item => {
        if (item.children.length == 1) { 
            item.onclick = () => {};
        }
    })
}

checkIf();


function checkFirstCol() {
    let clear = 0;
    let round = 0;
    let truly = false;

    let indexesCross = [];
    let indexesRounds = [];

    function columnChecker(index) {
        rows.forEach(itm => {
            // CHECK FIRST COLUMN
            if(itm.children[index].children.length == 1) {
                [...itm.children[index].children].forEach(elem => {
                    if (elem.textContent == "clear") {
                        indexesCross.push(elem.parentElement.id);
                        clear++;
                    } else {
                        round++;
                        indexesRounds.push(elem.parentElement.id);
                    }
                });
            };
        });
    }

    columnChecker(0);
    if (clear == 3) {
        columnIdChecker(indexesCross);
    } else if (round == 3) {
        columnIdChecker(indexesRounds);
    }

    truly = checkWinner(clear,round);

    if (truly) {
        // CHECK SECOND COLUMN
        clear = 0;
        round = 0;
        truly = false;

        columnChecker(1);

        if (clear == 3) {
            columnIdChecker(indexesCross);
        } else if (round == 3) {
            columnIdChecker(indexesRounds);
        }
    
        truly = checkWinner(clear,round);   
        if (truly) {
            clear = 0;
            round = 0;
            truly = false;

            columnChecker(2);

            if (clear == 3) {
                columnIdChecker(indexesCross);
            } else if (round == 3) {
                columnIdChecker(indexesRounds);
            }
        
            truly = checkWinner(clear,round);
        }
    }
}

function checkRows() {


    let indexesCross = [];
    let indexesRounds = [];

    rows.forEach(itm => {

        let clear = 0;
        let round = 0;
        // CHECK ROWS

        for(let i = 0; i < 3; i++) {
            if ([...itm.children[i].children].length == 1) {
                [...itm.children[i].children].forEach(itm => {
                    if (itm.textContent == "clear") {
                        indexesCross.push(itm.parentElement.id);
                        clear++;
                    } else {
                        indexesRounds.push(itm.parentElement.id)
                        round++;
                    }
                });
            }
        }

        if (clear == 3) {
            rowsIdChecker(indexesCross);
        } else if (round == 3) {
            rowsIdChecker(indexesRounds);
        }

        checkWinner(clear,round);
    });
}

function checkDiagonal() {
    let clear = 0;
    let round = 0;

    for (let i = 0; i < square.length; i++) {
        square[i].id = i;
    }

    let indexesCross = [];
    let indexesRounds = [];

    rows.forEach((item, i) => {
        if (i == 0 || i == 2) {
            [...item.children].forEach((itm,index) => {
                if (index == 0 || index == 2) {
                    if ([...itm.children].length == 1) {
                        [...itm.children].forEach(elem => {
                            if (elem.textContent == "clear") {
                                indexesCross.push(itm.id);
                                clear++;
                            } else {
                                indexesRounds.push(itm.id);
                                round++;
                            }
                        });
                    }
                }
            });
        } else if (i == 1) {
            [...item.children].forEach((itm,index) => {
                if (index == 1) {
                    if ([...itm.children].length == 1) {
                        [...itm.children].forEach(elem => {
                            if (elem.textContent == "clear") {
                                indexesCross.push(itm.id);
                                clear++;
                            } else {
                                indexesRounds.push(itm.id);
                                round++;
                            }
                        });
                    }
                }
            });
        }

        if (clear == 3) {
            clear = diagIdChecker(indexesCross,clear);

        } else if (round == 3) {
            round = diagIdChecker (indexesRounds,round);
        }

        checkWinner(clear,round);

    });
} 

function afterWin (){
    square.forEach(itm => {
        itm.onclick = () => {}
    })
}

function diagIdChecker (arrIndexes,param) {
    let acc = 0;
            arrIndexes.forEach(num => {
                acc+= +num;
            })

            console.log(acc);

            if (acc == 6 || acc == 18 || acc == 10 || acc == 14 || acc == 8) {
                param--;
            } else {
                arrIndexes.forEach(index => {
                    square.forEach(itm => {
                        if(itm.id == index) {
                            console.log(itm);
                            itm.children[0].style.color = 'green';
                        }
                    })
                });
            }
    
            return param;
}

function rowsIdChecker(arrIndexes) {
        let acc = 0;
        arrIndexes.forEach(num => {
            console.log(num)
            acc+= +num;
        })

        if (acc == 3 || acc == 12 || acc == 21) {
            arrIndexes.forEach(index => {
                square.forEach(itm => {
                    if(itm.id == index) {
                        console.log(itm);
                        itm.children[0].style.color = 'green';
                    }
                })
            });
        }
        console.log(acc);
}

function columnIdChecker(arrIndexes) {
    let acc = 0;
            arrIndexes.forEach(num => {
                console.log(num)
                acc+= +num;
            })
    
            if (acc == 9 || acc == 12 || acc == 15) {
                arrIndexes.forEach(index => {
                    square.forEach(itm => {
                        if(itm.id == index) {
                            console.log(itm);
                            itm.children[0].style.color = 'green';
                        }
                    })
                });
            }
            console.log(acc);
}

function checkWinner (param1,param2) {
    if (param1 == 3) {
        console.log('cross wins!');

        setTimeout(() => {
            afterWin();
            alert('cross wins!');
        },500)
    } else if (param2 == 3) {
        console.log('rounds wins!');
        setTimeout(() => {
            afterWin();
            alert('rounds wins!');
        },500)
    }

    return true;
}
