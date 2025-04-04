const {readFile} = require('fs/promises')
const {error} = require('./constants')

const VALID_DATA = {
    maxLines: 3,
    fields: ['id','name','profession','age']
}

class File {
    static async csvToJson(filePath) {
        const fileContent = await readFile(filePath, 'utf8')
        const validation = this.isValid(fileContent)
        if(!validation.valid) throw new Error(validation.error)


        return this.parseCSVToJSON(fileContent)
        
    }

    static isValid (csvString, options = VALID_DATA) {
        const [header, ...fileWithoutHeader] = csvString.split(/\r?\n/)
        
        const isValidHeader = header === options.fields.join(',')
            
        if(!isValidHeader){
            return {
                error: error.INVALID_HEADER,
                valid: false
            }
        }

        if(!fileWithoutHeader.length || fileWithoutHeader.length > 3) {
            return {
                error: error.INVALID_FILE_LENGTH,
                valid: false
            }
        }
        return { valid: true }
    }

    static parseCSVToJSON(csvString) {
        const lines = csvString.split(/\r?\n/)
        const firstLine = lines.shift()
        const header = firstLine.split(',')
          
        const users = lines.map((line) => {
            const colums = line.split(',')
            const user = {}
            for(const index in colums) {
                user[header[index]] = colums[index].trim()
            }
            return user
            
        })
        return users
    }
}

module.exports = File