export default function parseJSON (str: string) {
    if (str == '') {
        return null
    }
    try {
        const data = JSON.parse(str)
        if (data) {
            return data
        }
    } catch (error) {
        return null        
    }

}