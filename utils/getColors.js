                // const color1 = d3.color(d3.schemeCategory10[filterIndex]).darker(1)
                // let color2 = d3.hsl(color1)
                // color2.h -= 40
                // color2 = color2.brighter(1)
                
                                        // values.map((v, index) => {
                        // return d3.scaleLinear()
                        //     .domain([0, values.length - 1])
                        //     .range([color1, color2])
                        //     (index)

  
export default (filterIndex, valuesLength) => {
    const colors =
        _.flatten(Array(3).fill(null).map((value, index) => {
            return d3.schemeCategory10
                .map(color => {
                    const c = d3.hsl(color).brighter(index * 0.2)
                    c.h += filterIndex * 30
                    c.s = 0.75
                    return c
                })
        }))
    return colors.slice(0, valuesLength)
}