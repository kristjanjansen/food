const round = (value, decimals = 0) => {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
}

const formatSale = sale => {
    if (sale >= 1000000) {
        return Math.floor(sale / 1000000) + 'm'
    }
    if (sale >= 1000) {
        return Math.floor(sale / 1000) + 'k'
    }
    return sale
}

export { round, formatSale }
