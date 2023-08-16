import { createChart } from 'lightweight-charts'
import { useEffect, useRef } from 'react'


export const ChartComponent = (props) => {
    const chartContainerRef = useRef()

    useEffect(() => {
        const handleResize = () => {
            chart.applyOptions({
                width: chartContainerRef.current.clientWidth,
            });
        };

        const { data } = props

        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 300,
        })
        chart.timeScale().fitContent()

        const newSeries = chart.addAreaSeries()
        newSeries.setData(data);

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)

            chart.remove()
        }
    }, [chartContainerRef.current?.clientWidth, props])

    return <div ref={chartContainerRef} />
};
