export default function calculateAverageRating(data) {
  let totalRating = 0
  let filmCount = 0

  for (const key in data) {
    const film = data[key]
    const imdbRating = parseFloat(film.imdb)

    if (!isNaN(imdbRating)) {
      totalRating += imdbRating
      filmCount++
    }
  }

  const averageRating = totalRating / filmCount

  if (averageRating) {
    return averageRating.toFixed(1)
  } else {
    return 0
  }
}
