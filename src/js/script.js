// объект для внесения информации в модальное окно
class ContentModal {
    constructor(name, email, subject, cont_text){
        this.name = name;
        this.email =email;
        this.subject = subject;
        this.cont_text = cont_text;
    }
    // генерация контента для объекта Modal 
    generateContent(){
        let template = `<h3>The letter was sent</h3>`;
        template += `<p class = "p_first">Name: ${this.name}</p>`
        template += `<p class = "p_first">email: ${this.email}</p>`
        if (this.subject){
            template += `<p class = "p_first">Subject: ${this.subject}.</p>`
        } else {
            template += `<p class = "p_first">Without subject.</p>`
        }
        if (this.cont_text){
           template += `<p class = "p_first p_modal">Description: ${this.cont_text}.</p>`
        } else {
           template += `<p class = "p_first">Without description.</p>`
        }
        return template;
    }
}
// объект для создания модального окна
class Modal {
    constructor(classes){
        this.classes = classes;
        this.modal = '';
        this.modalContent = '';
        this.modalBtn = '';
        this.overlay = '';
    }
    buildModal(content)  {
        this.overlay = this.createNode(this.overlay, 'div',this.classes);
        this.modal = this.createNode(this.modal, 'div','modal');
        this.modalContent =this.createNode(this.modalContent, 'div','content');
        this.modalBtn = this.createNode(this.modalBtn, 'button', 'modal_button');
        this.modalBtn.innerHTML = 'Ok';
        this.setContent(content);
        this.appendElem();
        this.bindEven();
        this.openModal();  
    }
    createNode (node, elem, ...classes){
        node = document.createElement(elem);
        node.classList.add(...classes);
        return node;
    }
    setContent(content){
        if(typeof content === 'string'){
            this.modalContent.innerHTML = content;
        } else{
            this.modalContent.innerHTML = '';
            this.modalContent.appendChild(content);
        }
    }
    appendElem(){
        this.modal.append(this.modalContent);
        this.modal.append(this.modalBtn);
        this.overlay.append(this.modal);
    }
    bindEven(){
        this.modalBtn.addEventListener('click',(event) =>{
            let classEvent = event.target.classList;
            document.querySelector(".get-a-quote__form > input:nth-child(1)").value ='';
            document.querySelector(".get-a-quote__form > input:nth-child(2)").value = '';
            document.querySelector(".get-a-quote__form > input:nth-child(3)").value = '';
            document.querySelector(".get-a-quote__input__detail").value = '';
            if(classEvent.contains(this.modalBtn.classList) ){
            let name = `.${this.overlay.className}`
            document.querySelector(name).remove();
           }
        });
        /*  this.overlay.addEventListener('click',(event) =>{
            let classEvent = event.target.classList;
            if( classEvent.contains(this.overlay.classList)){
            
            let name = `.${this.overlay.className}`
            document.querySelector(name).remove();
           }
        });*/
    }
    openModal(){
        document.body.append(this.overlay);
    } 
}

const portfolio = [
    {
      id: 0,
      tags:['art'],
      urlToImg: 'assets/image/Project.png'
    },
    {
      id: 1,
      tags:['graphic'],
      urlToImg: 'assets/image/Project2.png'
    },
    {
      id: 2,
      tags:['web'],
      urlToImg: 'assets/image/Project3.png'
    },
    {
      id: 3,
      tags:['art', 'web', 'graphic'],
      urlToImg: 'assets/image/Project4.png'
    },
    {
      id: 4,
      tags:['art', 'graphic'],
      urlToImg: 'assets/image/Project5.png'
    },
    {
      id: 5,
      tags:[ 'web', 'graphic'],
      urlToImg: 'assets/image/Project6.png'
    },
    {
      id: 6,
      tags:['art', 'graphic'],
      urlToImg: 'assets/image/Project7.png'
    },
    {
      id: 7,
      tags:['art', 'graphic'],
      urlToImg: 'assets/image/Project8.png'
    },
    {
      id: 8,
      tags:['art', 'web'],
      urlToImg: 'assets/image/Project9.png'
    },
    {
      id: 9,
      tags:['art', 'web', 'graphic'],
      urlToImg: 'assets/image/Project10.png'
    },
    {
      id: 10,
      tags:['graphic'],
      urlToImg: 'assets/image/Project11.png'
    },
    {
      id: 11,
      tags:['art'],
      urlToImg: 'assets/image/Project12.png'
    },
    
  ]

//headerList
const header = document.querySelector('.header__list');
const headerListClass = 'header__list__item';
const headerList = document.querySelectorAll('.header__list__item');
const headerLinks = document.querySelectorAll('.header__list a');
const headerListClassMod = 'header__list__item_mod';
const bottomSize = 'bottom_size';
//portTagsList
const portTags = document.querySelector('.portfolio__list');
const portTagsListClass = 'portfolio__item';
const portTagsList = document.querySelectorAll('.portfolio__item');
const portTagsListClassMod = 'portfolio__item_color';



let port_arr = [];
const portImgList = document.querySelectorAll('.portfolio__image');



const sections = document.querySelectorAll('section');


window.onload = function() {
    addElementScroll(headerList, headerLinks, headerListClassMod);
    addClick();
    menuActive();
    //menuPassive();
    addImgPortDataId();
    addElemClickHeader();
    addElemClickHandler(portTags, portTagsListClass, portTagsList, portTagsListClassMod);
    elemScrollHandler(header);
    elemScrollHandler(portTags);
    
    addElemClickHandlerSort(portTags, portTagsListClass, portTagsList)
}

const addElemClickHeader = () => {
    header.addEventListener('click', (event) => {
        if (event.target.classList.contains(headerListClass)) {
            headerList.forEach(tag => {
                tag.classList.remove(headerListClassMod);
            })
            event.target.classList.add(headerListClassMod);
            if(document.querySelector('.hamburger_active')){
                document.querySelector('.hamburger__line_active').classList.add('hamburger__line');
                document.querySelector('.hamburger__line').classList.remove('hamburger__line_active');
                menu.classList.remove('hamburger_active');
                menu.classList.add('hamburger');
                menuList();
            }
        }
    })
}

//scroll
const addElementScroll = (elemList, elemLink, elemClassMod) => {
    document.addEventListener('scroll', () => {
        let poz = window.scrollY;
        sections.forEach(el => {
            if(el.offsetTop <= poz && (el.offsetTop + el.offsetHeight) > poz ){
                for (let i = 0; i < elemList.length; i++ ){
                    if (elemLink[i].getAttribute('href') === ('#'+el.getAttribute('id'))){
                        elemList.forEach(tag => {
                            tag.classList.remove(elemClassMod);
                        })
                        elemList[i].classList.add(elemClassMod);
                        //el.classList.add(elemClassSize);
                        
                    } 
                }
            // } else {
                
            //     el.classList.remove(elemClassSize);
                
            }
        })
    })
}

//смена цвета элементов при нажатии
const addElemClickHandler = (elem, elemClass, elemList, elemClassMod) => {
    elem.addEventListener('click', (event) => {
        if (event.target.classList.contains(elemClass)) {
            elemList.forEach(tag => {
                tag.classList.remove(elemClassMod);
            })
            event.target.classList.add(elemClassMod);
        }
    })
}

//плавный переход по якорям
const elemScrollHandler = (elemList) => {
    elemList.querySelectorAll('a').forEach((elem)=>{
        elem.addEventListener('click', (event) => {
            event.preventDefault()
            const sectionID = elem.getAttribute('href')
            document.querySelector(sectionID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    }) 
        
   
}

// SLIDER (!исправить, если будет время)
let left = -20;
let right = 0;
let left_arr = [0,100];
let poz_left = left;
let poz_right = right;
const color = ['#648BF0','#f06c64'];
const slider_first = document.querySelector('.slider-block__slid__first');
const slider_second = document.querySelector('.slider-block__slid__second');
const chek_right = document.querySelector('.slider-block__arrow_right');
let back_start = document.querySelector("body > section.slider-block");
let back = document.querySelectorAll('.slider-block');
const chek_left = document.querySelector('.slider-block__arrow_left');
chek_left.addEventListener('click', () => {
    let l1 = -left_arr[0];
    let l2 = left_arr[0]-200;
    let interval = setInterval(() => {
        back.forEach((item) =>{
            let deg = 90;
            item.style.background = `linear-gradient(${deg}deg, ${color[0]} ${poz_left}%, ${color[1]} ${poz_right}%)`;
            slider_first.style.left = `${l1}%`;
            slider_second.style.left = `${l2}%`;
            if (poz_left === 100){
                left_arr = left_arr.reverse();
                color.reverse();
                poz_left = left;
                poz_right = right;
                clearInterval(interval);
                return ;
            }
             l2= l2+100/120;
             l1= l1+100/120;
            poz_right+=1;
            poz_left+=1;
        })
    }, 6)
})

chek_right.addEventListener('click', () => {
    let l1 = left_arr[0];
    let l2 = -left_arr[0];
    let interval = setInterval(() => { 
        back.forEach((item) =>{
            let deg = -90;
            item.style.background = `linear-gradient(${deg}deg, ${color[0]} ${poz_left}%, ${color[1]} ${poz_right}%)`;
            slider_first.style.left = `${l1}%`;
            slider_second.style.left = `${l2}%`;
            if (poz_left === 100){
                left_arr = left_arr.reverse();
                color.reverse();
                poz_left = left;
                poz_right = right;
                clearInterval(interval);
                return ;
            }
            l2= l2-100/120;
            l1= l1-100/120;
            poz_right+=1;
            poz_left+=1;
        })
    }, 6)
})
//DISPLAY none
let dis_vert = document.querySelector('.slider-block__vertical');
dis_vert.addEventListener(('click'), () => {
    if(document.querySelector('.slider-block__vertical__img').style.display === "none" ){
        document.querySelector('.slider-block__vertical__img').style.display = '';
        document.querySelector('.slider-block__vertical').classList.remove('slider-block__vertical__screen');
    }
    else{ 
        document.querySelector('.slider-block__vertical__img').style.display = 'none';
        document.querySelector('.slider-block__vertical').classList.add('slider-block__vertical__screen');
    }
})

let dis_hor = document.querySelector('.slider-block__horizontal');
dis_hor.addEventListener(('click'), () => {
    if(document.querySelector('.slider-block__horizontal__img').style.display === "none" ){
        document.querySelector('.slider-block__horizontal__img').style.display = '';
        document.querySelector('.slider-block__horizontal').classList.remove('slider-block__horizontal__screen');
    }
    else{ 
        document.querySelector('.slider-block__horizontal__img').style.display = 'none';
        document.querySelector('.slider-block__horizontal').classList.add('slider-block__horizontal__screen');
    }
})


//sort



const addImgPortDataId = () => {
    let i = 0; 
    portImgList.forEach(elem => {
        elem.setAttribute('data-id', i); 
        // console.log(portfolio[i].urlToImg);
        // console.log(i);
        if(portfolio[i]){
        let j = portfolio[i].urlToImg;
        elem.innerHTML = `<img src =${j}>`;
        }
        i++
    })
}

const addElemClickHandlerSort = (elem, elemClass, arr) => {
    elem.addEventListener('click', (event) => {
        if (event.target.classList.contains(elemClass)) {
            let i = 0;
            let j = 0;
            let port_arr1 = [];
            let port_arr2 = [];
            switch(event.target){
                case arr[0]:
                    portImgList.forEach(elem=>{
                        if(portfolio[i]){
                            elem.innerHTML = `<img src =${portfolio[i].urlToImg}>`;
                            i++    
                        }         
                    }) 
                break;
                case arr[1]:
                    portImgList.forEach(()=>{
                        j = 0;
                        portfolio[i].tags.forEach(el => {
                            if (el === 'web'){
                                port_arr1.push(portfolio[i].urlToImg);;
                                j = 1;
                                return;
                            }
                        })
                        if( j === 0 ){
                            port_arr2.push(portfolio[i].urlToImg);
                        }
                        i++;      
                    })
                    for (let i = 0; i< port_arr1.length; i++ ){
                        portImgList[i].innerHTML =  `<img src =${port_arr1[i]}>`;
                    }
                    for (let i = 0; i< port_arr2.length; i++ ){
                        let z = port_arr1.length + i;

                        portImgList[z].innerHTML =  `<img src =${port_arr2[i]}>`;;
                    }

                    port_arr1 = [];
                    port_arr2 = [];
                break;
                case arr[2]:
                    portImgList.forEach(()=>{
                        j = 0;
                        portfolio[i].tags.forEach(el => {
                            if (el === 'graphic'){
                                port_arr1.push(portfolio[i].urlToImg);;
                                j = 1;
                                return;
                            }
                        })
                        if( j === 0 ){
                            port_arr2.push(portfolio[i].urlToImg);
                        }
                        i++;      
                    })
                    for (let i = 0; i< port_arr1.length; i++ ){
                        portImgList[i].innerHTML =  `<img src =${port_arr1[i]}>`;
                    }
                    for (let i = 0; i< port_arr2.length; i++ ){
                        let z = port_arr1.length + i;

                        portImgList[z].innerHTML =  `<img src =${port_arr2[i]}>`;;
                    }
                    port_arr1 = [];
                    port_arr2 = [];
                break;
                case arr[3]:
                    portImgList.forEach(()=>{
                        j = 0;
                        portfolio[i].tags.forEach(el => {
                            if (el === 'art'){
                                port_arr1.push(portfolio[i].urlToImg);;
                                j = 1;
                                return;
                            }
                        })
                        if( j === 0 ){
                            port_arr2.push(portfolio[i].urlToImg);
                        }
                        i++;      
                    })
                    for (let i = 0; i< port_arr1.length; i++ ){
                        portImgList[i].innerHTML =  `<img src =${port_arr1[i]}>`;
                    }
                    for (let i = 0; i< port_arr2.length; i++ ){
                        let z = port_arr1.length + i;

                        portImgList[z].innerHTML =  `<img src =${port_arr2[i]}>`;;
                    }
                    port_arr1 = [];
                    port_arr2 = []; 
                break;
            }
        }
    })
}
// activ Img
let port_img = document.querySelector('.portfolio__images');
let port_imgs = document.querySelectorAll('.portfolio__image');
port_imgs.forEach((el) => {
     
    el.addEventListener('click', (event) =>  {
        port_imgs.forEach(el => el.classList.remove('portfolio__image_active'));
        event.target.parentNode.classList.add('portfolio__image_active');
        //console.log(event.target.parentNode)
    })
    
})
 
let menu = document.querySelector('.hamb');
//let menu_active = document.querySelector('.hamburger_active');
const menuActive = () => {
    menu.addEventListener('click', (event) =>{
        if (event.target.classList.contains('hamb')){
            if(event.target.classList.contains('hamburger')){
                //document.querySelector('.header__logo').style.justify('left');
                document.querySelector('.hamburger__line').classList.add('hamburger__line_active');
                document.querySelector('.hamburger__line').classList.remove('hamburger__line');
                menu.classList.add('hamburger_active');
                menu.classList.remove('hamburger');
                menuList();
            } else {
                document.querySelector('.hamburger__line_active').classList.add('hamburger__line');
                document.querySelector('.hamburger__line').classList.remove('hamburger__line_active');
                menu.classList.remove('hamburger_active');
                menu.classList.add('hamburger');
                menuList();
            }
        }
    })
}
let active = document.querySelector('.header__list');

const menuList = () => {
    let i = 0;
    let j = 0;
    if(active.style.left === '0px'){
        let interval = setInterval(() =>{
            if(active.style.left === '-276px' ){
                clearInterval(interval);
                return;
            } else {
                i-=4;
                j++;
                //let n = -276 + i;
                //console.log(i)
                document.querySelector('.header__logo').style.left = `${71 + j}px`;
                active.style.left = `${i}px`;
            }    
        }, 1)  
    } else {
    let interval = setInterval(() =>{
        if(active.style.left === '0px' ){
            clearInterval(interval);
            return;
        } else {
            i+=4;
            j++;
            //let n = -276 + i;
            //console.log(i)
            document.querySelector('.header__logo').style.left = `${140 - j}px`;
            active.style.left = `${-276 + i}px`;
        }    
    }, 1)  
    }   
}


const addClick = () =>{
    document.querySelector('.get-a-quote__input__button').addEventListener('click', (event) =>{
        event.preventDefault();
        generateModal();
    })
}
 
const generateModal = () => {
    let name = document.querySelector(".get-a-quote__form > input:nth-child(1)").value;
    let email = document.querySelector(".get-a-quote__form > input:nth-child(2)").value;
    let subject = document.querySelector(".get-a-quote__form > input:nth-child(3)").value;
    let cont_text = document.querySelector(".get-a-quote__input__detail").value;
    if(name && (email.indexOf('@') > 0)){
        let content = new ContentModal(name, email, subject, cont_text);
        renderModal(content.generateContent());
    }
}

const renderModal = (content) =>{
    let modal = new Modal('overlay');
    modal.buildModal(content);
}
