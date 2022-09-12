// index page selectors
const loginFormElm = document.querySelector('form')
const adminUserNameElm =document.querySelector('#username')
const adminPassElm = document.querySelector('#password')
const invalMsgElm = document.querySelector('.invalMsg')

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


export {
    indexpageFunc
}