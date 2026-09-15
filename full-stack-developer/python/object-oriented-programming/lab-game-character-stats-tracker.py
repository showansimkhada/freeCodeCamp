'''
Build a Game Character Stats Tracker
In this lab, you'll build a game character stats tracker. The program will allow you to create a character 
with specific attributes, update those attributes, and retrieve the current stats of the character.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

Create a class named GameCharacter that represents a game character and manages character stats.
When instantiated, a new GameCharacter object should have the following attributes:

_name set to the string given at the moment of the instantiation.
_health set to 100.
_mana set to 50.
_level set to 1.
Create a name property for read-only access to the character's name.
For the health property:

Define a getter that returns the current health.
Define a setter that prevents health from being set below 0, and caps the health at 100.
For the mana property:

Define a getter that returns the current mana.
Define a setter that prevents mana from being set below 0, and caps the mana at 50.
Create a getter for level to return the character's current level.
Define a method named level_up that:

Increases the character's level by 1.
Resets health to 100 and mana to 50 using their corresponding property setters.
Prints a message in the form of <name> leveled up to <level>! (where <name> and <level> should be replaced by 
the character's name and new level, respectively).
Define a __str__ method that returns a formatted string including:

The character's name.
The character's level.
The character's current health.
The character's current mana.
For example, a character named Kratos, right after the instantiation, should be represented as the following:

Name: Kratos
Level: 1
Health: 100
Mana: 50
Usage example
hero = GameCharacter('Kratos') # Creates a new character named Kratos
print(hero)  # Displays the character's stats

hero.health -= 30  # Decreases health by 30
hero.mana -= 10    # Decreases mana by 10
print(hero)  # Displays the updated stats

hero.level_up()  # Levels up the character
print(hero)  # Displays the stats after leveling up
Tests:

Passed: 1. You should have a GameCharacter class.
Passed: 2. You should have an __init__ method in the GameCharacter class.
Passed: 3. The __init__ method should have two parameters, with the first being self.
Passed: 4. You should set self._name to the string given at the moment of instantiation inside the __init__ method.
Passed: 5. You should assign 100 to self._health inside the __init__ method.
Passed: 6. You should assign 50 to self._mana inside the __init__ method.
Passed: 7. You should assign 1 to self._level inside the __init__ method.
Passed: 8. You should have a name method in the GameCharacter class.
Passed: 9. The name method should have only one parameter, self.
Passed: 10. You should return self._name in the name method.
Passed: 11. The name method should have a @property decorator.
Passed: 12. You should have a health method in the GameCharacter class.
Passed: 13. The health method should have only one parameter, self.
Passed: 14. You should return self._health in the health method.
Passed: 15. The health method should have a @property decorator.
Passed: 16. You should create a health setter method.
Passed: 17. The health setter method should have a @health.setter decorator.
Passed: 18. The health setter method should have two parameters, with the first being self.
Passed: 19. You should set self._health to 0 if the value given to the health setter is less than 0.
Passed: 20. You should set self._health to 100 if the value given to the health setter is greater than 100.
Passed: 21. You should set self._health to the value given to the health setter when the value is between 0 and 100.
Passed: 22. You should have a mana method in the GameCharacter class.
Passed: 23. The mana method should have only one parameter, self.
Passed: 24. You should return self._mana in the mana method.
Passed: 25. The mana method should have a @property decorator.
Passed: 26. You should create a mana setter method.
Passed: 27. The mana setter method should have a @mana.setter decorator.
Passed: 28. The mana setter method should have two parameters, with the first being self.
Passed: 29. You should set self._mana to 0 if the value given to the mana setter is less than 0.
Passed: 30. You should set self._mana to 50 if the value given to the mana setter is greater than 50.
Passed: 31. You should set self._mana to the value given to the mana setter if the value is between 0 and 50.
Passed: 32. You should have a level method in the GameCharacter class.
Passed: 33. The level method should have only one parameter, self.
Passed: 34. You should return self._level in the level method.
Passed: 35. The level method should have a @property decorator.
Passed: 36. You should have a level_up method in the GameCharacter class.
Passed: 37. The level_up method should have only one parameter, self.
Passed: 38. You should increase self._level by 1 in the level_up method.
Passed: 39. You should set self.health to 100 in the level_up method.
Passed: 40. You should set self.mana to 50 in the level_up method.
Passed: 41. The level_up method should print <name> leveled up to <level>! (where <name> and <level> should be replaced by the character's name and new level, respectively).
Passed: 42. You should have a __str__ method in the GameCharacter class.
Passed: 43. The __str__ method should have only one parameter, self.
Passed: 44. Your __str__ method should return a string with the character's stats using the provided format.
'''


class GameCharacter:
    def __init__(self, name):
        self._name = name
        self._health = 100
        self._mana = 50
        self._level = 1

    @property
    def name(self):
        return self._name

    @property
    def health(self):
        return self._health

    @property
    def mana(self):
        return self._mana
    
    @property
    def level(self):
        return self._level

    @health.setter
    def health(self, new_health):
        if new_health < 0:
            self._health = 0
        elif new_health > 100:
            self._health = 100
        else:
            self._health = new_health
    
    @mana.setter
    def mana(self, new_mana):
        if new_mana < 0:
            self._mana = 0
        elif new_mana > 50:
            self._mana = 50
        else:
            self._mana = new_mana

    def level_up(self):
        self._level += 1
        self.health = 100
        self.mana = 50
        print(f"{self.name} leveled up to {self.level}!")

    def __str__(self):
        return f"Name: {self.name}\nLevel: {self.level}\nHealth: {self.health}\nMana: {self.mana}"