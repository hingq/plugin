import hashlib
import json
from time import time

class Blockchain:
    def __init__(self):
        self.chain = []
        self.current_transactions=[] #当前交易

    def new_block(self,proof,previous_haah=None):
        """
         创建一个新的block
        """
        block = {
            "index": len(self.chain) + 1,
            "timestamp":time(),#时间戳
            "transactions":self.current_transactions,
            "proof":proof,
            "previous_has":previous_haah or self.hash(self.chain[-1]),
        }

        self.current_transactions=[]
        #重置交易

        self.chain.append(block)
        return block
    def  new_transaction(self,s,r,recipient,amount):
        self.current_transactions.append(
            {
                "sender": s,
                "recipient": recipient,
                "amount": amount,
            })
        return self.chain[-1]+1
    def hash(block):
        block_strng=json.dumps(block,sort_keys=True).encode()
        return hashlib.sha256(block_strng).hexdigest() #十六进制



"""
import hashlib

def mine_block(previous_hash, transactions, difficulty):
    nonce = 0
    while True:
        block = str(previous_hash) + str(transactions) + str(nonce)
        hash_value = hashlib.sha256(block.encode()).hexdigest()
        if hash_value.startswith('0' * difficulty):
            print("Block mined:", hash_value)
            return hash_value
        nonce += 1


"""