function helpersFormatTeamName(name) {
  const names = name.split(' ')

  if (!names[1]) {
    return name
  }

  const firstName = names[0]
  const secondName = names[1]

  if (secondName.length <= 2) {
    return `${firstName} ${secondName.toUpperCase()}`
  }

  return `${firstName} ${secondName[0].toUpperCase()}${secondName.substring(1)}`
}

function helpersFormatImageName(teamName) {
  return teamName
    .toLowerCase()
    .replace(' ', '_')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export { helpersFormatTeamName, helpersFormatImageName }
