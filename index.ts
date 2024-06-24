import inquirer from "inquirer";
import chalk from "chalk";

// Initializing user balance and pin
let myBalance = 5000;
let myPin = 2233;

// Print welcome message

console.log(
  chalk.blue.bold.underline("\n \tWelcome to Muthair - ATM Machine\n")
);

let pinAnswer = await inquirer.prompt([
  {
    name: "pin",
    type: "number",
    message: chalk.yellow.bold("\nEnter your pin: "),
  },
]);
// Take input from user

if (pinAnswer.pin === myPin) {
  console.log(
    chalk.greenBright("\nYour pin is correct.Logged In Successfully\n")
  );

  // Take input from user to select operation method.

  let operationAns = await inquirer.prompt([
    {
      name: "operation",
      type: "list",
      message: chalk.yellow.bold("\nWhat do you want to do?\n"),
      choices: ["Withdraw", "Deposit", "Check Balance", "Exit"],
    },
  ]);

  // Withdrawal Method.

  if (operationAns.operation === "Withdraw") {
    let withdrawAns = await inquirer.prompt([
      {
        name: "withdrawMethod",
        type: "list",
        message: chalk.yellow.bold("\nSelect a Withdrawal Method.\n"),
        choices: ["Fast Cash", "Enter Amount"],
      },
    ]);
    if (withdrawAns.withdrawMethod === "Fast Cash") {
      let amountAns = await inquirer.prompt([
        {
          name: "fastCash",
          type: "list",
          message: chalk.yellow.bold("\nSelect amount to withdraw: \n"),
          choices: ["500", "1000", "2000", "5000", "10000", "20000"],
        },
      ]);
      if (amountAns.fastCash > myBalance) {
        console.log("\nYou don't have enough balance. Please try again.\n");
      } else {
        myBalance -= amountAns.fastCash;
        console.log(
          chalk.green.bold(
            "\nWithDraw Successful.Your New balance is: " +
              chalk.greenBright.underline(myBalance) +
              "\n"
          )
        );
        console.log("\nThank you for using Mutahir - ATM\n");
      }
    }
    if (withdrawAns.withdrawMethod === "Enter Amount") {
      let amountAns = await inquirer.prompt([
        {
          name: "amount",
          type: "number",
          message: chalk.yellow.bold("\nEnter amount to withdraw: \n"),
        },
      ]);
      if (amountAns.amount > myBalance) {
        console.log("\nYou don't have enough balance.\n");
      } else {
        myBalance -= amountAns.amount;
        console.log(
          chalk.green.bold.underline(
            "WithDraw Successful.Your New balance is: " + myBalance
          )
        );
        console.log("\nThank you for using Muthair - ATM\n");
      }
    }
  } else if (operationAns.operation === "Deposit") {
    let amountAns = await inquirer.prompt([
      {
        name: "amount",
        type: "number",
        message: chalk.yellow.bold("\nEnter amount to deposit: \n"),
      },
    ]);
    myBalance += amountAns.amount;
    console.log("Deposit Successful.\nYour New balance is: " + myBalance);
    console.log("\nThank you for using Mutahir - ATM\n");
  } else if (operationAns.operation === "Check Balance") {
    console.log(chalk.green.bold("\nYour balance is: " + myBalance));
    console.log("\nThank you for using Mutahir - ATM\n");
  } else if (operationAns.operation === "Exit") {
    console.log(chalk.green.bold("\nThank you for using Mutahir - ATM\n"));
  }
} else if (pinAnswer.pin !== myPin) {
  console.log(chalk.red.bold.underline("Pin is incorrect.\n Try Again!"));
}
