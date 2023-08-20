import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { getApiData } from '../api/api'
import { helperGetImageNameFrom } from '../helpers/helpers'

export default function ChampionShip() {
  const { pathname } = useLocation()
  const year = pathname.substring(1)

  const [ranking, setRanking] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getDataFromBackend() {
      setLoading(true)
      const data = await getApiData(year)
      setRanking(data)
      setLoading(false)
    }

    getDataFromBackend()
  }, [year])

  if (loading) {
    return (
      <div className="text-center mt-4">
        <ClipLoader />
      </div>
    )
  }

  return (
    <div className="mt-4">
      <h2 className="text-center font-semibold text-xl">
        Campeonato Brasileiro de {year}
      </h2>

      <h3 className="text-center font-semibold text-lg">Classificação</h3>

      <table className="mt-4">
        <thead>
          <tr>
            <th className="w-10"></th>
            <th className="w-10"></th>
            <th className="w-48"></th>
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
          {ranking.map((item, index) => {
            const {
              balance,
              defeats,
              draws,
              points,
              scoredGoals,
              takenGoals,
              victories,
              name,
            } = item

            const position = (index + 1).toString().padStart(2, '0')
            const background = index % 2 === 0 ? '' : 'bg-gray-100'
            const imageSource = `/img/${helperGetImageNameFrom(name)}`

            return (
              <tr key={name} className={`text-center ${background}`}>
                <td>{position}</td>

                <td>
                  <img src={imageSource} alt={name} />
                </td>

                <td className="text-left">{name}</td>
                <td>{points}</td>
                <td>{victories}</td>
                <td>{draws}</td>
                <td>{defeats}</td>
                <td>{scoredGoals}</td>
                <td>{takenGoals}</td>
                <td>{balance}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
