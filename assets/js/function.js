const toggleNavBtn = document.querySelector('.toggleNav')
const navLinksElm = document.querySelector('.nav')
const typeWriteEffElm = document.querySelector('.typewriter p')

// type writer effect essentials

const typeText = ['Hi!','I am a web designer.']
let currText = []
let i = 0
let j = 0
let isDeleting = false
let speed = 500

function typeWriteEff(){
    typeWriteEffElm.innerHTML = currText.join('')

    if(i < typeText.length){
        if(!isDeleting && j <= typeText[i].length){
            currText.push(typeText[i][j])
            j++
        }

        if(isDeleting && j <= typeText[i].length){
            currText.pop(typeText[i][j])
            j--
        }

        if(j == typeText[i].length){
            isDeleting = true
        }

        if(isDeleting && j === 0){
            isDeleting = false
            currText = []
            i++
            if(i === typeText.length){
                i = 0
            }
        }

        if(isDeleting && i < typeText[i].length){
            speed = 50
        }else{
            speed = 500
        }
    }

    setTimeout(typeWriteEff, speed)
}


// type writer effect essentials




function homepageFunc(){
    typeWriteEff()
    toggleNavBtn.addEventListener('click', () => {
        navLinksElm.classList.toggle('showNav')
    })
}





export {
    homepageFunc
}