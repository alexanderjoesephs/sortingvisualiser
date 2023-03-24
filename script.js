function createArrayObject(length){
    let arrayObject = []
    for(let i =0; i<length; i++){
        let randomInt = Math.floor(Math.random() * 450);
        let object = {p:i,e:randomInt}
        arrayObject.push(object);
    }
    return arrayObject;
}



function renderArrayStart(array){
    let container = document.querySelector('#container');
    container.style.width = `${array.length*10}px`
    for(let i = 0; i<array.length; i++){
        let d = document.createElement('div');
        d.classList.add('bar');
        d.style.height = `${array[i].e}px`
        container.appendChild(d);
        
    }
}

function renderArrayStartForBubbleSort(array){
    let container = document.querySelector('#container');
    container.style.width = `${array.length*10}px`
    for(let i = 0; i<array.length; i++){
        let d = document.createElement('div');
        d.classList.add('bar');
        d.style.height = `${array[i]}px`
        container.appendChild(d);
        
    }
}


async function renderArrayAnimation(animateList, time){
    
    let nodelist = document.querySelectorAll('.bar');
    for(let i=0; i<animateList.length; i++){
        for(let j =0; j<animateList[i].array.length; j++){
            await sleep(time);
            nodelist[animateList[i].startingDiv + j].style.height = `${animateList[i].array[j]}px`
            
            if(j>0){
                nodelist[animateList[i].startingDiv + j - 1].style.backgroundColor = "cyan";
            }
            else{
                for(let k = 1; k<nodelist.length; k++){
                    nodelist[k].style.backgroundColor = "cyan";
                }
            }
            nodelist[animateList[i].startingDiv + j].style.backgroundColor = "green";
        } 
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

 
 

    
function createAnimateObject (arraySection){
    let divToStartOn = arraySection[0].p;
    for(let i = 0; i<arraySection.length;i++){
        
        if(arraySection[i].p<divToStartOn){
            divToStartOn = arraySection[i].p;
            
        }
    }
    let arrayJustValues = [];
    for(let i = 0; i<arraySection.length; i++){
        arrayJustValues.push(arraySection[i].e);
    }
    console.log('Div to start on is ' + divToStartOn)
    let animateObject = {startingDiv: divToStartOn, array: arrayJustValues}
    animateList.push(animateObject);

}

function mergeSort(array) {
    const half = array.length / 2
    
    // Base case or terminating case
    if(array.length < 2){
        
      return array 
    }
    
    const left = array.splice(0, half)
    return merge(mergeSort(left),mergeSort(array))
  }



function merge(left, right) {
    let arr = []
    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
        // Pick the smaller among the smallest element of left and right sub arrays 
        if (left[0].e < right[0].e) {
            arr.push(left.shift())  
        } else {
            arr.push(right.shift()) 
        }
    }
    console.log([...arr, ...left, ...right])
    createAnimateObject([...arr, ...left, ...right])
    return  [...arr, ...left, ...right]
    // Concatenating the leftover elements
    // (in case we didn't go through the entire left or right array)

}



function createUnsortedArrayForBubbleSort(arrayLength){
    let array = [];
    for(let i = 0; i<arrayLength; i++){
        let randomInt = Math.floor(Math.random() * 450);
        array.push(randomInt);
    }
    return array;
}
    


async function bubbleSort (array, time){
    
    let len = array.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len-i; j++) {
            renderArrayForBubbleSort(array, j);
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

function renderArrayForBubbleSort(array, examined){
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

let animateList = [];
let createButton = document.querySelector('#create-button');
let selectNumber = document.querySelector('#select-number');
let startButton = document.querySelector('#start-button');
let selectTime = document.querySelector('#select-time');
let resetButton = document.querySelector('#reset-button');
let arrayObject;
let arrayForBubbleSort;
let chooseSort = document.querySelector('#chooseSort');
createButton.addEventListener('click', () => {
    let number = parseInt(selectNumber.value);
    if(number>0 &&  number<300 && chooseSort.value==="mergeSort"){
        chooseSort.style.display = "none";
        arrayObject = createArrayObject(number);
        console.log(arrayObject[5]);
        let resetButton = document.querySelector('#reset-button');
        createButton.style.display = "none";
        document.querySelector('#number-label').style.display = "none";
        selectNumber.style.display = "none";
        startButton.style.display = "inline";
        resetButton.style.display = 'inline';
        renderArrayStart(arrayObject);
        let timeLabel = document.querySelector('#time-label');
        timeLabel.style.display = "inline";
        document.querySelector('#message').innerHTML = "";

    }
    else if(number>0 &&  number<300 && chooseSort.value==="bubbleSort"){
        chooseSort.style.display = "none";
        let resetButton = document.querySelector('#reset-button');
        createButton.style.display = "none";
        document.querySelector('#number-label').style.display = "none";
        selectNumber.style.display = "none";
        startButton.style.display = "inline";
        resetButton.style.display = 'inline';
        let timeLabel = document.querySelector('#time-label');
        timeLabel.style.display = "inline";
        arrayForBubbleSort = createUnsortedArrayForBubbleSort(number); 
        renderArrayStartForBubbleSort(arrayForBubbleSort);
        document.querySelector('#message').innerHTML = "";

    }
    else{
        document.querySelector('#message').innerHTML = "Number of values must less than 300 and a sort needs to be selected";
    }
})

startButton.addEventListener('click', () => {
    let time = parseInt(selectTime.value);
    if(time>0 && chooseSort.value==="mergeSort"){
        document.querySelector('#time-label').style.display = "none";
        startButton.style.display=  'none';
        document.querySelector('#time-label').style.display = "none";
        let sorted = mergeSort(arrayObject);
        renderArrayAnimation(animateList, time);
        console.log(sorted);
        document.querySelector('#message').innerHTML = "";
    }
    else if(time>0 && chooseSort.value==="bubbleSort"){
        document.querySelector('#message').innerHTML = "";
        document.querySelector('#time-label').style.display = "none";
        startButton.style.display=  'none';
        document.querySelector('#time-label').style.display = "none";
        bubbleSort(arrayForBubbleSort, time);
    }
    else{
        document.querySelector('#message').innerHTML = "Time must be a positive integer";
    }
})

resetButton.addEventListener('click', () => {
    
    window.location.reload();

    
})