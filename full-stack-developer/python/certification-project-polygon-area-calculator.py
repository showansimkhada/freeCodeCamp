import math

class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def set_width(self, width):
        self.width = width
    
    def set_height(self, height):
        self.height = height

    def get_area(self):
        return self.width * self.height
    
    def get_perimeter(self):
        return 2*(self.width + self.height)

    def get_diagonal(self):
        return math.sqrt(self.width**2 + self.height **2)
    
    def get_picture(self):
        result = ''
        if (self.height > 50 or self.width > 50):
            return 'Too big for picture.'
        for i in range(self.height):
            result += "*"
            for i in range(self.width-1):
                result += "*"
            result +='\n'
        return result

    def get_amount_inside(self, shape):
        result = self.get_area() / shape.get_area()
        return int(result)

    def __str__(self):
        return f"Rectangle(width={self.width}, height={self.height})"


class Square(Rectangle):
    def __init__(self, length):
        super().__init__(length, length)
    
    def set_height(self, length):
        super().set_width(length)
        super().set_height(length)
    
    def set_side(self, length):
        self.height = length
        self.width = length
    
    def get_area(self):
        return self.width * self.height
    
    def get_picture(self):
        result = ''
        if (self.height > 50 or self.width > 50):
            return 'Too big for picture.'
        for i in range(self.height):
            result += "*"
            for i in range(self.width-1):
                result += "*"
            result +='\n'
        return result
    
    def __str__(self):
        return f"Square(side={self.width})"


rect = Rectangle(10, 5)
print(rect.get_area())
rect.set_height(3)
print(rect.get_perimeter())
print(rect)
print(rect.get_picture())

sq = Square(9)
print(sq.get_area())
sq.set_side(4)
print(sq.get_diagonal())
print(sq)
print(sq.get_picture())

rect.set_height(8)
rect.set_width(16)
print(rect.get_amount_inside(sq))
print(Rectangle(4,8).get_amount_inside(Rectangle(3, 6)))