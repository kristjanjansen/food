const round = (value, decimals = 0) => {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
}

const formatSale = (sale, showTons = false) => {
    if (sale >= 1000000) {
        if (showTons) {
            return round(Math.floor(sale / (1000000 * 100))) + 'T'
        }
        return '€' + Math.floor(sale / 1000000) + 'm'
    }
    if (sale >= 1000) {
        if (showTons) {
            return round(Math.floor(sale / (1000 * 100))) + 'T'
        }
        return '€' + Math.floor(sale / 1000) + 'k'
    }
    return sale
}

const shortenTitle = (title, length = 20) => {
    return title.length > length ? title.slice(0, length) + '...' : title
}

export { round, formatSale, shortenTitle }
