import { useEffect, useState } from 'react'
import { bitcoinService } from '../services/bitcoinService'
import { ChartComponent } from '../cmps/ChartComponent'

export const Stats = () => {
    const [chartData, setChartData] = useState(null)
    const [data, setData] = useState(null)

    useEffect(() => {
        getData()
        if (data) {
            const mappedData = data.map((t) => ({
                time: new Date(t.x * 1000).toLocaleDateString(
                    'en-CA'
                ),
                value: t.y,
            }))
            setChartData(mappedData)
        }
    }, [data])

    const getData = async () => {
        const data = await bitcoinService.getMarketPrice()
        setData(data)
    }

    if (chartData)
        return (
            <div className="about">
                <h1>BTC Market Data</h1>
                <ChartComponent data={chartData} />
            </div>
        )
    else return <div>Loading...</div>
}
