def apply_discount(price, discount):
    if not isinstance(price, (int, float)):
        return 'The price should be a number'
    elif not isinstance(discount, (int, float)):
        return 'The discount should be a number'
    if price <= 0:
        return 'The price should be greater than 0'
    elif discount < 0 or discount > 100:
        return 'The discount should be between 0 and 100'
    else:
        price -= discount / 100 * price
        return price

print(apply_discount(74.5, 20.0))