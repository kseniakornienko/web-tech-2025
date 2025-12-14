//1 задание

function pickPropArray(arr, prop) {
    const result = [];
    
    for (let i = 0; i < arr.length; i++) {

        if (arr[i].hasOwnProperty(prop)) {
            result.push(arr[i][prop]);
        }
    }
    
    return result;
}

const students = [
   { name: 'Павел', age: 20 },
   { name: 'Иван', age: 20 },
   { name: 'Эдем', age: 20 },
   { name: 'Денис', age: 20 },
   { name: 'Виктория', age: 20 },
   { age: 40 },
]

const resultNames = pickPropArray(students, 'name')

console.log(resultNames) 
//[ 'Павел', 'Иван', 'Эдем', 'Денис', 'Виктория' ]
const resultAges = pickPropArray(students, 'age')

console.log(resultAges) 

//2 задание

function createCounter() {
    let count = 0;
    
    return function () {
        count++;
        console.log(count);
        return count;
    }
}

const counter1 = createCounter();
counter1(); // 1
counter1(); // 2

const counter2 = createCounter();
counter2(); // 1
counter2(); // 2

//3 задание

function spinWords(str) {

    const words = str.split(' ');
    
    const processedWords = words.map(word => {

        if (word.length >= 5) {

            return word.split('').reverse().join('');
        }

        return word;
    });
    

    return processedWords.join(' ');
}

const result1 = spinWords( "Привет от Legacy" )
console.log(result1) // тевирП от ycageL

const result2 = spinWords( "This is a test" )
console.log(result2) // This is a test

//4 задание

function twoIndex(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}

console.log(twoIndex([2, 7, 11, 15], 9)); // [0, 1]

//5 задание

function longestCommonSuffix(strs) {

    if (!strs || strs.length === 0) {
        return "";
    }
    
    let suffix = strs[0];
    
    for (let i = 1; i < strs.length; i++) {

        while (!strs[i].endsWith(suffix)) {

            suffix = suffix.slice(1);
            
            if (suffix.length < 2) {
                return "";
            }
        }
    }
    
    return suffix;
}

console.log(longestCommonSuffix(["цветок", "поток", "хлопок"])); // "ок"
console.log(longestCommonSuffix(["собака", "гоночная машина", "машина"])); // ""