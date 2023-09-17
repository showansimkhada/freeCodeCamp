#!/bin/bash
PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"
CHECK_GUESS_NUMBER() {
  if [[ $GUESS_NUMBER -eq $SECRET_NUMBER ]]
  then 
    (( NUMBER_OF_GUESS++ ))
    echo -e "You guessed it in $NUMBER_OF_GUESS tries. The secret number was $SECRET_NUMBER. Nice job!"
    GET_BEST_GAME=$($PSQL "SELECT best_game FROM usernames WHERE username = '$USER_NAME'")
    if [[ $GET_BEST_GAME -gt $NUMBER_OF_GUESS ]]
    then
      UPDATE_USERNAME_ROW_BEST_GAME=$($PSQL "UPDATE usernames SET best_game = $NUMBER_OF_GUESS WHERE username = '$USER_NAME'")
    fi
  elif [[ $GUESS_NUMBER -lt $SECRET_NUMBER ]]
  then
    (( NUMBER_OF_GUESS++ ))
    GUESS "It's lower than that, guess again:"
  elif [[ $GUESS_NUMBER -gt $SECRET_NUMBER ]]
  then
    (( NUMBER_OF_GUESS++ ))
    GUESS "It's higher than that, guess again:"
  fi
}
GUESS(){
  if [[ $1 ]]
  then
    echo -e "$1"
  else
    SECRET_NUMBER=$(( ( RANDOM % 1000 + 1 ) ))
    echo "Guess the secret number between 1 and 1000:"
  fi
  read GUESS_NUMBER
  if [[ $GUESS_NUMBER =~ ^[0-9]+$ ]]
  then
    CHECK_GUESS_NUMBER
  else
    GUESS "That is not an integer, guess again:"
  fi
}
GAME() {
  echo Enter your username:
  read USER_NAME
  DB=$($PSQL "SELECT username, games_played, best_game FROM usernames WHERE username = '$USER_NAME'")
  if [[ -z $DB ]]
  then
    echo -e "Welcome, $USER_NAME! It looks like this is your first time here."
    INSERT_INTO_USERNAMES=$($PSQL "INSERT INTO usernames(username) VALUES('$USER_NAME')")
  else
    IFS="|" read NAME GAMES_PLAYED BEST_GAME <<< $DB
    echo -e "Welcome back, $NAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
  fi
  NUMBER_OF_GUESS=0
  GUESS
}
GAME