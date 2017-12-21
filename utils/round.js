const round = (value, decimals = 0) => {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
}

export default round