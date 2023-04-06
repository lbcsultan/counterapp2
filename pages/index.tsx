import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
} from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const address = useAddress()
  const contractAddress = '0x6dD32865Ad1a847A25538Aa07e19b7316DBfB050'
  const { contract } = useContract(contractAddress)
  const [counter, setCounter] = useState('')

  async function getCounter() {
    if (!contract) return

    const counter = await contract.call('getCounter')
    setCounter(counter.toString())
  }

  useEffect(() => {
    getCounter()
  })

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <ConnectWallet />
        <h1> Homepage Counter App by Sultan </h1>
        <h2> Using Mumbai Testnet </h2>
        <h3>Contract address - {contractAddress}</h3>
        <h3>Host address - 0x3B4E78E08de9FF899EB5Ca82710C5f2cD26E0bBC</h3>
        <h3>Your address - {address}</h3>

        <h1>{counter}</h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Web3Button
              className={styles.card}
              contractAddress={contractAddress}
              action={async (contract) => contract.call('decrementCounter')}
            >
              <h1>-</h1>
            </Web3Button>
          </div>
          <div>
            <Web3Button
              contractAddress={contractAddress}
              action={() => getCounter()}
            >
              <h1>Refresh Counter</h1>
            </Web3Button>
          </div>
          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={async (contract) => contract.call('incrementCounter')}
            >
              <h1>+</h1>
            </Web3Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
