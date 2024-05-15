let city='';
let newArr=[];
//let newPoint=''

oldArr.forEach(point=>{
    if(point.city!=city) {
        newArr.push({
            city: point.city,
            points: []
        })
        city=point.city
    }
    //добавляем в новый массив
    newArr.forEach(newPoint=>{
        if(newPoint.city==point.city) {
            newPoint.points.push( {
                    company: point.company,
                    adress:point.adress,
                    phone: point.phone,
                    coords: [
                      point.coords.split(',')[0],
                      point.coords.split(', ')[1]
                    ]
                }
            )
        }
    })
    

})
console.log(newArr);