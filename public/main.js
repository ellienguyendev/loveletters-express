var heart = document.getElementsByClassName("fa-heart");
var star = document.getElementsByClassName("fa-star");
var trash = document.getElementsByClassName("fa-trash");


Array.from(heart).forEach(function(element) {
      element.addEventListener('click', function(){
        const msg = this.parentNode.parentNode.childNodes[1].innerText
        const days = parseFloat(this.parentNode.parentNode.childNodes[3].innerText)

        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'msg': msg,
            'days':days,
            'color': "000"
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(star).forEach(function(element) {
      element.addEventListener('click', function(){
        const msg = this.parentNode.parentNode.childNodes[1].innerText
        const days = parseFloat(this.parentNode.parentNode.childNodes[3].innerText)

        fetch('color', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'msg': msg,
            'days':days,
            'color': "a9d06b"
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});


Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const msg = this.parentNode.parentNode.childNodes[1].innerText

        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
