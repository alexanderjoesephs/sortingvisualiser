let container = document.querySelector('#container');
let array;
let maxHeight = 500;
let started = false;
let startButton = document.querySelector('#start-button');
let resetButton = document.querySelector('#reset-button');
let createButton = document.querySelector('#create-button');
let selectNumber = document.querySelector('#select-number');
let timeLabel = document.querySelector('#time-label');
let selectTime = document.querySelector('#select-time');



function createUnsortedArray(arrayLength){
    let array = [];
    for(let i = 0; i<arrayLength; i++){
        let randomInt = Math.floor(Math.random() * 500);
        array.push(randomInt);
    }
    return array;
}

function renderArrayStart(array){
    
    for(let i = 0; i<array.length; i++){
        let d = document.createElement('div');
        d.classList.add('bar');
        d.style.height = `${array[i]}px`
        
        //d.style.height = '50px';
        container.appendChild(d);
    }
}



function renderArray(array, examined){
    let nodelist = document.querySelectorAll('.bar');
    for(let i = 0; i<nodelist.length; i++){
        nodelist[i].style.height = `${array[i]}px`;
        if(i === examined || i === examined+1){
            nodelist[i].style.backgroundColor = "green";
        }
        else{
            nodelist[i].style.backgroundColor = "cyan";
        }
    }
    
    
}




function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

async function bubbleSort (array, time){
    
    let len = array.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len-i; j++) {
            renderArray(array, j);
            await sleep(time);
            if (array[j] > array[j + 1]) {
                let tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;
            }
        }
    }
    
    return array;
}





createButton.addEventListener('click', () => {
    let number = parseInt(selectNumber.value);
    if(number>0 &&  number<300){
        document.querySelector('#message').innerHTML = "";
        document.querySelector('#number-label').style.display = "none";
        array = createUnsortedArray(number);
        container.style.width = `${number*10}px`
        createButton.style.display = "none";
        selectNumber.style.display = "none";
        startButton.style.display = "inline";
        resetButton.style.display = 'inline';
        renderArrayStart(array);
        
        timeLabel.style.display = "inline";
    }
    else{
        document.querySelector('#message').innerHTML = "Number of values must be a positive integer less than 300";
    }
})


startButton.addEventListener('click', () => {
    let time = parseInt(selectTime.value);
    if(time>0){
        document.querySelector('#time-label').style.display = "none";
        bubbleSort(array, time);
        started = true;
        startButton.style.display=  'none';
        
        document.querySelector('#time-label').style.display = "none";
    }
    else{
        document.querySelector('#message').innerHTML = "Milliseconds per step must be a positive integer";
    }

    
    
})

resetButton.addEventListener('click', () => {
    
    window.location.reload();

    
})






