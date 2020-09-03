// DOM Elements
const allCells = document.querySelectorAll('.cell:not(.row-top)');
const topCells = document.querySelectorAll('.cell.row-top');
const resetButton = document.querySelector('.reset');
const statusSpan = document.querySelector('.status');

// columns
const column0 = [allCells[35], allCells[28], allCells[21], allCells[14], allCells[7], allCells[0], topCells[0]];
const column1 = [allCells[36], allCells[29], allCells[22], allCells[15], allCells[8], allCells[1], topCells[1]];
const column2 = [allCells[37], allCells[30], allCells[23], allCells[16], allCells[9], allCells[2], topCells[2]];
const column3 = [allCells[38], allCells[31], allCells[24], allCells[17], allCells[10], allCells[3], topCells[3]];
const column4 = [allCells[39], allCells[32], allCells[25], allCells[18], allCells[11], allCells[4], topCells[4]];
const column5 = [allCells[40], allCells[33], allCells[26], allCells[19], allCells[12], allCells[5], topCells[5]];
const column6 = [allCells[41], allCells[34], allCells[27], allCells[20], allCells[13], allCells[6], topCells[6]];
const columns = [column0, column1, column2, column3, column4, column5, column6];


// rows
const topRow = [topCells[0], topCells[1], topCells[2], topCells[3], topCells[4], topCells[5], topCells[6]];
const row0 = [allCells[0], allCells[1], allCells[2], allCells[3], allCells[4], allCells[5], allCells[6]];
const row1 = [allCells[7], allCells[8], allCells[9], allCells[10], allCells[11], allCells[12], allCells[13]];
const row2 = [allCells[14], allCells[15], allCells[16], allCells[17], allCells[18], allCells[19], allCells[20]];
const row3 = [allCells[21], allCells[22], allCells[23], allCells[24], allCells[25], allCells[26], allCells[27]];
const row4 = [allCells[28], allCells[29], allCells[30], allCells[31], allCells[32], allCells[33], allCells[34]];
const row5 = [allCells[35], allCells[36], allCells[37], allCells[38], allCells[39], allCells[40], allCells[41]];
const rows = [row0, row1, row2, row3, row4, row5, topRow];


// variables
let gameIsLive = true;
let yellowIsNext = true;


// Functions
const getClassListArray = (cell) => {
  const classList = cell.classList;
  return [...classList];
};

const getCellLocation = (cell) => {
  const classList = getClassListArray(cell);

  const rowClass = classList.find(className => className.includes('row'));
  const colClass = classList.find(className => className.includes('col'));
  const rowIndex = rowClass[4];
  const colIndex = colClass[4];
  const rowNumber = parseInt(rowIndex, 10);
  const colNumber = parseInt(colIndex, 10);

  return [rowNumber, colNumber];
};

const getFirstOpenCellForColumn = (colIndex) => {
  
  
  
  
  const column = columns[colIndex];
  const columnWithoutTop = column.slice(0, 6);

  for (const cell of columnWithoutTop) {
    const classList = getClassListArray(cell);
    if (!classList.includes('yellow') && !classList.includes('red')) {
      return cell;
    }
  }

  return null;
};

const clearColorFromTop = (colIndex) => {
  const topCell = topCells[colIndex];
  topCell.classList.remove('yellow');
  topCell.classList.remove('red');
};

const getColorOfCell = (cell) => {
  const classList = getClassListArray(cell);
  if (classList.includes('yellow')) return 'yellow';
  if (classList.includes('red')) return 'red';
  return null;
};

const checkWinningCells = (cells) => {
  if (cells.length < 4) return false;

  gameIsLive = false;
  for (const cell of cells) {
    cell.classList.add('win');
  }
  statusSpan.textContent = `${yellowIsNext ? 'Yellow' : 'Red'} has won!`
  return true;
};

const checkStatusOfGame = (cell) => {
  const color = getColorOfCell(cell);

  if (!color) return ;
  const [rowIndex, colIndex] = getCellLocation(cell);

  // Check horizontally
  let winningCells = [cell];
  let rowToCheck = rowIndex;
  let colToCheck = colIndex - 1;
  while (colToCheck >= 0) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getColorOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      colToCheck--;
    } else {
      break;
    }
  }
  colToCheck = colIndex + 1;
  while (colToCheck <= 6) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getColorOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      colToCheck++;
    } else {
      break;
    }
  }
  let isWinningCombo = checkWinningCells(winningCells);
  if (isWinningCombo) return true;


  // Check vertically
  winningCells = [cell];
  rowToCheck = rowIndex - 1;
  colToCheck = colIndex;
  while (rowToCheck >= 0) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getColorOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      rowToCheck--;
    } else {
      break;
    }
  }
  rowToCheck = rowIndex + 1;
  while (rowToCheck <= 5) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getColorOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      rowToCheck++;
    } else {
      break;
    }
  }
  isWinningCombo = checkWinningCells(winningCells);
  if (isWinningCombo) return true;


  // Check diagonally /
  winningCells = [cell];
  rowToCheck = rowIndex + 1;
  colToCheck = colIndex - 1;
  while (colToCheck >= 0 && rowToCheck <= 5) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getColorOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      rowToCheck++;
      colToCheck--;
    } else {
      break;
    }
  }
  rowToCheck = rowIndex - 1;
  colToCheck = colIndex + 1;
  while (colToCheck <= 6 && rowToCheck >= 0) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getColorOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      rowToCheck--;
      colToCheck++;
    } else {
      break;
    }
  }
  isWinningCombo = checkWinningCells(winningCells);
  if (isWinningCombo) return true;


  // Check diagonally \
  winningCells = [cell];
  rowToCheck = rowIndex - 1;
  colToCheck = colIndex - 1;
  while (colToCheck >= 0 && rowToCheck >= 0) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getColorOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      rowToCheck--;
      colToCheck--;
    } else {
      break;
    }
  }
  rowToCheck = rowIndex + 1;
  colToCheck = colIndex + 1;
  while (colToCheck <= 6 && rowToCheck <= 5) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getColorOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      rowToCheck++;
      colToCheck++;
    } else {
      break;
    }
  }
  isWinningCombo = checkWinningCells(winningCells);
  if (isWinningCombo) return true;

  // Check to see if we have a tie
  const rowsWithoutTop = rows.slice(0, 6);
  for (const row of rowsWithoutTop) {
    for (const cell of row) {
      const classList = getClassListArray(cell);
      if (!classList.includes('yellow') && !classList.includes('red')) {
        return false;
      }
    }
  }

  gameIsLive = false;
  statusSpan.textContent = "Game is a tie!";
};



// Event Handlers
const handleCellMouseOver = (e) => {
  if (!gameIsLive) return;
  const cell = e.target;
  const [rowIndex, colIndex] = getCellLocation(cell);

  const topCell = topCells[colIndex];
  topCell.classList.add(yellowIsNext ? 'yellow' : 'red');
};

const handleCellMouseOut = (e) => {
  const cell = e.target;
  const [rowIndex, colIndex] = getCellLocation(cell);
  clearColorFromTop(colIndex);
};

const handleCellClick = (e) => {
  
  if (!gameIsLive) return;
  const cell = e.target;
  const [rowIndex, colIndex] = getCellLocation(cell);

  const openCell = getFirstOpenCellForColumn(colIndex);
  

  if (!openCell) return;

  

  openCell.classList.add('yellow');
  
  checkStatusOfGame(openCell);

  
  
  

  yellowIsNext = !yellowIsNext;
  

  
  if (gameIsLive) {
    
    
    
    var AI_Index = miniMax(3,true);
    
    
    

    const openCellRED = getFirstOpenCellForColumn(AI_Index[0]);

    openCellRED.classList.add('red');

    
    checkStatusOfGame(openCellRED);
    
    
    yellowIsNext = !yellowIsNext;
    
  }



  
};




// Adding Event Listeners
for (const row of rows) {
  for (const cell of row) {
    cell.addEventListener('mouseover', handleCellMouseOver);
    cell.addEventListener('mouseout', handleCellMouseOut);
    cell.addEventListener('click', handleCellClick);
  }
}

resetButton.addEventListener('click', () => {
  for (const row of rows) {
    for (const cell of row) {
      cell.classList.remove('red');
      cell.classList.remove('yellow');
      cell.classList.remove('win');
    }
  }
  gameIsLive = true;
  yellowIsNext = true;
  statusSpan.textContent = '';
});





//


function miniMax(depth, maximizingPlayer) {
  var valid_location = findOpenCol();
  
  
  var is_terminal = is_terminal_node(allCells,'red') || is_terminal_node(allCells,'yellow') || valid_location.length == 0;

  if (depth == 0 || is_terminal){
    if ( is_terminal_node(allCells,'red')) return [null,100000000000];
    else if (is_terminal_node(allCells,'yellow')) return [null, -100000000000];
    else if (valid_location.length == 0) return [null,0];
    else return [null,score_position(allCells)];

  }
  else if (maximizingPlayer)
  {
    var value = Number.NEGATIVE_INFINITY;
    var column = valid_location[Math.floor(Math.random() * valid_location.length)];

    for (var i = 0 ; i < valid_location.length;i++ )
    {
      
      
      var row = getFirstOpenCellForColumn(valid_location[i]);
      row.classList.add('red');
      var new_score = miniMax(depth-1,false)[1];
      
      if (new_score > value)
      {
        value = new_score;
        column = valid_location[i];
      }
      row.classList.remove('red');


    }

    return [column, value];
    


  }
  else 
  {
    var value = Number.POSITIVE_INFINITY;
    var column = valid_location[Math.floor(Math.random() * valid_location.length)];

    for (var i = 0 ; i<valid_location.length;i++)
    {
      
      var row = getFirstOpenCellForColumn(valid_location[i]);
      row.classList.add('yellow');
      var new_score = miniMax(depth-1,true)[1];
      if (new_score < value)
      {
        value = new_score;
        column = valid_location[i];
      }
      row.classList.remove('yellow');


    }
    return [column, value];
  }


};

  






function is_terminal_node(board,color){
  var k = 7;
  var n = 0;
  
  for (i = 0; i<6 ;i++){
    
    for (j = 0; j<4 ;j++){
      if ( getColorOfCell(board[(j + k*n)]) == color && getColorOfCell(board[(j + k*n)+1]) == color && getColorOfCell(board[(j + k*n)+2]) == color && getColorOfCell(board[(j + k*n)+3]) == color )
      {
        return true;}
    }
    n  = n + 1;
  }

  //vertical
  for (i = 21; i<42 ;i++){
    if ( getColorOfCell(board[i]) == color && getColorOfCell(board[i-7]) == color && getColorOfCell(board[i-14]) == color && getColorOfCell(board[i-21]) == color )
    {
      
      return true;
    }

  }

  // horizontal / 
  var positive_horizontal_to_check = [21,28,22,35,29,23,36,30,24,37,31,38];
  

  for (var i =0 ;i<positive_horizontal_to_check.length;i++){
    
    var first = positive_horizontal_to_check[i];
    
    if (getColorOfCell(board[first]) == color &&
    getColorOfCell(board[first-6]) == color && 
    getColorOfCell(board[first-12]) == color && 
    getColorOfCell(board[first-18]) == color) 
    {
     
      return true;}
  

  }
  // horizontal \ 

  var negative_horizontal_to_check = [27,34,26,41,33,25,40,32,24,39,31,38];
  

  for (var i =0 ;i<negative_horizontal_to_check.length;i++){
    
    var first = negative_horizontal_to_check[i];
    
    if (getColorOfCell(board[first]) == color &&
    getColorOfCell(board[first-8]) == color && 
    getColorOfCell(board[first-16]) == color && 
    getColorOfCell(board[first-24]) == color) 
    {
     
      return true;}



  }



}

function findOpenCol(){
  var openLocation = [];
  for (i=0; i<7; i++){
    if (getFirstOpenCellForColumn(i)){
      openLocation.push(i);
    }
  }
  return (openLocation);


}








function score_position(board){



  var score = 0;


  // center pieces

  var center_array = [];
  for (var i = 0; i<6;i++){
    
    center_array.push(getColorOfCell(board[i*7 + 3]));
  }
  var center_count = count(center_array,'red');
  score += center_count * 3;
 

  var k = 7;
  var n = 0;
 
  var row_array = [];
  for (var i = 0; i<6 ;i++){
    
    for (var j = 0; j<4 ;j++){
      row_array.push(getColorOfCell(board[(j + k*n)])); 
      row_array.push(getColorOfCell(board[(j + k*n)+1])); 
      row_array.push(getColorOfCell(board[(j + k*n)+2])); 
      row_array.push(getColorOfCell(board[(j + k*n)+3])); 
      
      score += evaluate_window(row_array);
      row_array = [];
      
      
        
    }
    
    
    n  = n + 1;
  }
  












  // vertical
  
  var col_array = [];
  for (i = 21; i<42 ;i++){
    col_array.push(getColorOfCell(board[i])) ;
    col_array.push(getColorOfCell(board[i-7])) ;
    col_array.push(getColorOfCell(board[i-14])) ;
    col_array.push(getColorOfCell(board[i-21])); 
    score += evaluate_window(col_array);
    col_array = [];
  }


  // diagonal /
  var positive_horizontal_to_check = [21,28,22,35,29,23,36,30,24,37,31,38];
  var positive_horizontal_array = [];

  for (var i =0 ;i<positive_horizontal_to_check.length;i++){
    
    var first = positive_horizontal_to_check[i];
    
    positive_horizontal_array.push(getColorOfCell(board[first])) ;
    positive_horizontal_array.push(getColorOfCell(board[first-6])) ;
    positive_horizontal_array.push(getColorOfCell(board[first-12])) ;
    positive_horizontal_array.push(getColorOfCell(board[first-18])); 
    score += evaluate_window(positive_horizontal_array);
    positive_horizontal_array = [];



  }
  // diagonal \
  var negative_horizontal_to_check = [27,34,26,41,33,25,40,32,24,39,31,38];
  var negative_horizontal_array = [];

  for (var i =0 ;i<negative_horizontal_to_check.length;i++){
    
    var first = negative_horizontal_to_check[i];
    
    negative_horizontal_array.push(getColorOfCell(board[first])) ;
    negative_horizontal_array.push(getColorOfCell(board[first-8])) ;
    negative_horizontal_array.push(getColorOfCell(board[first-16])) ;
    negative_horizontal_array.push(getColorOfCell(board[first-24])); 
    score += evaluate_window(negative_horizontal_array);
    negative_horizontal_array = [];



  }

   
  return score;
}
function evaluate_window(lstOfFour){
  
  var score = 0;
  var AI_piece = 'red';
  var Player_piece = 'yellow';
  var Empty = null;

  
  if (count(lstOfFour,'red' ) ==  4 ){
    score += 100;

  }

  if (count(lstOfFour,'red' ) ==  3 &&  count(lstOfFour,null ) ==  1){
    score += 5;

  }
  if (count(lstOfFour,'red' ) ==  2 &&  count(lstOfFour,null ) ==  2){
    score += 2;

  }
  if (count(lstOfFour,'yellow' ) ==  2 &&  count(lstOfFour,null ) ==  2){
    
    score -= 2;

  }
  if (count(lstOfFour,'yellow' ) ==  3 &&  count(lstOfFour,null ) ==  1){
    
    score -= 40;

  }

  
  return score;



}

function count(lst, color){
  
  var coun = 0;

  for (i = 0 ; i<lst.length; i++){
    
    if (lst[i] == color){
      coun +=1;
    }


  }
  return coun;


}


function pick_best_move(board){
  valid_location = findOpenCol();
  best_score = -10000;
  best_col = valid_location[Math.floor(Math.random() * valid_location.length)];
  for(var i =0; i<valid_location.length;i ++){
    var col = valid_location[i]
    var openCell = getFirstOpenCellForColumn(col);
    openCell.classList.add('red');
    score = score_position(allCells);
    if (score>best_score){
      best_score =score;
      best_col = col;
    }
    openCell.classList.remove('red');

  }
  return best_col;


}