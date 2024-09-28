import hashlib
import re

topPass = open("top-10000-passwords.txt", "r")
knownSalt = open("known-salts.txt", "r")
listTP = [topPass.read().split('\n')]
listKS = [knownSalt.read().split('\n')]

def crack_sha1_hash(hashP, **kwargs):
  password = "PASSWORD NOT IN DATABASE"
  if kwargs.values():
    for item in listTP[0]:
      string = item
      for p in listKS[0]:
        # add tp to last of the ks
        kstp = p + string

        # add ks to last of the tp
        tpks = string + p

        if hasPass(kstp).__eq__(hashP) or hasPass(tpks).__eq__(hashP):
          return item.__str__()
    return password
  else:
    for item in listTP[0]:
      deHash = hasPass(item)
      if deHash.__eq__(hashP):
        return item.__str__()
    return password

def hasPass(password):
  hashPass = hashlib.sha1(password.encode("UTF-8")).hexdigest()
  return hashPass