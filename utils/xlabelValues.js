const years = [2015,2016,2017]
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default Array.prototype.concat(...years.map(y => months.map(m => [m,y])))
