import { useState, useEffect } from 'react'
// import { Link, Outlet } from "react-router-dom";
import { userService } from '../services/userService'
import { bitcoinService } from '../services/bitcoinService'

export function HomePage() {

    const [user, setUser] = useState(null)
    const [bitcoinRate, setBitcoinRate] = useState(null)

    useEffect(() => {
        loadUser()
    }, [])

    useEffect(() => {
        if (user) loadBitcoinRate()
    }, [user])

    async function loadUser() {
        const currUser = await userService.getUser()
        setUser(currUser)
    }

    async function loadBitcoinRate() {
        const userBitcoinRate = await bitcoinService.getRate(user.coins)
        setBitcoinRate(userBitcoinRate)
    }

    if (!user) return <div>Loading...</div>

    return (
        <section className="home p-4 flex flex-col gap-1">
            <div className="flex items-center gap-2">
                <img src='https://res.cloudinary.com/dtaiyvzq5/image/upload/v1692114168/n08tvl9liglyf7f3u3hu.png' alt="" />
                <p>
                    Welcome <span className="fw-bold">{user.name}</span>
                </p>
            </div>
            <div className="flex items-center gap-2">
                <img src='https://res.cloudinary.com/dtaiyvzq5/image/upload/v1692114209/w6onpyopdvjsyqwvqa32.png' alt="" />
                <p>Coins: {user.coins}</p>
            </div>
            <div className="flex items-center gap-2">
                <img src='https://res.cloudinary.com/dtaiyvzq5/image/upload/v1692114221/dfyxot4ofoop9ekwvnzz.png' alt="" />
                <p>BTC: {bitcoinRate}</p>
            </div>
        </section>
    )
}
