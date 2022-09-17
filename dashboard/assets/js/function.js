// firebase authentication
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
import { getDatabase, set, ref, get, child } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
    apiKey: "AIzaSyDwqRcqMY9Rp2QEaJL4X581BPQE1eOpeBQ",
    authDomain: "myportfolio-e3f10.firebaseapp.com",
    databaseURL: "https://myportfolio-e3f10-default-rtdb.firebaseio.com",
    projectId: "myportfolio-e3f10",
    storageBucket: "myportfolio-e3f10.appspot.com",
    messagingSenderId: "238033549059",
    appId: "1:238033549059:web:9e200f8ea72db3440a9b36",
    measurementId: "G-ZHT9CE80YV"
  };
initializeApp(firebaseConfig)

// getAuthen
const auth = getAuth()

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
const loginAreaElm = document.querySelector('.loginArea')
const dashboardAreaElm = document.querySelector('.dashboardArea')
const blogPostBtnElm = document.querySelector('.blogPBtn')
const portfolioPostBtnElm = document.querySelector(".portfolioPBtn")
const portfolioPostFormElm = document.querySelector('.portfolioPost')
const blogPostFormElm = document.querySelector('.blogPost')
const blogPostTitleElm = document.querySelector('.blogPostTitle')
const blogPostShortDesElm = document.querySelector('.blogPostShortDesc')
const blogPostDetailsElm = document.querySelector('.blogDesc')
const portPostTitleElm = document.querySelector('.portPostTitle')
const portshortDesElm = document.querySelector('.portShotDes')
const portDetialsElm = document.querySelector('.portfolioFullDes')
const portImageElm = document.querySelector('.portImage')
const blogFormElm = document.querySelector('.blogPost form')
const portFormElm = document.querySelector('.portfolioPost form')
const blogTableBody = document.querySelector('.blogPostMaintain table tbody')

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
document.addEventListener('DOMContentLoaded', () =>{
    loginAreaElm.style.display = 'block'
    dashboardAreaElm.style.display = 'none'
    blogIdGenerate()
    console.log(blogId);
    readDashbordBlog()
})




function signInAuthen(username, pass){
    signInWithEmailAndPassword(auth, username, pass)
    .then( userCreadential => {
        const user = userCreadential.user
        // console.log(auth.currentUser);
        // console.log(user);
        if(user){
            loginAreaElm.style.display = 'none'
            dashboardAreaElm.style.display = 'block'
            document.title = 'Dashbord - Portfolio'
        }else{
            loginAreaElm.style.display = 'block'
            dashboardAreaElm.style.display = 'none'
            
        }
    })
    .catch( err => {
        console.log(err.code);
        console.log(err.message);
        invalMsgElm.textContent = 'Please check your Username or Password'
    })
}



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
        // console.log(adUsernameVal,
        // adPassVal);
        adminPassElm.value = ''
        adminUserNameElm.value = ''
        invalMsgElm.textContent = ''
        signInAuthen(adUsernameVal, adPassVal)
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

// getting value of form
function blogPostFormValue(){
    let blogTitleVal = ''
    let blogShotDescVal = ''
    let bloDetailsVal = ''
    // console.log(blogTitleVal);
    if(document.querySelector('.blogPost')){
        blogTitleVal = blogPostTitleElm.value;
        blogShotDescVal = blogPostShortDesElm.value
        bloDetailsVal = blogPostDetailsElm.value
    }
    return{
        blogTitleVal,
        blogShotDescVal,
        bloDetailsVal
    }
}

function portfolioPostValue(){
    let portTitleVal = ''
    let portShortVal = ''
    let portDetailsVal = ''
    let portImageVal = ''
    if(portfolioPostFormElm){
        portTitleVal = portPostTitleElm.value
        portShortVal = portshortDesElm.value 
        portDetailsVal = portDetialsElm.value
        portImageVal = portImageElm.value
    }

    return{
        portTitleVal,
        portShortVal,
        portDetailsVal,
        portImageVal
    }
}

// validation form

function validBlogPostForm(){
    let isBlogValid = true
    if(blogPostBtnElm){
        const {
            blogTitleVal,
            blogShotDescVal,
            bloDetailsVal
        } = blogPostFormValue()
        // 
        if(!blogTitleVal && !blogShotDescVal && !bloDetailsVal){
            isBlogValid = false
            alert('Invalid form')
        }else{
            // blogIdGenerate()
            writeBlogOnServer(blogTitleVal, blogShotDescVal, bloDetailsVal)
            blogFormElm.reset()
            readDashbordBlog()
            blogIdGenerate()
        }
    }
}

function validPortPostForm(){
    let isPortValid = true
    if(portfolioPostFormElm){
        const {
            portTitleVal,
            portShortVal,
            portDetailsVal,
            portImageVal
        } = portfolioPostValue()

        if(!portTitleVal && !portShortVal && !portDetailsVal && !portImageVal){
            isPortValid = false
        }else{
            
            isPortValid = true
        }
    }
    return isPortValid
}

// ============ ==== ============= +++++ 

// submit post form connect blog form with server

let blogId = 1

function writeBlogOnServer(title, shortDes, details){
    const db = getDatabase()
    blogId = blogId+1
    set(ref(db, 'BlogPost/' + blogId),{
        BlogId : blogId,
        BlogTitle : title,
        BlogShortDesc : shortDes,
        BlogDetails : details
    })
}

function blogIdGenerate(){
    let blogId = 0
    const dbRef = ref(getDatabase())
    get(child(dbRef, 'BlogPost')).then(snapshot => {
        if(snapshot.exists()){
            let allData = snapshot.val();
            console.log(allData);
            if(typeof(allData) === "object"){
               console.log(allData.BlogId);
            }else{
                blogId = allData[allData.length-1].BlogId
            }
            // console.log(allData[allData.length-1].BlogId);
            
            console.log(blogId);
            // showBlogPostInDashboard(allData)
            readDashbordBlog()
        }else{
            console.log('No data available');
        }
    })
    .catch(err => {
        console.log(err.message);
        console.log(err.code);
    })
}

// read data for show dashboard table
function readDashbordBlog(){
    let dataObje = []
    const dbRef = ref(getDatabase())
    get(child(dbRef, 'BlogPost/')).then( snapshot => {
        if(snapshot.exists()){
            let blogData = snapshot.val()
            // blogData.slice(1)
            if(typeof(blogData) === 'object'){
                dataObje.push(blogData)
            }else{
                dataObje = blogData
            }
            showBlogPostInDashboard(dataObje)
            console.log(snapshot.val());
        }else{
            console.log('No data available');
        }
    })
}

readDashbordBlog()

function showBlogPostInDashboard(blog){
    // console.log(typeof(blog));
    const blogMaintainDiv = document.querySelector('.blogPostMaintain')
    blogTableBody.innerHTML = ''
    // console.log(blogTableBody);
    blog.map(elem => {
        // console.log(elem);
        const htmlElm = `
            <tr>
                <td>${elem.BlogId}</td>
                <td>${elem.BlogTitle}</td>
                <td>${elem.BlogDetails}</td>
                <td><button class="id-${elem.BlogId} blogDeleteBtn">Delete</button><button class="id-${elem.BlogId} blogEditBtn">Edit</button></td>
            </tr>
        `
        blogTableBody.insertAdjacentHTML('beforeend', htmlElm)
    })
}

///////////////////////////////////////////////////////////////////

if(document.querySelector('.blogPost')){
    blogFormElm.addEventListener('submit', e => {

        e.preventDefault()
        // readDashbordBlog()
        validBlogPostForm()
    })
}

if(document.querySelector('.portfolioPost')){
    portFormElm.addEventListener('submit', e => {
        e.preventDefault()
        const isPortValid = validPortPostForm()
        if(isPortValid){
            console.log('Yes');
            portFormElm.reset()
        }else{
            alert('Invalid Form Field')
        }
    })
}

// post option toggle
function postMenuToggle(){
    if(mainPostMenuElm){
            mainPostMenuElm.addEventListener('click', () => {
            subMenuElm.classList.toggle('subMenuShow')
        })
    }
    
}



function postFormToggle(){
    if(blogPostBtnElm){
        blogPostBtnElm.addEventListener('click', ()=>{
            blogPostFormElm.style.display = 'block'
            portfolioPostFormElm.style.display = 'none'
        })
    }
    if(portfolioPostBtnElm){
        portfolioPostBtnElm.addEventListener('click', () => {
            blogPostFormElm.style.display = 'none'
            portfolioPostFormElm.style.display = 'block'
        })
    }
}

postFormToggle()

//

function dashboardFunc(){
    navBarToggle()
    settingsToggle()
    postMenuToggle()
}

dashboardFunc()
indexpageFunc()


// export {
//     indexpageFunc,
//     dashboardFunc
// }