const containerElement = document.querySelector('.container');


window.navigator.geolocation.getCurrentPosition( async mintaqa => {
    // console.log(mintaqa);
    const latutite = mintaqa.coords.latitude;
    const longitude = mintaqa.coords.longitude;
    // console.log(latutite, longitude);
    
    
    const response = await fetch('https://api.aladhan.com/v1/calendar?latitude=41.28594207763672&longitude=69.20355987548825&method=3school=1&month=2&year=2022');
    const nomoz = await response.json()
 

    // console.log(nomoz.data);

    for(let item of nomoz.data){
      const h1Element = document.createElement('h1');
      h1Element.classList.add('text-center')
      h1Element.textContent = `${item.date.readable} (${item.meta.timezone})`;
      containerElement.appendChild(h1Element);

   
      
      
      const tableElement = document.createElement('table')
      tableElement.classList.add('table', 'table-striped', 'table-dark', 'table-hover');
      const theadElement = document.createElement('thead');
      const trElement = document.createElement('tr');
      const thNomozNameElement = document.createElement('th');
      thNomozNameElement.scope = 'col';
      thNomozNameElement.classList.add('text-center');
      thNomozNameElement.textContent = 'Nomoz';
      const thNomozTimeElement = document.createElement('th');
      thNomozTimeElement.scope = 'col';
      thNomozTimeElement.classList.add('text-center');
      thNomozTimeElement.textContent = 'Vaqti';

      trElement.appendChild(thNomozNameElement);
      trElement.appendChild(thNomozTimeElement);
      
      theadElement.appendChild(trElement);
      tableElement.appendChild(theadElement);
      containerElement.appendChild(tableElement);

    //   console.log(item)
      
    let nomozName  = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
    let nomozUzbName = ["Bomdod", "Quyosh", "Peshin", "Asr", "Shom", "Xufton"] 
    let i = 0; 
    for(let key in item.timings){
        //   console.log(key, item.timings[key]);
          if(nomozName.indexOf(key) !== -1){
            const tbodyElement = document.createElement('tbody');
            const trElement = document.createElement('tr');
            const tdNameElement = document.createElement('td');
            tdNameElement.classList.add('text-center');
            tdNameElement.textContent = nomozUzbName[i++];
            
            const tdTimeElement = document.createElement('td');
            tdTimeElement.classList.add('text-center');
            tdTimeElement.textContent = item.timings[key];
            trElement.appendChild(tdNameElement);
            trElement.appendChild(tdTimeElement);
            tbodyElement.appendChild(trElement);
            tableElement.appendChild(tbodyElement);
          }
        
      }
    }
});
