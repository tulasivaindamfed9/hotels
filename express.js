function add(a,b){
    return a+b
}
console.log(add(3,21))

// importing fs(file system module)
const fs=require('fs')
fs.appendFile('greeting.txt','Hello Tulasi'+'!\n',()=>{
    console.log('File named greetin.txt is creted')
})

// importing lodash library
// Load the full build.
var _ = require('lodash');
const arr=[1,2,44,44,2,1,'app','app','bob']
const filterdArr=_.uniq(arr)
console.log(filterdArr)