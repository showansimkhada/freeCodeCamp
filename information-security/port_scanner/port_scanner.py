import socket
import re
import common_ports

# *args is for unknown lenghts of arguments
def get_open_ports(*args):
  list = [*args]
  open_ports = []
  services = []
  urlAdd = list[0]
  url = ''
  host = ''
  str = ''
  
  # checking for invalid ip address
  if re.findall("\d", urlAdd):
    try:
      try:
        url = socket.gethostbyaddr(urlAdd)
        str = 'Open ports for ' + url[0].__str__() + ' (' + urlAdd + ')' + '\nPORT' + "     " + 'SERVICE'
      except socket.herror:
        str = 'Open ports for ' + urlAdd + '\nPORT' + "     " + 'SERVICE'   
    except socket.gaierror:
      return "Error: Invalid IP address"
  else:
    try:
      host = socket.gethostbyname(urlAdd)
      if (host != urlAdd):
        str = 'Open ports for ' + urlAdd + ' (' + host + ')' + '\nPORT' + "     " + 'SERVICE'
      else:
        str = 'Open ports for ' + urlAdd + '\nPORT' + "     " + 'SERVICE'
    except socket.gaierror:
      return "Error: Invalid hostname"
  
  # if third argument is True
  if (len(list) == 3 and list[2] == True):
    port = list[1]
    for p in range(port[0], port[1]+1):
      a = portScanner(urlAdd, p)
      if a:
        str += '\n'
        b = common_ports.ports_and_services.get(p)
        str += p.__str__() + ''.rjust(4 - len(p.__str__()) + 5) + b.__str__()
    return str
  else:
    port = list[1];
    for p in range(port[0], port[1]+1):
      a = portScanner(urlAdd, p)
      if a:
        open_ports.append(p)
    return open_ports

def portScanner(host, port):
  s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
  s.settimeout(5)
  if s.connect_ex((host, port)) == 0:
    s.close()
    return True
  else:
    s.close()
    return False