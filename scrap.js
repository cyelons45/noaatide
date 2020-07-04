// function summerizeResponse(data) {
//     let tidalItem = []
//     for (let i = 0; i < data.length; i++) {
//         let [cDate, time] = data[i].t.split(' ')
//         let [yy, mm, dd] = cDate.split('-')
//         let dt = new Date(Number(yy), Number(mm) - 1, Number(dd))
//         let d = dt.toDateString()
//         let [dayName, monthName, day, year] = d.split(' ')
//         let type = data[i].type;
//         let ht = data[i].v
//         let obj = {
//             date: `${dayName}-${monthName}-${day}-${year}`,
//             Time: time,
//             type: type,
//             TidalHeight: ht,
//             Sdate: `${monthName}-${day}-${year}`,
//             dayName: `${dayName}`,
//             monthName: `${monthName}`
//         }
//         tidalItem.push(obj)

//     }
//     sampleUniqueValue(tidalItem)
// }


// function sampleUniqueValue(tidalItem) {
//     const arr = []
//     tidalItem.forEach(function(el) {
//         arr.push(el.date)
//     })
//     const distinctYears = [...new Set(arr)]
//     let object = []
//     for (let j = 0; j < distinctYears.length; j++) {
//         var obj = []
//         for (let i = 0; i < tidalItem.length; i++) {
//             if ((distinctYears[j]) === tidalItem[i].date) {
//                 obj.push(tidalItem[i])
//             }
//         }
//         object.push(obj)

//     }
//     // console.log(object)
//     groupPerDay(object)

// }


// function groupPerDay(object) {

//     function sortDay(el) {
//         // console.log(el)
//         var itemList = {
//             morningHigh: {},
//             morningLow: {},
//             eveningHigh: {},
//             eveningLow: {}
//         }

//         el.forEach(function(cur) {

//             if (cur.Time > '00:00' && cur.Time < '12:00' && cur.type === 'H') {
//                 itemList.morningHigh = {
//                         TidalHeight: cur.TidalHeight,
//                         Time: `${cur.Time} AM`,
//                         date: cur.date,
//                         type: cur.type,
//                         Sdate: cur.Sdate,
//                         dayName: cur.dayName,
//                         monthName: cur.monthName

//                     }
//                     // console.log(cur.Time + 'AM')
//             } else if (cur.Time > '00:00' && cur.Time < '12:00' && cur.type === 'L') {
//                 itemList.morningLow = {
//                         TidalHeight: cur.TidalHeight,
//                         Time: `${cur.Time} AM`,
//                         date: cur.date,
//                         type: cur.type,
//                         Sdate: cur.Sdate,
//                         dayName: cur.dayName,
//                         monthName: cur.monthName
//                     }
//                     // console.log(cur.Time + 'PM')
//             } else if (cur.Time > '12:00' && cur.Time < '24:00' && cur.type === 'H') {
//                 itemList.eveningHigh = {
//                     TidalHeight: cur.TidalHeight,
//                     Time: `${cur.Time} PM`,
//                     date: cur.date,
//                     type: cur.type,
//                     Sdate: cur.Sdate,
//                     dayName: cur.dayName,
//                     monthName: cur.monthName
//                 }

//             } else if (cur.Time > '12:00' && cur.Time < '24:00' && cur.type === 'L') {
//                 itemList.eveningLow = {
//                     TidalHeight: cur.TidalHeight,
//                     Time: `${cur.Time} PM`,
//                     date: cur.date,
//                     type: cur.type,
//                     Sdate: cur.Sdate,
//                     dayName: cur.dayName,
//                     monthName: cur.monthName
//                 }

//             }

//         })


//         printResults(itemList)

//     }


//     object.forEach((el) => sortDay(el))


// }



// function printResults(itemList) {
//     // var printResults = function(itemList) {
//     var csvData = []

//     if (itemList.eveningHigh.date === undefined) {
//         itemList.eveningHigh = {
//             TidalHeight: 'NA',
//             Time: 'NA',
//             date: 'NA',
//             type: 'NA',
//             Sdate: 'NA',
//             dayName: 'NA',
//             monthName: 'NA',
//         }
//     } else if (itemList.eveningLow.date === undefined) {
//         itemList.eveningLow = {
//             TidalHeight: 'NA',
//             Time: 'NA',
//             date: 'NA',
//             type: 'NA',
//             Sdate: 'NA',
//             dayName: 'NA',
//             monthName: 'NA',
//         }

//     } else if (itemList.morningHigh.date === undefined) {
//         itemList.morningHigh = {
//             TidalHeight: 'NA',
//             Time: 'NA',
//             date: 'NA',
//             type: 'NA',
//             Sdate: 'NA',
//             dayName: 'NA',
//             monthName: 'NA',
//         }
//     } else if (itemList.morningLow.date === undefined) {
//         itemList.morningLow = {
//             TidalHeight: 'NA',
//             Time: 'NA',
//             date: 'NA',
//             type: 'NA',
//             Sdate: 'NA',
//             dayName: 'NA',
//             monthName: 'NA',
//         }
//     }

//     let object = {
//         Date: `${parseInt(itemList.eveningHigh.Sdate.split('-')[1], 10)? itemList.eveningHigh.Sdate :itemList.morningHigh.Sdate}`,
//         Day: `${ parseInt(itemList.eveningHigh.Sdate.split('-')[1], 10)? itemList.eveningHigh.dayName :itemList.morningHigh.dayName}`,
//         Morning_High_Time: ` ${itemList.morningHigh.Time}`,
//         Morning_High_Height: `${itemList.morningHigh.TidalHeight}`,
//         Evening_High_Time: `${itemList.eveningHigh.Time}`,
//         Evening_High_Height: `${itemList.eveningHigh.TidalHeight}`,
//         Morning_Low_Time: `${itemList.morningLow.Time}`,
//         Morning_Low_Height: `${itemList.morningLow.TidalHeight}`,
//         Evening_Low_Time: `${itemList.morningLow.Time}`,
//         Evening_Low_Height: `${itemList.eveningLow.TidalHeight}`

//     }
//     state.data.push(object)

// }

// console.log(state.data)
// const Res = new Promise(function(resolve, reject) {
//     return resolve(state.data)

// })
// Res.then(function(data) {
//     // data.forEach(function(el) {
//     //     console.log(el)
//     // })
//     console.log(data)

// })