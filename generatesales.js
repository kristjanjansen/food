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

any = items => items[~~(items.length * Math.random())]

fixcase = string => string.split(' ').map(s => (s.slice(0, 1).toUpperCase() + s.slice(1).toLowerCase())).join(' ')

const generateSales = () => {
   return Array(6 * 12).fill(0).map(() => {
        return round(between(100, 100000))
    })
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
                        const sales = generateSales()
                        sales.forEach((price,i) => {
                            r['s' + (i + 1)] = sales[i]
                        })
                        csvWriteStream.write(r)
                    })
                })
            })

        }

    })
    .on('end', () => console.log("Sales generated"))

fileReadStream.pipe(csvStream)


