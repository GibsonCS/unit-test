const {error} = require('./src/constants')
const File = require('./src/file')
const assert = require('assert')

//IIFE 
;(async () => {
    {
        //If the user uploads a file with an invalid header 
        const filePath = './mocks/invalid-header.csv'
        const expect = new Error (error.INVALID_HEADER)
        const result = File.csvToJson(filePath)
        await assert.rejects(result, expect)
     
    }

    {
        // If the user uploads a empty file
        const filePath = './mocks/emptyFile-invalid.csv'
        const expect = new Error(error.INVALID_FILE_LENGTH)
        const result = File.csvToJson(filePath)
        await assert.rejects(result, expect)
    }

    {
        // If the user uploads a file with length > 3 lines
        const filePath = './mocks/fiveItems-invalid.csv'
        const expect = new Error(error.INVALID_FILE_LENGTH)
        const result = File.csvToJson(filePath)
        await assert.rejects(result, expect)
    }

    {
        // If the user uploads a valid file
        const filePath = './mocks/threeItems-valid.csv'
        const expect = [{
            id: 1,
            name: "xuxa da silva",
            profession: "developer",
            age: 120
          },
          {
            id: 2,
            name: "jose da silva",
            profession: "manager",
            age: 30
          },
          {
            id: 3,
            name: "zezin",
            profession: "QA",
            age: 25
          },]

        const result = await File.csvToJson(filePath)
        assert.deepEqual(result, expect)
    }

})()