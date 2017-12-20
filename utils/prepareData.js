export default function prepareData(data) {
    // We get the all the sales from columns named s1,s2,s3 etc
    // and convert them to sales[] array for easier handling
    data.s = Object.entries(data).reduce((prev, current, i) => {
        if (current[0][0] === 's' && parseInt(current[0][1]) > 0) {
            prev.push(parseFloat(current[1]))
        }
        return prev
    }, [])
    return data
}
