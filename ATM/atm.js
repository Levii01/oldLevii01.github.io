var card = {
  pin: 5555,
  authentication: false,
  endabled: true,
};
var account = {
  name: 'Miłosz',
  surname: 'Sędziak',
  balance: 500,
  myCard: card,
};
var atm = {
  money: 4000,
  access: false,
  password: 'secret123',
};
var errors = {
  cardDisabled: 'Card is disabled. Contact with operator to activate card.',
  blockCard: 'Incorrect Pin. Card has been disabled.',
  wrongOperatorPassword: 'Wrong operator password',
  atmNoMoneyOperator: "Can't withdraw, not enough money in ATM",
  noMoneyAccount: "You don't have enough money in your account",
  atmNoMoneyAccount: "We must apologise you because we don't have enough money in this ATM." +
  '<br>You need to find another ATM or visit our bank.',
  negativeValue: "You can't type in a negative value.",
};

function errorHide()
{
  $('#errors').fadeOut(1000);
}

function showError(somethng) {
  console.warn(new Date() + ' Error: ' + somethng);
  document.getElementById('errors').innerHTML = somethng;
  $('#errors').fadeIn(700);
  setTimeout('errorHide()', 5000);
}

function starter() {
  timer();
  firstChoice();
}

function firstChoice() {
  console.info(new Date() + 'ATM start page');
  document.getElementById('box1').innerHTML = '<h2>Select option:</h2>'
  + '<button class="button" onclick="insertPin()"><span>Insert card </span></button> '
  + '<br/><button class="button" onclick="pinOperator()"><span>Log in as operator </span></button>';
  document.getElementById('box2').innerHTML = '';
}


// #
// operator function!!!
// #

function pinOperator() {
  document.getElementById('box2').innerHTML = '<h2>Insert password:</h2> '
  + '<form onsubmit="testPasswordOperator();return false;"><input type="text"  id="passwordPlace" required><input type="submit" class="button"  ></form>';
}

function testPasswordOperator() {
  insertedPassword = document.getElementById('passwordPlace').value;
  if (insertedPassword == atm.password) {
    operatorLogIn();
    operatorOption();
    document.getElementById('box2').innerHTML = '<h2>Correct password!.</h2>';
  } else {
    firstChoice();
    // document.getElementById('errors').innerHTML = errors.wrongOperatorPassword;
    showError(errors.wrongOperatorPassword);
  }
}

function operatorOption() {
  document.getElementById('box1').innerHTML =
  '<h2>ATM operator options:</h2> <button class="button" onclick="atmChargeMoney()"><span>Add money to ATM</span></button>'
   + '<br/><button class="button" onclick="atmWithdrawMoney()"><span>Withdraw money from ATM</span></button>'
   + '<br/><button class="button" onclick="showAtmBalance()"><span>Show ATM balance</span></button>'
   + '<br/><button class="button" onclick="endabledCard()"><span>Activate user card</span></button>'
   + '<br/><button class="button" onclick="operatorLogOut()"><span>Log out</span></button>';
}

function atmWithdrawMoney() {
  document.getElementById('box2').innerHTML = '<h2>Withdraw ATM:</h2><br>'
  + 'How much money you want to withdraw?<br>'
  + '<form onsubmit="withdrawAtm();return false;"><input type="number"  id="removeMoneyAtm" required><input type="submit" class="button"  ></form>';
}

function withdrawAtm() {
  insertedMoneyAtm2 = parseInt(document.getElementById('removeMoneyAtm').value);
  if (insertedMoneyAtm2 >= 0) {
    if (atm.money >= insertedMoneyAtm2) {
      atm.money -= insertedMoneyAtm2;
      document.getElementById('box2').innerHTML = '<h2>Withdraw ATM:</h2><br>'
      + 'Amount: ' + insertedMoneyAtm2 + '$<br/> New balance: ' + atm.money + '$';
      console.warn(new Date() + 'Operator withdraw money from ATM, Amount: ' + insertedMoneyAtm2);
    }else {
      document.getElementById('box2').innerHTML = '<h2>Withdraw fail:</h2><br>'
      + 'Not enough money in ATM';
      showError(errors.atmNoMoneyOperator);
    }
  }else showError(errors.negativeValue);
}

function atmChargeMoney() {
  document.getElementById('box2').innerHTML = '<h2>Add money to ATM:</h2><br>'
  + 'How much money you want to charge?<br>'
  + '<form onsubmit="chargeAtm();return false;"><input type="number"  id="addMoneyAtm" required><input type="submit" class="button"  ></form>';
}

function chargeAtm() {
  insertedMoneyAtm = parseInt(document.getElementById('addMoneyAtm').value);
  if (insertedMoneyAtm >= 0) {
    atm.money += insertedMoneyAtm;
    document.getElementById('box2').innerHTML = '<h2>Charged ATM:</h2><br>'
    + 'Amount: ' + insertedMoneyAtm + '$<br/> New balance: ' + atm.money + '$';
    console.warn(new Date() + 'Operator charge ATM, Amount: ' + insertedMoneyAtm);
  }else showError(errors.negativeValue);
}

function showAtmBalance() {
  document.getElementById('box2').innerHTML = '<h2>Current ATM balance:</h2><br><h3>' + atm.money + '$</h3>';
  console.warn(new Date() + 'Operator show atm balance');
}

// account function!!!!!!
function insertPin() {
  document.getElementById('box2').innerHTML = '<h2>Insert pin card:</h2> '
  + '<form onsubmit="testPinUser();return false;"><input type="number"  id="pin" required><input type="submit" class="button"  ></form>';
}

function testPinUser() {
  insertedPin = parseInt(document.getElementById('pin').value);
  if (card.endabled) {
    pinAuthentication();
  }else showError(errors.cardDisabled);

}

function pinAuthentication() {
  if (insertedPin == card.pin && card.endabled) {
    logIn();
    userOption();
    document.getElementById('box2').innerHTML = '<h2>Correct pin number.</h2>';
  } else {
    firstChoice();
    disabledCard();
    showError(errors.blockCard);
  }
}

function userOption() {
  document.getElementById('box1').innerHTML =
  '<h2>Select option:</h2> <button class="button" onclick="userChargeMoney()"><span>Fund account</span></button>'
   + '<br/><button class="button" onclick="userWithdrawMoney()"><span>Withdraw money</span></button>'
   + '<br/><button class="button" onclick="showBalance()"><span>Show balance</span></button>'
   + '<br/><button class="button" onclick="owner()"><span>Owner information</span></button>'
   + '<br/><button class="button" onclick="logOut()"><span>Log out</span></button>';
}

function userWithdrawMoney() {
  document.getElementById('box2').innerHTML = '<h2>Withdraw money:</h2><br>'
  + 'How much money you want to withdraw?<br>'
  + '<form onsubmit="checkWithdrawAccount();return false;"><input type="number"  id="removeMoneyAccount" required><input type="submit" class="button"  ></form>';

}

// document.getElementById(valueStr).value == 0;

function checkWithdrawAccount() {
  insertedMoneyAcc2 = parseInt(document.getElementById('removeMoneyAccount').value);
  if (insertedMoneyAcc2 > 0) {
    if (account.balance >= insertedMoneyAcc2) {
      makeWithdrawAccount();
    }else {
      document.getElementById('box2').innerHTML = '<h2>Withdraw account:</h2><br>'
      + 'Somethings gone wrong..';
      showError(errors.noMoneyAccount);
    }
  }else showError(errors.negativeValue);
}

function makeWithdrawAccount() {
  if (atm.money >= insertedMoneyAcc2) {
    account.balance -= insertedMoneyAcc2;
    atm.money -= insertedMoneyAcc2;
    document.getElementById('box2').innerHTML = '<h2>Withdraw account:</h2><br>'
    + 'Amount: ' + insertedMoneyAcc2 + '$<br/> New balance: ' + account.balance + '$';
    console.log(new Date() + 'User withdraw money, Amount: ' + insertedMoneyAcc2);
  }else {
    document.getElementById('box2').innerHTML = '<h2>Withdraw account:</h2><br>'
    + 'Somethings gone wrong..';
    showError(errors.atmNoMoneyAccount);
  }
}

function userChargeMoney() {
  document.getElementById('box2').innerHTML = '<h2>Charged account:</h2><br>'
  + 'How much money you want to charge?<br>'
  + '<form onsubmit="chargeAccount();return false;"><input type="number"  id="addMoneyAccount" required><input type="submit" class="button"  ></form>';
}

function chargeAccount() {
  insertedMoneyAcc = parseInt(document.getElementById('addMoneyAccount').value);
  if (insertedMoneyAcc > 0) {
    account.balance += insertedMoneyAcc;
    atm.money += insertedMoneyAcc;
    document.getElementById('box2').innerHTML = '<h2>Charged account:</h2><br>'
    + 'Amount: ' + insertedMoneyAcc + '$<br/> New balance: ' + account.balance + '$';
    console.log(new Date() + 'User charge account, Amount: ' + insertedMoneyAcc);
  }else showError(errors.negativeValue);
}

function owner() {
  document.getElementById('box2').innerHTML = '<h2>Owner information:</h2><br>'
  + 'Name: ' + account.name + '<br>Surname: ' + account.surname  + '<br>Active card: ' + card.endabled;
  console.log(new Date() + 'Show information about owner');
}

function showBalance() {
  document.getElementById('box2').innerHTML = '<h2>Current balance:</h2><br><h3>' + account.balance + '$</h3>';
  console.log(new Date() + 'Show account balance');
}

// selectors :)
function logIn() {
  console.log(new Date() + 'Log in ' + 'Name: ' + account.name + ' Surname: ' + account.surname);
  card.authentication = true;
}

function logOut() {
  console.log(new Date() + 'Log out ' + 'Name: ' + account.name + ' Surname: ' + account.surname);
  card.authentication = false;
  firstChoice();
}

function endabledCard() {
  if (card.endabled) {
    document.getElementById('box2').innerHTML = '<h2>Status card:</2>'
    + '<h3>Card is activate.</h3>';
  }else {
    card.endabled = true;
    document.getElementById('box2').innerHTML = '<h2>Status card:</2>'
    + '<h3>Card has been activated.</h3>';
    console.log(new Date() + 'Disabled card ' + 'Name: ' + account.name + ' Surname: ' + account.surname + ' ,Status card:' + card.endabled);
  }
}

function disabledCard() {
  card.endabled = false;
  console.log(new Date() + 'Disabled card ' + 'Name: ' + account.name + ' Surname: ' + account.surname + ' ,Status card:' + card.endabled);

}

function operatorLogIn() {
  atm.access = true;
  console.warn(new Date() + 'Log in: operator');

}

function operatorLogOut() {
  atm.access = false;
  console.warn(new Date() + 'Log in: operator');
  firstChoice();
}

function timer() {
  var today = new Date();

  var day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();

  var hour = today.getHours();
  if (hour < 10) hour = '0' + hour;
  var minute = today.getMinutes();
  if (minute < 10) minute = '0' + minute;
  var second = today.getSeconds();
  if (second < 10) second = '0' + second;

  document.getElementById('clock').innerHTML = day + '.' + month + '.' + year +
      '  ' + hour + ':' + minute + ':' + second;
  // status();
  setTimeout('timer()', 1000);
}

function status() {
  document.getElementById('status').innerHTML = 'Logged in: ' + card.authentication
  + ',  Active card: ' + card.endabled + '<br/>Operator access: ' + atm.access + ',  Bank $: ' + atm.money;
}
