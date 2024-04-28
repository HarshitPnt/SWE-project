# get sha256 hash of "123" + "this is a salt for sha256"

import hashlib

hash_object = hashlib.sha256(b'123' + b'this is a salt for sha256')
hex_dig = hash_object.hexdigest()
print(hex_dig)