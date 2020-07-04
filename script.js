document.querySelector('#form').addEventListener('submit', function(e) {
    e.preventDefault();


    let [m1, d1, y1] = document.querySelector('.input_1').value.split('/');
    let [m2, d2, y2] = document.querySelector('.input_2').value.split('/');

    var start_date = `${y1}${m1}${d1}`
    var end_date = `${y2}${m2}${d2}`
    if ((Number(start_date)) > (Number(end_date))) {
        alert('End date should be greater than start date. Please check')
        return

    }

    document.querySelector('.download__data').innerHTML = ''

    var apidata = fetch(`https://tidesandcurrents.noaa.gov/api/datagetter?begin_date=${start_date}&end_date=${end_date}&station=8665530&product=predictions&datum=mllw&units=english&time_zone=lst_ldt&interval=hilo&application=dhec_ocrm&format=json`)

    apidata.then(function(response) {
        response.json().then(function(data) {
            var TidalData = new QuerySearch(data.predictions)
            TidalData.summerizeResponse()
            TidalData.sampleUniqueValue()
            TidalData.groupPerDay()
            TidalData.objectToCsv()
        }).catch(function(err) {
            alert(err)
        })

    })

})



var state = {
    data: []
}


class QuerySearch {
    constructor(data) {
        this.data = data
        this.item = []


    }
    summerizeResponse() {
        let tidalItem = []
        for (let i = 0; i < this.data.length; i++) {
            let [cDate, time] = this.data[i].t.split(' ')
            let [yy, mm, dd] = cDate.split('-')
            let dt = new Date(Number(yy), Number(mm) - 1, Number(dd))
            let d = dt.toDateString()
            let [dayName, monthName, day, year] = d.split(' ')
            let type = this.data[i].type;
            let ht = this.data[i].v
            let obj = {
                date: `${dayName}/${monthName}/${day}/${year}`,
                Time: time,
                type: type,
                TidalHeight: ht,
                Sdate: `${mm}/${day}/${year}`,
                dayName: `${dayName}`,
                monthName: `${monthName}`
            }
            tidalItem.push(obj)

        }
        this.splittedData = tidalItem


    }
    sampleUniqueValue() {
        const arr = []
        this.splittedData.forEach(function(el) {
            arr.push(el.date)
        })
        const distinctYears = [...new Set(arr)]
        let object = []
        for (let j = 0; j < distinctYears.length; j++) {
            var obj = []
            for (let i = 0; i < this.splittedData.length; i++) {
                if ((distinctYears[j]) === this.splittedData[i].date) {
                    obj.push(this.splittedData[i])
                }
            }
            object.push(obj)

        }

        this.uniquedate = arr;
        this.object = object;



    }
    groupPerDay() {

        var sortedTidalData = []
        var tidalValues = []

        function sortDay(el) {
            var itemList = {
                morningHigh: {},
                morningLow: {},
                eveningHigh: {},
                eveningLow: {}
            }
            el.forEach(function(cur) {
                // let get_Hour = parseInt(cur.Time.split(':')[0], 10)
                let Hour = parseInt(cur.Time.split(':')[0], 10)
                const mins = parseInt(cur.Time.split(':')[1], 10)
                const rawmins = cur.Time.split(':')[1]
                const newTime = `${Hour-12}:${rawmins}`
                const normalTime = `${Hour}:${rawmins}`
                const amHour = Hour == '00' ? 12 : Hour
                const amTime = `${amHour}:${rawmins}`

                const timE = Hour + (mins / 60)
                if (timE >= 0 && timE <= 12 && cur.type === 'H') {
                    itemList.morningHigh = {
                        TidalHeight: cur.TidalHeight,
                        Time: `${amTime} AM`,
                        date: cur.date,
                        type: cur.type,
                        Sdate: cur.Sdate,
                        dayName: cur.dayName,
                        monthName: cur.monthName

                    }

                } else if (timE >= 0 && timE <= 12 && cur.type === 'L') {
                    itemList.morningLow = {
                        TidalHeight: cur.TidalHeight,
                        Time: `${amTime} AM`,
                        date: cur.date,
                        type: cur.type,
                        Sdate: cur.Sdate,
                        dayName: cur.dayName,
                        monthName: cur.monthName
                    }

                } else if (timE >= 12 && timE <= 24 && cur.type === 'H') {
                    itemList.eveningHigh = {
                        TidalHeight: cur.TidalHeight,
                        Time: `${timE>12?newTime:normalTime} PM`,
                        date: cur.date,
                        type: cur.type,
                        Sdate: cur.Sdate,
                        dayName: cur.dayName,
                        monthName: cur.monthName
                    }

                } else if (timE >= 12 && timE <= 24 && cur.type === 'L') {
                    itemList.eveningLow = {
                        TidalHeight: cur.TidalHeight,
                        Time: `${timE>12?newTime:normalTime} PM`,
                        date: cur.date,
                        type: cur.type,
                        Sdate: cur.Sdate,
                        dayName: cur.dayName,
                        monthName: cur.monthName
                    }

                }

            })
            sortedTidalData.push(itemList)
            printResults(itemList)

        }

        this.item.push(sortedTidalData)

        this.object.forEach((el) => sortDay(el))

        function printResults(itemList) {
            if (itemList.eveningHigh.date === undefined) {
                itemList.eveningHigh = {
                    TidalHeight: ' ',
                    Time: ' ',
                    date: ' ',
                    type: ' ',
                    Sdate: ' ',
                    dayName: ' ',
                    monthName: ' ',
                }
            } else if (itemList.eveningLow.date === undefined) {
                itemList.eveningLow = {
                    TidalHeight: ' ',
                    Time: ' ',
                    date: ' ',
                    type: ' ',
                    Sdate: ' ',
                    dayName: ' ',
                    monthName: ' ',
                }

            } else if (itemList.morningHigh.date === undefined) {
                itemList.morningHigh = {
                    TidalHeight: ' ',
                    Time: ' ',
                    date: ' ',
                    type: ' ',
                    Sdate: ' ',
                    dayName: ' ',
                    monthName: ' ',
                }
            } else if (itemList.morningLow.date === undefined) {
                itemList.morningLow = {
                    TidalHeight: ' ',
                    Time: ' ',
                    date: ' ',
                    type: ' ',
                    Sdate: ' ',
                    dayName: ' ',
                    monthName: ' ',
                }
            }

            let object = {
                Date: `${parseInt(itemList.eveningHigh.Sdate.split('/')[1], 10)? itemList.eveningHigh.Sdate :itemList.morningHigh.Sdate}`,
                Day: `${ parseInt(itemList.eveningHigh.Sdate.split('/')[1], 10)? itemList.eveningHigh.dayName :itemList.morningHigh.dayName}`,
                Morning_High_Time: ` ${itemList.morningHigh.Time}`,
                Morning_High_Height: `${itemList.morningHigh.TidalHeight}`,
                Evening_High_Time: `${itemList.eveningHigh.Time}`,
                Evening_High_Height: `${itemList.eveningHigh.TidalHeight}`,
                Morning_Low_Time: `${itemList.morningLow.Time}`,
                Morning_Low_Height: `${itemList.morningLow.TidalHeight}`,
                Evening_Low_Time: `${itemList.eveningLow.Time}`,
                Evening_Low_Height: `${itemList.eveningLow.TidalHeight}`

            }
            tidalValues.push(object)

        }
        this.Allsorted = tidalValues;
    }
    objectToCsv() {
        var data = this.Allsorted;
        const download = function(data) {
            const blob = new Blob([data], { type: 'text/csv' })
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a');
            a.setAttribute('href', url);
            let d = new Date();

            a.setAttribute('download', `Predicted_Tide-${d.getMilliseconds()}.csv`);

            a.setAttribute('class', 'data');
            a.textContent = `Click to download "Predicted_Tide-${d.getMilliseconds()}.csv !"`
            document.querySelector('.download__data').appendChild(a)
            document.querySelector('.data').addEventListener('click', function() {
                document.querySelector('.download__data').removeChild(a);

            })

        }





        const objectTocsv = function() {
            const csvRows = [];
            const headers = Object.keys(data[0]);
            csvRows.push(headers.join(','))

            for (const row of data) {
                const values = headers.map(header => {
                    const val = row[header];
                    const escaped = ('' + row[header]).replace(/"/g, '\\"')
                    return `"${escaped}"`;
                })
                csvRows.push(values.join(','))
            }
            return csvRows.join('\n')

        }

        const getReport = function() {
            const csvData = objectTocsv()
            download(csvData)
        }
        getReport()

    }
}