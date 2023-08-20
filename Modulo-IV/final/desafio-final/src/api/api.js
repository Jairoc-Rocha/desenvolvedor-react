import axiosModule from 'axios'
import {
  helpersFormatImageName,
  helpersFormatTeamName,
} from '../helpers/helpers'

const axios = axiosModule.create({ baseURL: 'http://localhost:3001' })

function getFinalDataFromTeam(teamData) {
  const {
    total_derrotas,
    total_empates,
    total_vitorias,
    total_gols_marcados,
    total_gols_sofridos,
    total_pontos,
  } = teamData

  const balance = total_gols_marcados - total_gols_sofridos

  return {
    balance,
    defeats: total_derrotas,
    draws: total_empates,
    points: total_pontos,
    scoredGoals: total_gols_marcados,
    takenGoals: total_gols_sofridos,
    victories: total_vitorias,
  }
}

async function apiGetChampionshipData(year = 2003) {
  const { data } = await axios.get(`/${year}`)
  const lastItem = data.length - 1
  const lastRound = data[lastItem]

  const champioshipData = lastRound.partidas
    .flatMap(
      ({
        mandante,
        visitante,
        pontuacao_geral_mandante,
        pontuacao_geral_visitante,
      }) => {
        const hostData = {
          ...getFinalDataFromTeam(pontuacao_geral_mandante),
          team: helpersFormatTeamName(mandante),
          image: helpersFormatImageName(mandante),
        }

        const visitorData = {
          ...getFinalDataFromTeam(pontuacao_geral_visitante),
          team: helpersFormatTeamName(visitante),
          image: helpersFormatImageName(visitante),
        }

        return [hostData, visitorData]
      }
    )
    .sort((a, b) => b.points - a.points)

  return champioshipData
}

export { apiGetChampionshipData }
