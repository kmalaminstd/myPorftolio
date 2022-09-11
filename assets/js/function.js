import portfolioList from "./protfolioList.js"

const toggleNavBtn = document.querySelector('.toggleNav')
const navLinksElm = document.querySelector('.nav')
const typeWriteEffElm = document.querySelector('.typewriter p')
const contactNamefieldElm = document.querySelector('.contactName')
const contactEmailFieldElm = document.querySelector('.contactEmail')
const contactSubjectFieldElm = document.querySelector('.contactSubject')
const contactMessageFieldElm = document.querySelector('.contactMessage')
const contacForm = document.querySelector('.contactForm form')
// contact page selector
const myWorkFullDivElm = document.querySelector('.myWork')

// type writer effect essentials

const typeText = ['Hi! there','I am a web designer.']
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
        }else if(!isDeleting && i === 1){
            speed = 300
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

// contact page functions

// getting value from contact page
function contactFormValue(){
    const conNameVal = contactNamefieldElm.value;
    const conEmailVal = contactEmailFieldElm.value;
    const conSubVal = contactSubjectFieldElm.value;
    const conMessVal = contactMessageFieldElm.value;

    return{
        conNameVal,
        conEmailVal,
        conSubVal,
        conMessVal
    }
}

function contactPageFunc(){

    const {
        conNameVal,
        conEmailVal,
        conSubVal,
        conMessVal
    } = contactFormValue()

    let isError = false

    // toggle button function
    toggleNavBtn.addEventListener('click', () => {
        navLinksElm.classList.toggle('showNav')
    })

    // contact form validation
    contacForm.addEventListener('submit', () => {
        conNameVal.value = ''
        conEmailVal.value = ''
        conSubVal.value = ''
        conMessVal.value = ''
    })
}

// contact page functions

// portfolio page functions

async function gettingPortfolioItems(){
    const res = await fetch('https://json.extendsclass.com/bin/13c6d14e659d')
    const result = await res.json()
    
    return result
}

async function portfolioPageFunc(){
    const result = await gettingPortfolioItems()
    result.data.map( elem => {
        const htmlElm = `
            <div class="workCard">
            <div class="workThumbnail">
                <img src="${elem.image}" alt="">
            </div>
            <div class="workTitle">
                <h3>${elem.title}</h3>
            </div>
            <div class="workDetails">
                <p>${elem.details}</p>
            </div>
            <div class="preview">
                <a href="${elem.githubLink}" target="_blank"><button>View</button></a>
            </div>
            </div>
        `
        myWorkFullDivElm.insertAdjacentHTML('beforeend', htmlElm)
    })
}

// portfolio page functions






export {
    homepageFunc,
    portfolioPageFunc,
    contactPageFunc
}