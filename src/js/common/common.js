setTimeout(()=> {
    console.log(1)
}, 500)

export var getInfo = function() {
    var mes = {}
    mes.name = 'edge'
    mes.age = '12'
    mes.happy = 'true'
    mes.arr = [1, 2, 3, 4, 5]

     var newArry = mes.arr.concat(mes.arr)
     return newArry
}