const container = document.querySelector(".data-container");

const sortButtons = document.getElementsByClassName("sort")
const startSortBtn = document.getElementById("start");
let array = [];

const labelSlider = document.getElementById("rangevalue");
const slider = document.getElementById("myRange");
slider.addEventListener("input", e => {
  labelSlider.innerHTML = slider.value  // Display the default slider value
  generateBlocks(slider.value)
})

function generateBlocks(num) {

  //Reset data-container and array
  container.innerHTML = "";
  array = []

  for (let i = 0; i < num; i += 1) {
    const value = Math.floor(Math.random() * 200);

    const block = document.createElement("div");
    block.classList.add("block");
    block.style.height = `${value * 2.5}px`;
    
    // Proportional display 
    block.style.width = window.innerWidth / num / 1.5 + "px";
    block.style.transform = `translateX(${i * window.innerWidth / num + 4}px)`;

    // Create block value useful to compare with others blocks
    const blockLabel = document.createElement("label");
    blockLabel.classList.add("block__id");
    blockLabel.innerHTML = value;
    array.push(value)

    block.appendChild(blockLabel);
    container.appendChild(block);
  }
}

function swapBubbleSort(el1, el2) {
  return new Promise(resolve => {
    const style1 = window.getComputedStyle(el1);
    const style2 = window.getComputedStyle(el2);

    const transform1 = style1.getPropertyValue("transform");
    const transform2 = style2.getPropertyValue("transform");

    el1.style.transform = transform2;
    el2.style.transform = transform1;

    // Wait for the transition to end!
    window.requestAnimationFrame(function() {
      setTimeout(() => {
        container.insertBefore(el2, el1);
        resolve();
      }, 100);
    });
  });
}

async function bubbleSort(delay = 100) {
  if (delay && typeof delay !== "number") {
    alert("sort: First argument must be a typeof Number");
    return;
  }
  let blocks = document.querySelectorAll(".block");
  for (let i = 0; i < blocks.length - 1; i += 1) {
    for (let j = 0; j < blocks.length - i - 1; j += 1) {
      blocks[j].style.backgroundColor = "#FF4949";
      blocks[j + 1].style.backgroundColor = "#FF4949";

      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, delay)
      );

      const value1 = Number(array[j]);
      const value2 = Number(array[j + 1]);

      if (value1 > value2) {
        await swapBubbleSort(blocks[j], blocks[j + 1]);
        blocks = document.querySelectorAll(".block");
      }

      blocks[j].style.backgroundColor = "#58B7FF";
      blocks[j + 1].style.backgroundColor = "#58B7FF";
    }

    blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
  }
}



  /************************************************/
 /*                   HEAP SORT                  */
/************************************************/

async function heapSort(array, delay = 100) {
  let size = array.length

  // build heapSort (rearrange array)
  for (let i = Math.floor(size / 2 - 1); i >= 0; i--)
    heapify(array, size, i)

  // one by one extract an element from heapSort
  for (let i = size - 1; i >= 0; i--) {
    // move current root to end
    let temp = array[0]
    array[0] = array[i]
    array[i] = temp

    // call max heapify on the reduced heapSort
    heapify(array, i, 0)
  }
}

// to heapify a subtree rooted with node i which is an index in array[]
async function heapify(array, size, i, delay = 100) {
  let max = i // initialize max as root
  let left = 2 * i + 1
  let right = 2 * i + 2
  let blocks = document.querySelectorAll(".block");
  const style1 = window.getComputedStyle(blocks[i]);
  let style2;
  
  // console.log(max)
  // console.log(left)
  // console.log(right)
  // await new Promise(resolve =>
  //   setTimeout(() => {
  //     resolve();
  //   }, delay)
  // );
  // if left child is larger than root
  if (left < size && array[left] > array[max]) {
    max = left
    style2 = window.getComputedStyle(blocks[left]);
  }
    

  // if right child is larger than max
  if (right < size && array[right] > array[max]) {
    max = right
    style2 = window.getComputedStyle(blocks[right]);
  }
    
  // if max is not root
  if (max != i) {
    // swap
    
    let temp = array[i]
    array[i] = array[max]
    array[max] = temp
    console.log(array)
    
    console.log(blocks[i])
    console.log(i)
    console.log(array[i])
    console.log(blocks[max])
    console.log(max)
    console.log(array[max])
    


    
    blocks[i].style.backgroundColor = "#FF4949"
    blocks[max].style.backgroundColor = "#FF4949"
   

    const transform1 = style1.getPropertyValue("transform");
    const transform2 = style2.getPropertyValue("transform");
    console.log(transform1)
    console.log(transform2)

    blocks[i].style.transform = transform2;
    blocks[max].style.transform = transform1;
    
    window.requestAnimationFrame(function() {
      setTimeout(() => {
        let blockTemp = blocks[max];
        container.insertBefore(blocks[max], blocks[i]);
        container.insertBefore(blocks[i], blockTemp);
      }, 100);
    });
    // await swapHeapSort(blocks[max], blocks[i]);
    
    blocks[i].style.backgroundColor = "#58B7FF";
    blocks[max].style.backgroundColor = "#58B7FF";

    // recursively heapify the affected sub-tree
    heapify(array, size, max)
  }
}

async function swapHeapSort(el1, el2) {
  return new Promise(resolve => {
    

    // Wait for the transition to end!
    window.requestAnimationFrame(function() {
      setTimeout(() => {
        container.insertBefore(el2, el1);
        resolve();
      }, 100);
    });
  });
}

// async function heap_root(input, i) {
//   let left = 2 * i + 1;
//   let right = 2 * i + 2;
//   let max = i;
//   // console.log(left)
//   // console.log(right)
//   // console.log(i)
  
//   if (left < array_length && input[left] > input[max]) {
//     // console.log("in left")
//       max = left;
//       blocks[index_A].style.backgroundColor = "#58B7FF";
//       blocks[index_B].style.backgroundColor = "#58B7FF";

//       const style1 = window.getComputedStyle(blocks[index_A]);
//       const style2 = window.getComputedStyle(blocks[index_B]);

//       const transform1 = style1.getPropertyValue("transform");
//       const transform2 = style2.getPropertyValue("transform");
//       // console.log(transform1)
//       // console.log(transform2)
//       blocks[index_A].style.transform = transform2;
//       blocks[index_B].style.transform = transform1;
//   }

//   if (right < array_length && input[right] > input[max]) {
//     // console.log("in right")
//       max = right;
//   }

//   if (max != i) {
//       swap(input, i, max);
//       heap_root(input, max);
//   }
// }

// async function swap(input, index_A, index_B) {
//   var temp = input[index_A];
//   let blocks = document.querySelectorAll(".block");
//   console.log(blocks[index_A]);
//   console.log(blocks[index_B]);
//   console.log(input[index_A])
//   console.log(input[index_B])
//   input[index_A] = input[index_B];
//   input[index_B] = temp;
  
//   blocks[index_A].style.backgroundColor = "#58B7FF";
//   blocks[index_B].style.backgroundColor = "#58B7FF";

//   const style1 = window.getComputedStyle(blocks[index_A]);
//   const style2 = window.getComputedStyle(blocks[index_B]);

//   const transform1 = style1.getPropertyValue("transform");
//   const transform2 = style2.getPropertyValue("transform");
//   // console.log(transform1)
//   // console.log(transform2)
//   blocks[index_A].style.transform = transform2;
//   blocks[index_B].style.transform = transform1;

//   window.requestAnimationFrame(function() {
//     setTimeout(() => {
//       container.insertBefore(blocks[index_B], blocks[index_A]);
//     }, 10);
//   });

// }

// async function heapSort(input, delay = 100) {
//   array_length = input.length;

//   for (let i = Math.floor(array_length / 2); i >= 0; i -= 1)      {
//       heap_root(input, i);
//     }

//   for (i = array_length - 1; i > 0; i--) {
//       swap(input, 0, i);
//       array_length--;
    
    
//       heap_root(input, 0);
//   }
// }

function initialize() {
  Array.from(sortButtons).forEach(el => {
    el.addEventListener("click", e => {
      changeStatus(el)
    })
  })
  generateBlocks(slider.value)
}

function changeStatus(el) {
  Array.from(sortButtons).forEach(element => {
      element.classList.remove("active")
    el.classList.add("active")
  })
}

async function startSort() {
  let activeSort = document.getElementsByClassName("active")[0].value;

  switch(activeSort) {
    case "Bubble Sort":
      bubbleSort();
      break;
    case "Heap Sort":
      heapSort(array);
      console.log(array);
      break;
  }
}

startSortBtn.addEventListener("click", e => {
    generateBlocks(slider.value) 
    startSort();
});

initialize()

