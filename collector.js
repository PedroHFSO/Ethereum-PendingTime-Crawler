const Web3 = require("web3")
const http = require('http');
require('dotenv').config();


const interval = process.env.CRAWLER_INTERVAL || 60000; // default to 60000ms if not set
const web3Provider = process.env.DATA_SOURCE_URL; //Add your provider here. For this project, I was using infura.
const storagePath = process.env.STORAGE_PATH;
const logLevel = process.env.LOG_LEVEL || 'info';

var options = {
  timeout: 30000,
  clientConfig: {
    maxReceivedFrameSize: 100000000,
    maxReceivedMessageSize: 100000000,
  },
  reconnect: {
    auto: true,
    delay: 5000,
    maxAttempts: 15,
    onTimeout: false,
  },
};

var fs = require('fs')
var logger = fs.createWriteStream(storagePath.concat('/dataset.csv'), {
  flags: 'a' // 'a' means appending (old data will be preserved)
})

const web3 = new Web3(new Web3.providers.WebsocketProvider(web3Provider), options = options)

const subscription = web3.eth.subscribe("pendingTransactions", (err, res) => {
  if (err) console.error(err);
});

const block_subscription = web3.eth.subscribe("newBlockHeaders", (err, res) => {
  if (err) console.error(err);
});

transaction_pool = {};
transactions = [];

const pendingTransactions = function(){
    subscription.on("data", (txHash) => {
      setTimeout(async () => {
        if(txHash != null){
            transaction_pool[txHash] = new Date().getTime();
        }
      });
    });
}

var checkBlock = function(block){
    let current = new Date().getTime();
    let timestamp = block['timestamp'];
    for(tx of block['transactions']){
        if(tx['hash'] in transaction_pool){
            tx_new = {
                'hash': tx['hash'],
                'block_number': block['number'],
                'from': tx['from'],
                'to': tx['to'],
                'value': tx['value'],
                'gas_price': tx['gasPrice'],
                'gas': tx['gas'],
                'joined_pool': transaction_pool[tx['hash']],
                'joined_chain' : current,
                'confirmed' : '-1' //we don't know if the transaction was confirmed yet
            }
            delete tx['hash'];
            logger.write('\n'+tx_new['hash']+','
                +tx_new['block_number']+','
                +tx_new['from']+','
                +tx_new['to']+','
                +tx_new['value']+','
                +tx_new['gas_price']+','
                +tx_new['gas']+','
                +tx_new['joined_pool']+','
                +tx_new['joined_chain']+','
                +tx_new['confirmed']);
            //transactions.push(tx_new);
        }
    }
}

const newBlocks = function(){
    block_subscription.on("data", (block) =>{
        setTimeout(async() => {
            let block_number = block["number"];
            console.log(block_number);
            try{
                let full_block = await web3.eth.getBlock(block_number, true);
                await checkBlock(full_block);
            }catch(err){
                console.log(err);
            }
        });
    });
}

pendingTransactions();
newBlocks();

if(timeout){
    setTimeout(function() {
        logger.end();
        process.exit();
      }
    , interval);
}