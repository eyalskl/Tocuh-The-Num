'use strict';
var gCellCount = 16;
var gNums = [];
var gNumToClick;
var gTimerCounter;
var gIntervalId;
var gElTimer = document.querySelector('.timer span');

function init() {
    gElTimer.innerText = `...`;
    gElTimer.style.color = 'black';
    if (gIntervalId) clearInterval(gIntervalId);
    initNums(gCellCount);
    gNumToClick = 1;
    renderBoard(gCellCount);
}

function renderBoard(cellCount) {
    var length = Math.sqrt(cellCount);
    var strHtml = '';
    for (var i = 0; i < length; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < length; j++) {
            strHtml += `<td onclick="cellClicked(this)">${drawNum()}</td>`
        }
        strHtml += '</tr>';
    }
    var elTbody = document.querySelector('.table');
    elTbody.innerHTML = strHtml;
}

function cellClicked(elClickedNum) {
    if (gNumToClick === 1) {
        var startTime = new Date();
        gElTimer.style.color = 'red';
    }
    var numVal = +elClickedNum.innerText;
    if (numVal !== gNumToClick) return
    elClickedNum.classList.toggle('clicked');
    gNumToClick++;
    if (gNumToClick === 2) {
        gIntervalId = setInterval(function () {
            gTimerCounter = (new Date() - startTime) / 1000;
            gElTimer.innerText = gTimerCounter;
        }, 1);
    }
    if (gNumToClick === gCellCount + 1) {
        clearInterval(gIntervalId);
        gElTimer.style.color = 'rgba(73, 233, 52, 0.999)'
        setTimeout(function () {
            if (confirm(`Good Job!
It took you ${gTimerCounter} Seconds to complete the game!\n
                     Would you like to play again?`)) init();
        }, 500);
    }
}

function setMode(elBtn) {
    var elEasyBtn = document.querySelector('.easy');
    var elMedBtn = document.querySelector('.medium');
    var elHardBtn = document.querySelector('.hard');
    switch (elBtn.className) {
        case 'easy':
            gCellCount = 16;
            switchBtnClasses(elEasyBtn, elHardBtn, elMedBtn);
            break;
        case 'medium':
            gCellCount = 25;
            switchBtnClasses(elMedBtn, elEasyBtn, elHardBtn);
            break;
        case 'hard':
            gCellCount = 36;
            switchBtnClasses(elHardBtn, elEasyBtn, elMedBtn);
    }
    init();
}

function switchBtnClasses(btnToAdd, btnToRemove1, btnToRemove2) {
    btnToAdd.classList.add('mode');
    btnToRemove1.classList.remove('mode');
    btnToRemove2.classList.remove('mode');
}

function initNums(length) {
    for (var i = 0; i < length; i++) {
        gNums.push(i + 1);
    }
    shuffle(gNums);
}

function drawNum() {
    return gNums.pop()
}

function shuffle(items) {
    var randIdx, keep, i;
    for (i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length - 1);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function showInstructions() {
    document.querySelector('p').hidden = ''
    setTimeout(function () { document.querySelector('p').hidden = 'true' }, 5000);
}