# Ethereum-PendingTime-Crawler
 Tool to capture real time Ethereum transactions, calculating the time it takes for each to be accepted.

## Features
* Continuously ongoing transactions from Ethereum, using the web3.eth library.
* Stores crawled data in a .csv file.
* Configurable crawling intervals and targets.

## Prerequisites

Ensure you have the following installed before getting started:

* Node.js (v14.x or later)
* npm (v6.x or later)
* Git

## Installation

1. Clone the repository:

```
git clone https://github.com/PedroHFSO/Ethereum-PendingTime-Crawler.git
```

2. Install the dependencies

```
npm install
```

## Configuration

1. Create a .env file in the root directory of the project.

2. Define the necessary environment variables in the .env file. Below is an example configuration:

```
CRAWLER_INTERVAL=60000
DATA_SOURCE_URL=wss://mainnet.infura.io/ws/v3/<ADDYOURKEYHERE>
STORAGE_PATH=./data
```

* CRAWLER_INTERVAL: Interval in milliseconds for the crawler to wait between each crawling cycle.
* DATA_SOURCE_URL: The URL of the data source to be crawled.
* STORAGE_PATH: The path where crawled data will be stored.

## Running the Crawler
To start the data crawler, run the following command:

``` 
npm start
```
The crawler will start running continuously, fetching data at the interval specified in the .env file.

Stopping the Crawler
To stop the crawler, simply terminate the process:
* If running in the terminal, press Ctrl+C.

