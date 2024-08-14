import numpy as np

def calculate(list):
    print('Performing calculations')
    if (len(list) < 9):
      raise ValueError("List must contain nine numbers.")
    
    calculations = {"mean": [], "variance": [], "standard deviation": [], "max": [], "min": [], "sum": []}
    np_list = np.array(list)
    np_list_b3 = np_list.reshape((3, 3))
    
    # mean
    for i in range(2):
        calculations["mean"].append(np.mean(np_list_b3, axis=i).tolist())

    # flattend mean
    calculations["mean"].append(np.mean(np_list_b3))

    # variance
    for i in range(2):
        calculations["variance"].append(np.var(np_list_b3, axis=i).tolist())

    # flattend varaince
    calculations["variance"].append(np.var(np_list_b3))

    # standard deviation
    for i in range(2):
        calculations["standard deviation"].append(np.std(np_list_b3, axis=i).tolist())
        
    # flattend std
    calculations["standard deviation"].append(np.std(np_list_b3))
    
    # max
    for i in range(2):
        calculations["max"].append(np.max(np_list_b3, axis=i).tolist())
        
    # flattend max
    calculations["max"].append(np.max(np_list_b3))

    # min
    for i in range(2):
        calculations["min"].append(np.min(np_list_b3, axis=i).tolist())
        
    # flattened min
    calculations["min"].append(np.min(np_list_b3))
    
    # sum
    for i in range(2):
        calculations["sum"].append(np.sum(np_list_b3, axis=i).tolist())

    # flattend sum
    calculations["sum"].append(np.sum(np_list_b3))
    
    return calculations