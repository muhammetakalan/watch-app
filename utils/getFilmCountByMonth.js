export default function getFilmCountByMonth(data) {
  let filmCount = 0

  for (const key in data) {
    const filmId = key
    const filmTimestamp = data[filmId].id
    const timestamp = parseInt(filmTimestamp)

    if (isNaN(timestamp)) {
      continue
    }

    const filmDate = new Date(timestamp)
    const filmMonth = filmDate.getMonth() + 1

    if (filmMonth === new Date().getMonth() + 1) {
      filmCount++
    }
  }

  return filmCount
}
