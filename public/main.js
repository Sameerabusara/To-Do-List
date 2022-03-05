const update = document.getElementById('update-button')
const oldQuote = document.getElementById('oldQuote')
const newQuote = document.getElementById('newQuote')

update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
          oldQuote: oldQuote.value,  
          newQuote: newQuote.value
            
        })
    })
    .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        window.location.reload(true)
      })
})

const deleteButton = document.getElementById('delete-button')
const deleteQuote = document.getElementById('deleteQuote')
const messageDiv  = document.getElementById('message')

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            quote: deleteQuote.value
        })
    })
    .then(res => {
        if (res.ok) return res.json()
      })
      .then(data => {
        window.location.reload()
      })
      .then(response => {
        if (response === 'No quote to delete') {
          messageDiv.textContent = 'No Darth Vadar quote to delete'
        } else {
          window.location.reload(true)
        }
      })
})


//https://zellwk.com/blog/crud-express-mongodb/