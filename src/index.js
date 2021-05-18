(() => {
  const daysRegex = /^\d{2}\/\d{2}\/\d{4} \S+ /
  const entriesRegex = /(\d{2}:\d{2})(?!$)/g

  const parse = report =>
    report
      .split("\n")
      .filter(line => daysRegex.test(line))
      .map(line => line.match(entriesRegex))
      .map(matches => (matches || []).join("\t"))
      .join("\n")

  const timetekReport = document.getElementById('timetekReport')
  const timesheet = document.getElementById('timesheet')

  document.addEventListener("DOMContentLoaded", () => {
    timetekReport.addEventListener("input", () =>
      timesheet.value = parse(timetekReport.value)
    )

    timesheet.addEventListener("click", () => timesheet.select())
  })
})()
