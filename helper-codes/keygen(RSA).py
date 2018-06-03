from Crypto.PublicKey import RSA
from Crypto import Random
from Crypto.Signature import PKCS1_v1_5
from Crypto.Hash import SHA256
import getpass
import hashlib
# Generating New KeyPair
random_generator = Random.new().read
key = RSA.generate(1024, random_generator)
digest = SHA256.new()

# Hasing the Password
digest.update(getpass.getpass("Password(We are not storing them):").encode('utf-8'))

# Signing The password
signer = PKCS1_v1_5.new(key)
sig = signer.sign(digest)

print("Message:0x{}\nE component: {} \nN component: {}\nSignature:0x{}".format(
    digest.hexdigest(), key.e, key.n, hashlib.sha256(sig).hexdigest()))

# Verification
# verifier = PKCS1_v1_5.new(key.publickey())
# verified = verifier.verify(digest, sig)
# print(verified)
