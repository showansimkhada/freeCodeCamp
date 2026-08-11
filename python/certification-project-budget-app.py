from itertools import zip_longest

class Category:
    def __init__(self, name):
        self.name = name
        self.ledger = []
    
    def deposit(self, amount, description = ''):
        self.ledger.append({'amount': amount, 'description': description})
        return self.get_balance

    def withdraw(self, amount, description = ''):
        if amount <= self.get_balance():
            self.ledger.append({'amount': -amount, 'description': description})
            return True
        return False

    def get_balance(self):
        sum = 0
        for ledger in self.ledger:
            sum += ledger['amount']
        return sum

    def transfer(self, amount, Category):
        if self.check_funds(amount):
            self.withdraw(amount, f'Transfer to {Category.name}')
            Category.ledger.append({'amount': amount, 'description': f'Transfer from {self.name}'})
            return True
        return False

    def check_funds(self, amount):
        if amount > self.get_balance():
            return False
        return True

    def __str__(self):
        n = int((30 - len(self.name))/2)
        result = "*" * n + self.name + "*" * n + "\n"
        for ledger in self.ledger:
            result += f"{ledger['description'][:23]:<23}" + f"{ledger['amount']:>7.2f}" + '\n'
        result.strip()
        result += f"Total: {self.get_balance()}"
        return result

def create_spend_chart(categories):
    result = "Percentage spent by category\n"
    total_spent = abs(sum(d['amount'] for cat in categories for d in cat.ledger if d['amount'] < 0))

    def get_percentage(categories) -> str:
        x = ''
        for cat in categories:
            spent = abs(sum(d['amount'] for d in cat.ledger if d['amount'] < 0))
            percentage = (spent/total_spent * 100)//10 * 10
            if percentage >= y_axis:
                x += "o  "
            else:
                x += "   "
        return x
    for y_axis in range(100, -1, -10):
        axis_label = f"{y_axis:>3}| "
        result += axis_label + get_percentage(categories) + "\n"
    result += "    " +"---"*len(categories) + '-\n     '
    name_list = [cat.name for cat in categories]
    char_string = ''
    for char in zip_longest(*name_list, fillvalue=" "):
        char_string += "" + '  '.join(char) + '  \n     '

    #Remove the last 6 characters from char_string to avoid extra spaces and newlines
    result += char_string[:len(char_string)-6]
    return result

food = Category("Food")
food.deposit(1000, "deposit")
food.withdraw(500.00, "groceries")

clothing = Category("Clothing")
clothing.deposit(1000, "deposit")
clothing.withdraw(100.00, "buying new clothes")

auto = Category("Auto")
auto.deposit(1000, "deposit")
auto.withdraw(200.00, "fuel")

food.transfer(200, clothing)


categories = [food, clothing, auto]
chart_str = create_spend_chart(categories)

print(clothing)
print(chart_str)