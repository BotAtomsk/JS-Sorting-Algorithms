const items = 150;
const numRange = 10;

const randomizeInput = document.getElementById("randomizeButton");

randomizeInput.addEventListener("click", () => {
  event.preventDefault();
  const dropdowns = document.getElementsByClassName("values-dropdown");
  for (const dropdown of dropdowns) {
    dropdown.value = Math.floor(Math.random() * numRange);
  }
})

const sortInputArray = (event) => {
  event.preventDefault();
  
  // store the input values
  const inputValues = [...document.getElementsByClassName("values-dropdown")].map((dropdown) => Number(dropdown.value));

  // depending on the button that was clicked we want to launch the corresponding function
  // store the algorithm object searching it by the id, provided by the event that trigered sortInputArray()
  const algorithm = algorithms.find(obj => obj.id === event.target.id);

  const start = performance.now();
  // access the function of that algorithm, execute it with inputValues as parameter, and obtain the sorted array
  const sortedValues = algorithm.function(inputValues);
  const end = performance.now();
  const timePerformance = (end - start).toFixed(4);

  // update the UI with the sorted array
  updateUI(sortedValues, timePerformance, algorithm.buttonText);

  document.getElementById('timeResultDiv').scrollIntoView({ behavior: 'smooth' });
}

const updateUI = (array = [], timePerformance, algorithm) => {
  array.forEach((num, i) => {
    const outputValueNode = document.getElementById(`output-value-${i}`);
    outputValueNode.innerText = num;
  })

  timeResult.innerText = `The ${algorithm} took ${timePerformance}ms to execute, for a sample of ${items} items and with a number range of 0 to ${numRange}.`;
}


// SORT FUNCTIONS
const bubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }

  return array;
}

const selectionSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    const temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
  }

  return array;
}

const insertionSort = (array) => {
  for (let i = 1; i < array.length; i++) {
    const currValue = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > currValue) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = currValue;
  }
  return array;
}

const defaultSort = (array) => {
  return array.sort((a, b) => a - b);
}


const algorithms = [
  {id: "bubbleSort", function: bubbleSort, buttonText: "Bubble Sort"},
  {id: "selectionSort", function: selectionSort, buttonText: "Selection Sort"},
  {id: "insertionSort", function: insertionSort, buttonText: "Insertion Sort"},
  {id: "defaultSort", function: defaultSort, buttonText: "Default JS Sort"}
];

document.getElementById('goToSortingBtn').addEventListener('click', () => {
  document.getElementById('sortingButtons').scrollIntoView({ behavior: 'smooth' });
});
document.addEventListener("DOMContentLoaded", loadDinamicJS);

function createSortingButtons() {
  const buttonDiv = document.getElementById("sortingButtons");
  algorithms.forEach((algorithm) => {
    const sortButton = document.createElement("button");
    sortButton.setAttribute("id", `${algorithm.id}`);
    sortButton.innerText = algorithm.buttonText;
    sortButton.addEventListener("click", sortInputArray);
    buttonDiv.appendChild(sortButton);
  });
}

function createInputSelects() {
  const selectorFieldset = document.getElementById("selectorContainer");

  const openingBracket = document.createElement('span');
  openingBracket.textContent = '[';
  selectorFieldset.appendChild(openingBracket);

  for (let i = 0; i < items; i++) {
    const select = document.createElement('select');
    select.name = `values${i}`; // Optional: unique name for each select
    select.className = 'values-dropdown';
    select.setAttribute('aria-label', `number ${i}`);

    for (let j = 0; j <= numRange - 1; j++) {
      const option = document.createElement('option');
      option.value = j;
      option.textContent = j;
      select.appendChild(option);
    }

    const options = select.querySelectorAll('option');
    const randomIndex = Math.floor(Math.random() * options.length);
    options[randomIndex].selected = true;

    selectorFieldset.appendChild(select);

    if (i < items - 1) {
      const comma = document.createElement('span');
      comma.className = 'comma';
      comma.textContent = ',';
      selectorFieldset.appendChild(comma);
    }
  }

  const closingBracket = document.createElement('span');
  closingBracket.textContent = ']';
  selectorFieldset.appendChild(closingBracket);

}

function createOutput() {
  const outputDiv = document.getElementById("outputContainer");

  const openingBracket = document.createElement('span');
  openingBracket.className = 'bracket';
  openingBracket.textContent = '[';
  outputDiv.appendChild(openingBracket);

  for (let i = 0; i < items; i++) {
    const innerDiv = document.createElement('div');
    
    const outputValue = document.createElement('span');
    outputValue.className = 'output-value';
    outputValue.id = `output-value-${i}`;
    outputValue.textContent = "0";
    innerDiv.appendChild(outputValue);

    outputDiv.appendChild(innerDiv);
    
    if (i < items - 1) {
      const comma = document.createElement('span');
      comma.className = 'comma';
      comma.textContent = ',';
      outputDiv.appendChild(comma);
    }
  }

  const closingBracket = document.createElement('span');
  closingBracket.className = 'bracket';
  closingBracket.textContent = ']';
  outputDiv.appendChild(closingBracket);
  
}

function loadDinamicJS() {
  createSortingButtons();
  createInputSelects();
  createOutput();
}
