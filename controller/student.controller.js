const axios = require("axios")

class Student{
    constructor() {
    }

    home(type){
        let data = this.getInfo(type,1)
         return data + 5;
    }

    userId(){
        return 12;
    }
    getInfo(type,status){
        return type;
    }

    finalMarks(total){
        let external = this.getExternal(total)
        let internal = this.getInternal(total)
        let totalSum = external + internal + 10 ; //39+10+10
        return totalSum
    }

    getExternal(total){
        return total + 1;
    }
    getInternal(total){
        return total - 1;
    }

    dbData(){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>resolve(10),1500);
        })
    }
}

const newsData = ()=>{
    return new Promise((resolve ,reject)=>{
        resolve({otp:2522})
    })
}

const user = ()=>{
    return new Promise((resolve,reject)=>{
   axios.get('http://localhost:4004/list')
            .then(response=>{
                resolve(response.data)
            }).catch(error=>{
            reject(error)
        })
    })
}

module.exports = {Student,newsData,user}