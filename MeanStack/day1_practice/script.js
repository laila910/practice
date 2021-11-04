getData = () => {
    return JSON.parse(localStorage.getItem(`TotalData`)) || [] //that is union in javascript
}
setData = (data) => {
    localStorage.setItem('TotalData', JSON.stringify(data))

}
form = document.querySelector('#form')
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault()
        let TotalData = getData()
        let data = {
            name: this.elements.name.value,
            age: this.elements.age.value,
            salary: this.elements.salary.value
        }

        TotalData.push(data)
        setData(TotalData)
        this.reset()
        window.location.href = "allData.html"
    })
}
tbody = document.querySelector('#tbody')
let TotalData = getData()
if (tbody) {

    TotalData.forEach((data, index) => {
        tr = document.createElement('tr')
        tbody.appendChild(tr)
        td = document.createElement('td')
        td.innerText = index
        tr.appendChild(td)
        td2 = document.createElement('td')
        td2.innerText = data.name
        tr.appendChild(td2)
        td3 = document.createElement('td')
        td3.innerText = data.age
        tr.appendChild(td3)
        td4 = document.createElement('td')
        td4.innerText = data.salary
        tr.appendChild(td4)
        td5 = document.createElement('td')
        deleteButton = document.createElement('button')
        deleteButton.innerText = "delete"
        deleteButton.classList = "btn btn-warning"

        td5.appendChild(deleteButton)
        tr.appendChild(td5)
        deleteButton.addEventListener('click', function(e) {

            TotalData.splice(index, 1)
            setData(TotalData)
            window.location.href = "allData.html"
        })


    })
}