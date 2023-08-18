import { useState, useEffect } from 'react'
// import { Link, Outlet } from "react-router-dom";
import { userService } from '../services/userService'
import { bitcoinService } from '../services/bitcoinService'
import { useNavigate } from 'react-router-dom'

export function HomePage() {

    const [user, setUser] = useState(null)
    const [bitcoinRate, setBitcoinRate] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        loadUser()
    }, [])

    useEffect(() => {
        if (user) loadBitcoinRate()
    }, [user])

    async function loadUser() {
        const currUser = await userService.getLoggedinUser()
        if (!currUser) {
            navigate('/signup')
        }
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
            <div className='recent-moves'>
                {user.moves[0] && <h1 className='recent-title'>Your recent transfers</h1>}
                {user.moves[0] && <div className='last-moves divider'>
                    <h3>To: <span className='gray'>{user.moves[0].to}</span> </h3>
                    <h3>At: <span className='gray'>{new Date(user.moves[0].at).toLocaleString()}</span></h3>
                    <h3>Amount: <span className='gray'>{user.moves[0].amount} coins</span></h3>
                </div>}
                {user.moves[1] && <div className='last-moves divider'>
                    <h3>To: <span className='gray'>{user.moves[1].to}</span> </h3>
                    <h3>At: <span className='gray'>{new Date(user.moves[1].at).toLocaleString()}</span></h3>
                    <h3>Amount: <span className='gray'>{user.moves[1].amount} coins</span></h3>
                </div>}
                {user.moves[2] && <div className='last-moves'>
                    <h3>To: <span className='gray'>{user.moves[2].to}</span> </h3>
                    <h3>At: <span className='gray'>{new Date(user.moves[2].at).toLocaleString()}</span></h3>
                    <h3>Amount: <span className='gray'>{user.moves[2].amount} coins</span></h3>
                </div>}
                {!user.moves[0] && <h1>No transfers yet... </h1>}
            </div>
        </section>
    )
}
