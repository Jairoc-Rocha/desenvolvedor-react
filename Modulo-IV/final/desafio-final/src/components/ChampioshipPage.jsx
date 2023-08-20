import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { apiGetChampionshipData } from '../api/api'

export default function ChampioshipPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [championshipData, setChampionshipData] = useState([])
  const { pathname } = useLocation()
  const year = Number(pathname.substring(1))

  useEffect(() => {
    async function getChampionShipData() {
      setIsLoading(true)
      const backendData = await apiGetChampionshipData(year)
      setChampionshipData(backendData)
      setIsLoading(false)
    }

    getChampionShipData()
  }, [year])

  if (isLoading) {
    return (
      <div className="text-center mt-4">
        <ClipLoader />
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-center font-semibold text-xl my-4">
        Campeonato Brasileiro de {year}
      </h2>

      <table>
        <thead>
          <tr>
            <th className="w-10">&nbsp;</th>
            <th className="w-10">&nbsp;</th>
            <th className="w-40">&nbsp;</th>
            <th className="w-10">P</th>
            <th className="w-10">V</th>
            <th className="w-10">E</th>
            <th className="w-10">D</th>
            <th className="w-10">GP</th>
            <th className="w-10">GC</th>
            <th className="w-10">SG</th>
          </tr>
        </thead>

        <tbody>
          {championshipData.map((item, index) => {
            const position = (index + 1).toString().padStart(2, '0')

            return (
              <tr key={item.team} className="text-center">
                <td>{position}</td>
                <td>
                  <img
                    width={20}
                    src={`/img/${item.image}.png`}
                    alt={item.team}
                  />
                </td>
                <td className="text-left">{item.team}</td>
                <td>{item.points}</td>
                <td>{item.victories}</td>
                <td>{item.draws}</td>
                <td>{item.defeats}</td>
                <td>{item.scoredGoals}</td>
                <td>{item.takenGoals}</td>
                <td>{item.balance}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
