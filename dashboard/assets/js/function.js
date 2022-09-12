// index page selectors
const loginFormElm = document.querySelector('form')
const adminUserNameElm =document.querySelector('#username')
const adminPassElm = document.querySelector('#password')
const invalMsgElm = document.querySelector('.invalMsg')
// dashboard page selectors
const navBarsElm = document.querySelector('.navShowBar')
const settingsBtnElm = document.querySelector('.settings')
const subSettingElm = document.querySelector('.setting')
const navBarElm = document.querySelector('.navBar')
const mainPostMenuElm = document.querySelector('#mainPostMenu')
const subMenuElm = document.querySelector('#subMenu')

//index page functions

function gettingLoginVal(){
    let adUsernameVal = adminUserNameElm.value;
    let adPassVal = adminPassElm.value;
    
    return{
        adUsernameVal,
        adPassVal
    }
}

let isError = false

function loginFormVal(){
    let{
        adUsernameVal,
        adPassVal
    } = gettingLoginVal()

    if(!adUsernameVal && !adPassVal){
        isError = true
    }else{
        isError = false
    }

    if(isError){
        invalMsgElm.textContent = 'Invalid Field'
    }else{
        console.log(adUsernameVal,
        adPassVal);
        adminPassElm.value = ''
        adminUserNameElm.value = ''
        invalMsgElm.textContent = ''
    }
}


function indexpageFunc(){
    
    loginFormElm.addEventListener('submit', e => {
        e.preventDefault()
        loginFormVal()
    })
    
    
}

// dashboard page functions


// nav bar toggle
function navBarToggle(){
    navBarsElm.addEventListener('click', () => {
        navBarElm.classList.toggle('navBarShow')
    })
}

// settings toggle
function settingsToggle(){
    // console.log(settingsBtnElm);
    // console.log(subSettingElm);
    settingsBtnElm.addEventListener('click', () => {
        subSettingElm.classList.toggle('settingShow')
    })
}

// post option toggle
function postMenuToggle(){
    mainPostMenuElm.addEventListener('click', () => {
        subMenuElm.classList.toggle('subMenuShow')
    })
}

function dashboardFunc(){
    navBarToggle()
    settingsToggle()
    postMenuToggle()
}


export {
    indexpageFunc,
    dashboardFunc
}