'''
Build a Planet Class
Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should create a class named Planet.
The Planet class should have an __init__ method that:
Has four parameters: self, name, planet_type, and star.
Raises a TypeError with the message name, planet type, and star must be strings if any of the arguments passed in is not a string type.
Raises a ValueError with the message name, planet_type, and star must be non-empty strings if any of the arguments passed in is an empty string.
Assigns the values passed in to the instance attributes name, planet_type, and star.
The Planet class should have an orbit method that returns a string in the format {name} is orbiting around {star}....
The Planet class should have a __str__ method that returns a string in the format Planet: {name} | Type: {planet_type} | Star: {star}.
You should create three instances of the Planet class named planet_1, planet_2, and planet_3.
You should print each planet object to see the __str__ method output.
You should call the orbit method on each planet object and print the result.
Tests:

Passed: 1. You should create a class named Planet.
Passed: 2. The Planet class should have an __init__ method.
Passed: 3. The __init__ method should have four parameters: self, name, planet_type, and star, in this order.
Passed: 4. The __init__ method should raise a TypeError with the message name, planet type, and star must be strings if the first argument passed in is not a string type.
Passed: 5. The __init__ method should raise a TypeError with the message name, planet type, and star must be strings if the second argument passed in is not a string type.
Passed: 6. The __init__ method should raise a TypeError with the message name, planet type, and star must be strings if the third argument passed in is not a string type.
Passed: 7. The __init__ method should raise a ValueError with the message name, planet_type, and star must be non-empty strings if the first argument passed in is an empty string.
Passed: 8. The __init__ method should raise a ValueError with the message name, planet_type, and star must be non-empty strings if the second argument passed in is an empty string.
Passed: 9. The __init__ method should raise a ValueError with the message name, planet_type, and star must be non-empty strings if the third argument passed in is an empty string.
Passed: 10. You should assign name to self.name in the __init__ method.
Passed: 11. You should assign planet_type to self.planet_type in the __init__ method.
Passed: 12. You should assign star to self.star in the __init__ method.
Passed: 13. The Planet class should have an orbit method.
Passed: 14. The orbit method should return a string in the format {name} is orbiting around {star}....
Passed: 15. The Planet class should have a __str__ method.
Passed: 16. The __str__ method should return a string in the format Planet: {name} | Type: {planet_type} | Star: {star}.
Passed: 17. You should create three instances of the Planet class named planet_1, planet_2, and planet_3.
Passed: 18. You should print each planet object to see the __str__ method output.
Passed: 19. You should call the orbit method on each planet object and print the result.
'''
import re
class Planet:
    def __init__(self, name, planet_type, star):
        self.name = name
        self.planet_type = planet_type
        self.star = star

        if not isinstance(name, str) or not isinstance(planet_type, str) or not isinstance(star, str):
            raise TypeError('name, planet type, and star must be strings')
        if len(name) == 0 or len(planet_type) == 0 or len(star) == 0:
            raise ValueError('name, planet_type, and star must be non-empty strings')
    
    def orbit(self):
        return f'{self.name} is orbiting around {self.star}...'
    
    def __str__(self):
        return f'Planet: {self.name} | Type: {self.planet_type} | Star: {self.star}'

planet_1 = Planet('Mercury','A','Sun')
planet_2 = Planet('Venus','B','Sun')
planet_3 = Planet('Earth','C','Sun')

print(planet_1)
print(planet_2)
print(planet_3)

print(planet_1.orbit())
print(planet_2.orbit())
print(planet_3.orbit())