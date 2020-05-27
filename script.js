let cross = document.querySelectorAll('.row div i');
let square = document.querySelectorAll('.row div');
let rows = document.querySelectorAll('.row');
let count = 0;

cross.forEach(elem => {
    elem.style.display = "none";
});

square.forEach(elem => {
    elem.onclick = () => {
        if (count == 0) {
            [...elem.children].forEach(item => {
                if (item.textContent == "clear") {
                    item.style.display = "block";
                    count++;
                } else if (item.textContent == "panorama_fish_eye"){
                    item.remove();
                }
            });
        } else if (count == 1) {
            [...elem.children].forEach(item => {
                if (item.textContent == "panorama_fish_eye") {
                    item.style.display = "block";
                    count--;
                } else if (item.textContent == "clear"){
                    item.remove();
                }
            });
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

    rows.forEach(itm => {
        // CHECK FIRST COLUMN
        if(itm.children[0].children.length == 1) {
            [...itm.children[0].children].forEach(elem => {
                if (elem.textContent == "clear") {
                    clear++;
                } else {
                    round++;
                }
                // console.log(elem.textContent);
            });
        };
    });

    if (clear == 3) {
        console.log('cross wins!');
        square.forEach(elem => {
            elem.removeAttribute("id");
        })
        setTimeout(() => {
            afterWin();
            alert('cross wins!');
        },500)
    } else if (round == 3) {
        console.log('rounds wins!');
        square.forEach(elem => {
            elem.removeAttribute("id");
        })
        setTimeout(() => {
            afterWin();
            alert('rounds wins!');
        },500)
        
    } else {
        // CHECK SECOND COLUMN
        clear = 0;
        round = 0;

        rows.forEach(itm => {
            if(itm.children[1].children.length == 1) {
                [...itm.children[1].children].forEach(elem => {
                    if (elem.textContent == "clear") {
                        clear++;
                    } else {
                        round++;
                    }
                });
            };
        });

        if (clear == 3) {
            console.log('cross wins!');
            square.forEach(elem => {
                elem.removeAttribute("id");
            })
            setTimeout(() => {
                afterWin();
                alert('cross wins!');
            },500)
        } else if (round == 3) {
            console.log('rounds wins!');
            square.forEach(elem => {
                elem.removeAttribute("id");
            })
            setTimeout(() => {
                afterWin();
                alert('rounds wins!');
            },500)
            
        }else {
            // CHECK THIRD COLUMN
            clear = 0;
            round = 0;

            rows.forEach(itm => {
                if(itm.children[2].children.length == 1) {
                    [...itm.children[2].children].forEach(elem => {
                        if (elem.textContent == "clear") {
                            clear++;
                        } else {
                            round++;
                        }
                    });
                };
            });
            
            if (clear == 3) {
                console.log('cross wins!');
                square.forEach(elem => {
                    elem.removeAttribute("id");
                })
                setTimeout(() => {
                    afterWin();
                    alert('cross wins!');
                },500)
            } else if (round == 3) {
                console.log('rounds wins!');
                square.forEach(elem => {
                    elem.removeAttribute("id");
                })
                setTimeout(() => {
                    afterWin();
                    alert('rounds wins!');
                },500)
                
            }
        }
    }
}


function checkRows() {
    rows.forEach(itm => {

        let clear = 0;
        let round = 0;
        // CHECK ROWS

        for(let i = 0; i < 3; i++) {
            if ([...itm.children[i].children].length == 1) {
                [...itm.children[i].children].forEach(itm => {
                    if (itm.textContent == "clear") {
                        clear++;
                    } else {
                        round++;
                    }
                });
            }
        }

        if (clear == 3) {
            console.log('cross wins!');
            square.forEach(elem => {
                elem.removeAttribute("id");
            })
            setTimeout(() => {
                afterWin();
                alert('cross wins!');
            },500)
        } else if (round == 3) {
            console.log('rounds wins!');
            square.forEach(elem => {
                elem.removeAttribute("id");
            })
            setTimeout(() => {
                afterWin();
                alert('rounds wins!');
            },500)
            
        }
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
            let acc = 0;
            indexesCross.forEach(num => {
                acc+= +num;
            })

            console.log(acc);

            if (acc == 6 || acc == 18 || acc == 10 || acc == 14) {
                clear--;
            } else {
                indexesCross.forEach(index => {
                    square.forEach(itm => {
                        if(itm.id == index) {
                            console.log(itm);
                            itm.children[0].style.color = 'green';
                        }
                    })
                });
            }

        } else if (round == 3) {
            let acc = 0;
            indexesRounds.forEach(num => {
                acc+= +num;
            })

            if (acc == 6 || acc == 18 || acc == 10 || acc == 14) {
                round--;
            } else {
                indexesRounds.forEach(index => {
                    square.forEach(itm => {
                        if(itm.id == index) {
                            console.log(itm);
                            itm.children[0].style.color = 'green';
                        }
                    })
                });
            }
        }



        if (clear == 3) {
            console.log('cross wins!');
            // square.forEach(elem => {
            //     elem.removeAttribute("id");
            // })
            setTimeout(() => {
                afterWin();
                alert('cross wins!');
            },500)
        } else if (round == 3) {
            console.log('rounds wins!');
            // square.forEach(elem => {
            //     elem.removeAttribute("id");
            // })
            setTimeout(() => {
                afterWin();
                alert('rounds wins!');
            },500)
            
        }
    });
} 

function afterWin (){
    square.forEach(itm => {
        itm.onclick = () => {}
    })
}