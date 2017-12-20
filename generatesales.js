var fs = require('fs')
var csv = require('fast-csv')

var csvWriteStream = csv.createWriteStream({headers: true})
var fileWriteStream = fs.createWriteStream("products.csv")

csvWriteStream.pipe(fileWriteStream)

var fileReadStream = fs.createReadStream('products_source.csv')
 
round = (value, decimals = 0) => {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
}

between = (a, b) => {
  if (typeof b === 'undefined') {
    b = a
    a = 0
  }
  return round(a + Math.random() * (b - a), 2)
}

scale = (value, start1, stop1, start2, stop2) => {
    return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2
}

any = items => items[~~(items.length * Math.random())]

tweak = (value, amount) => value * scale(Math.random(),0,1,1 - amount,1 + amount)

shuffle = array => array.map((a) => [Math.random(),a]).sort((a,b) => a[0] - b[0]).map((a) => a[1])

fixcase = string => string.split(' ').map(s => (s.slice(0, 1).toUpperCase() + s.slice(1).toLowerCase())).join(' ')

// 0 Ascending
// 1 Descending
// 2 Instable
// 3 Stable
const slopes = [
    [0.10,0.12,0.20,0.49,0.56,0.54,0.62,0.63,0.72,0.79,0.88,0.95,0.10,0.12,0.20,0.49,0.56,0.54,0.62,0.63,0.72,0.79,0.88,0.95,0.10,0.12,0.20,0.49,0.56,0.54,0.62,0.63,0.72,0.79,0.88,0.95], 
    [0.89,0.83,0.80,0.77,0.82,0.80,0.72,0.71,0.64,0.52,0.52,0.44,0.89,0.83,0.80,0.77,0.82,0.80,0.72,0.71,0.64,0.52,0.52,0.44,0.89,0.83,0.80,0.77,0.82,0.80,0.72,0.71,0.64,0.52,0.52,0.44], 
    [0.74,0.42,0.52,0.20,0.95,0.70,0.66,0.43,0.72,0.32,0.43,0.21,0.74,0.42,0.52,0.20,0.95,0.70,0.66,0.43,0.72,0.32,0.43,0.21,0.74,0.42,0.52,0.20,0.95,0.70,0.66,0.43,0.72,0.32,0.43,0.21], 
    [0.50,0.48,0.52,0.53,0.51,0.42,0.39,0.52,0.57,0.44,0.32,0.47,0.50,0.48,0.52,0.53,0.51,0.42,0.39,0.52,0.57,0.44,0.32,0.47,0.50,0.48,0.52,0.53,0.51,0.42,0.39,0.52,0.57,0.44,0.32,0.47], 
]

const generateQuantities = () => {
    const baseQuantity = between(1000,10000)
    return any(slopes).map(value => round(tweak(value * baseQuantity, 0.5)))
    //const changes = sales.map(sale => round(((sale - baseSale) / baseSale) * 100))
}

const generatePrices = () => {
    const basePrice = between(0.5,1)
    const slope = shuffle(any(slopes))
    return slopes[3].map(value => round(tweak(value * basePrice, 0.1),2))
}

const chains = [
    'Selver','Rimi','Coop','Maxima','Prisma'
]

const locations = [
    'Harju','Tartu','Ida-Viru',
    //'Pärnu','Lääne-Viru',
    //'Viljandi','Rapla','Võru','Saare','Jõgeva',
    //'Järva','Valga','Põlva','Lääne','Hiiu'
]

const types = [
    'Hüper', 
    'Suur super',
    'Väike super',
    'Superette',
    'Väikepoed',
    'Mugavuspoed',
    'Tanklad',
]

textures = [
    'with grains and seeds',
    'with additives',
    'sweet & sour',
    'regular rye'
]

cuts = [
    'sliced',
    'whole'
]

shapes = [
    'form',
    'loaf',
    'portion'
]

packed = [
    'packed',
    'unpacked'
]

var count = 0

var csvStream = csv({headers : true})
    .on('data', row => {
        
        if (count++ < 50) {
            
            const id = Math.floor(Math.random()* 100000000)
            const texture = any(textures)
            const cut = any(cuts)
            const shape = any(shapes)
            const pack = any(packed)

            chains.forEach(chain => {
                locations.forEach(location => {
                    types.forEach(type => {
                        const r = {}
                        const name = row.title.split(',').map(n => n.trim())
                        r.id = id
                        r.product = name[0]
                        r.brand = fixcase(name[1])
                        r.supplier = fixcase(row.producer)
                        r.texture = texture
                        r.cut = cut
                        r.shape = shape
                        r.packed = pack
                        r.chain = chain
                        r.location = location
                        r.type = type
                        const quantities = generateQuantities()
                        const prices = generatePrices()
                        quantities.forEach((quantity, i) => {
                            r['s' + (i + 1)] = round(quantity * prices[i])
                        })
                        csvWriteStream.write(r)
                    })
                })
            })

        }

    })
    .on('end', () => console.log("Sales generated"))

fileReadStream.pipe(csvStream)


