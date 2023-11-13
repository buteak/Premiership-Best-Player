const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');




let bestPlayers = [
  {
    Name: 'Luis Suarez',
    img: src = "./Images/Luiz Suarez.jpg"
  },
  {

    Name: 'Eden Hazard',
    img: src = "./Images/Hazard.jpg"
  },
  {

    Name: 'James Vardy',
    img: src = "./Images/vardy.jpg"
  },
  {

    Name: 'Nkolo Kante',
    img: src = "./Images/Kante.jpg"
  },
  {
    Name: 'Mohamed Salah',
    img: src = "./Images/Salah.jpg"

  },
  {
    Name: 'Virgil Van Dijk',
    img: src = "./Images/van dijk.jpg"
  },
  {
    Name: 'Kevin De Bruyne',
    img: src = "./Images/debruyne 2.jpg"
  },
  {
    Name: 'Ruben Diaz',
    img: src = "./Images/Ruben Dias.jpg"
  },
  {
    Name: 'Kevin De Bruyne',
    img: src = "./Images/debruyne 1.jpg"
  },
  {
    Name: 'Erling Halaand',
    img: src = "./Images/halland.jpg"

  }
]

//  Store player list
let playerList = [];

let startIndex;

createPlayer();


//  Insert player list to DOM

function createPlayer() {
  [...bestPlayers].map((a) => ({
    value: a,
    sort: Math.random()
  })).sort((a, b) => b.sort - a.sort)
    .map((a) => a.value).forEach((player, index) => {
    const li = document.createElement('li');
    li.setAttribute('data-index', index);

    li.innerHTML = `
       <span class="number"> ${index + 2014}</span>
       <div class="draggable" draggable ="true">
       <p class="person-name">${player.Name} </p>
       <img src="${player.img}" alt="${player.Name}">
       </div>
      `;
    playerList.push(li);

    draggableList.appendChild(li)
  });

  addPlayerListener();
}


function dragStart() {
  // console.log('Event :', 'dragstart')
  startIndex = +this.closest('li').getAttribute('data-index')
}
function dragEnter() {
  // console.log('Event :', 'dragenter')
  this.classList.add('over')
}
function dragLeave() {
  // console.log('Event :', 'dragleave')
  this.classList.remove('over')
}
function dragOver(e) {
  // console.log('Event :', 'dragover')
  e.preventDefault();
}
function dragDrop() {
  // console.log('Event :', 'drop')
  const endIndex = +this.getAttribute('data-index');
  swapIndex(startIndex, endIndex);
  this.classList.remove('over');
}

//  create function to swap index of the players

function swapIndex(firstIndex, lastIndex) {
  const playerOne = playerList[firstIndex].querySelector('.draggable');
  const playerTwo = playerList[lastIndex].querySelector('.draggable');

  playerList[firstIndex].appendChild(playerTwo);
  playerList[lastIndex].appendChild(playerOne);

}

//  function to check the order of the players

function checkOrder() {
  playerList.forEach((player, index) => {
    const personName = player.querySelector('.draggable').querySelector('.person-name').innerText;
    console.log(personName)
    console.log(bestPlayers[index].Name)
    console.log(index)
    if (personName !== bestPlayers[index].Name) {
      player.classList.add('wrong')
    } else {
      player.classList.remove('wrong')
      player.classList.add('right')
    }
  })
}



//  function to add player

function addPlayerListener() {
  const draggables = document.querySelectorAll(".draggable");
  const draggableList = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart)
  })
  draggableList.forEach((list) => {
    list.addEventListener('dragover', dragOver)
    list.addEventListener('drop', dragDrop)
    list.addEventListener('dragenter', dragEnter)
    list.addEventListener('dragleave', dragLeave)
  })
}

check.addEventListener('click', checkOrder);
