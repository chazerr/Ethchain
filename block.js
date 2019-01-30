const {GENESIS_DATA} = require ('./config');
const cryptoHash = require('./crypto-hash');

class Block{
    constructor({timestamp, lastHash, hash, data}){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    static genesis() {
        return new this(GENESIS_DATA);
    }

    static mineBlock({lastBlock, data}) {
        let hash, timestamp;
        const lastHash = lastBlock.hash;
        const {diff} = lastBlock;
        let nonce = 0;

        do{
            nonce++;
            timestamp = Date.now()
            hash = cryptoHash(timestamp, lastHash, data, nonce, diff);
        }while (hash.substring(0,diff) !== '0'.repeat(diff));
        
        

        return new this({timestamp, lastHash, data, diff, nonce, hash
        });
    }
}

module.exports = Block;  