interface PersonAge {
  dob: { age: number }
}

interface Person {
  login: { uuid: string };
  name: { title: string, first: string, last: string };
  location: { city: string, country: string };
  dob: { age: number }
}

interface PeopleArray {
  oldest10: Person[]
}

let reloadCount = 0
let isPending = false
let oldest10 = null
let ageArray = [[], [], [], [], [], []]
let loading = `      
  <div class='spinner'></div>
  <div class='spinner2'></div>
  <p class='loading'>Loading...</p>
`

const fetcher = document.getElementById('fetcher')
const table = document.getElementById('table')
const spinner = document.getElementById('spinner')
const chartContainer = document.getElementById('chart-container')
const welcome = document.getElementById('welcome')
const bgChanger = document.getElementById('bg-changer')
const errorWrapper = document.getElementById('error')

if (!oldest10) {
  const h3 = document.createElement('h3')
  h3.textContent = 'Press the button to fetch some data 🖱️'
  welcome.appendChild(h3)
}

window.addEventListener("unload", function () {
  let count = sessionStorage.getItem('counter') || 0
  if (typeof count == 'string') {
    count = +JSON.parse(count)
  }
  count++
  sessionStorage.setItem('counter', JSON.stringify(count))
});

window.addEventListener('DOMContentLoaded', () => {
  let count = +sessionStorage.getItem('counter') || 0
  if (typeof count == 'string') {
    count = +JSON.parse(count)
  }
  if (count % 5 == 0) {
    bgChanger.classList.add('change-color')
  }
});

const value = sessionStorage.getItem('counter');
if (value) {
  JSON.parse(value)
  reloadCount = (+value)
}

const labels = ['20-29', '30-39', '40-49', '50-59', '60-69', '70-79'];

const chartData = {
  labels: labels,
  datasets: [{
    label: 'Population age in France',
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
    ],
    data: [0, 0, 0, 0, 0, 0]
  }]
};

const config = {
  type: 'doughnut',
  data: chartData,
  options: {}
};
  

fetcher.addEventListener('click', async () => {
  spinner.innerHTML = loading
  table.innerHTML = null
  chartContainer.innerHTML = null
  welcome.innerHTML = null
  errorWrapper.innerHTML = null
  try {
    const canvas = document.createElement('canvas')
    canvas.setAttribute('id', 'ageChart')
    chartContainer.appendChild(canvas)
    const ageChart = document.getElementById('ageChart')
    const data = await fetch('https://randomuser.me/api/?nat=fr&gender=male&results=1000')
    const { results } = await data.json()
    const sort = results.sort((a: PersonAge, b: PersonAge) => { return (b.dob.age) - (a.dob.age) })
    oldest10 = (sort.slice(0, 9));


      results.map((person: PersonAge) => {
        if (person.dob.age >= 20 && person.dob.age <= 29) {
          ageArray[0].push(person.dob.age)
        }
        if (person.dob.age >= 30 && person.dob.age <= 39) {
          ageArray[1].push(person.dob.age)
        }
        if (person.dob.age >= 40 && person.dob.age <= 49) {
          ageArray[2].push(person.dob.age)
        }
        if (person.dob.age >= 50 && person.dob.age <= 59) {
          ageArray[3].push(person.dob.age)
        }
        if (person.dob.age >= 60 && person.dob.age <= 69) {
          ageArray[4].push(person.dob.age)
        }
        if (person.dob.age >= 70 && person.dob.age <= 79) {
          ageArray[5].push(person.dob.age)
        }
      })
    
    chartData.datasets[0].data = [ageArray[0]?.length, ageArray[1]?.length, ageArray[2]?.length, ageArray[3]?.length, ageArray[4]?.length, ageArray[5]?.length]
    // @ts-ignore: Because of CDN installation type
      const myChart = new Chart(
        ageChart,
        config
      );
      table.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            ${oldest10.map((person: Person) => {
              return (
                `<tr key=${person.login.uuid}>
                  <td>${person.name.title} ${person.name.first} ${person.name.last}</td>
                  <td>${person.location.city} ${person.location.country}</td>
                  <td>${person.dob.age}</td>
                </tr>`
              )
            })}
          </tbody>
        </table>
      `
      spinner.innerHTML = null

  } catch (err:unknown) {
    if (err instanceof Error) {
      spinner.innerHTML = null
      errorWrapper.innerHTML = '<h3>Something went wrong. Please retry.</h3>'
      
    }
  }
})