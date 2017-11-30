//동기
console.log("Hello")
console.log("World")

//비동기
setTimeout(() => console.log("World2"), 1000); //1초 뒤에 World2 출력
console.log("Hello2")