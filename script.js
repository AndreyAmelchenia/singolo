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
        template += `<p class = "p_first" >Name: ${this.name}</p>`
        template += `<p class = "p_first" >email: ${this.email}</p>`
        if (this.subject){
            template += `<p class = "p_first" >Subject: ${this.subject}.</p>`
        } else {
            template += `<p class = "p_first" >Without subject.</p>`
        }
        if (this.cont_text){
           template += `<textarea class = "get-a-quote__form__modal" name="text" readonly>Subject: ${this.cont_text}.</textarea>` 
        } else {
           template += `<textarea class = "get-a-quote__form__modal" >Without description.</textarea>`
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
        this.modal = this.createNode(this.modal, 'div','get-a-quote__modal');
        this.modalContent =this.createNode(this.modalContent, 'div','get-a-quote__content');
        this.modalBtn = this.createNode(this.modalBtn, 'button', 'get-a-quote__form__button');
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
            document.querySelector(".get-a-quote__form__detail").value = '';
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


//headerList
const header = document.querySelector('.header__list');
const headerListClass = 'header__list__item';
const headerList = document.querySelectorAll('.header__list__item');
const headerLinks = document.querySelectorAll('.header__list a');
const headerListClassMod = 'header__list__item_mod';
const bottomSize = 'bottom_size';
//portTagsList
const portTags = document.querySelector('.portfolio__list');
const portTagsListClass = 'portfolio__link';
const portTagsList = document.querySelectorAll('.portfolio__link');
const portTagsListClassMod = 'portfolio__link_color';



let port_arr = [];
const portImgList = document.querySelectorAll('.portfolio__image');



const sections = document.querySelectorAll('section');


window.onload = function() {
    addElementScroll(headerList, headerLinks, headerListClassMod);
    addClick();
    addImgPortDataId();
    addElemClickHandler(header, headerListClass, headerList, headerListClassMod);
    addElemClickHandler(portTags, portTagsListClass, portTagsList, portTagsListClassMod);
    elemScrollHandler(header);
    elemScrollHandler(portTags);
    
    addElemClickHandlerSort(portTags, portTagsListClass, portTagsList)
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
let left_arr = [0,900];
let poz_left = left;
let poz_right = right;
const color = ['#648BF0','#f06c64'];
const slider_first = document.querySelector('.slider-block__slider__first');
const slider_second = document.querySelector('.slider-block__slider__second');
const chek_right = document.querySelector("body > section.slider-block > div > div:nth-child(3) > a");
let back_start = document.querySelector("body > section.slider-block");
let back = document.querySelectorAll("body > section.slider-block");
const chek_left = document.querySelector("body > section.slider-block > div > div:nth-child(1) > a");
chek_left.addEventListener('click', () => {
    let l1 = -left_arr[0];
    let l2 = left_arr[0]-1800;
    let interval = setInterval(() => {
        back.forEach((item) =>{
            let deg = 90;
            item.style.background = `linear-gradient(${deg}deg, ${color[0]} ${poz_left}%, ${color[1]} ${poz_right}%)`;
            slider_first.style.left = `${l1}px`;
            slider_second.style.left = `${l2}px`;
            if (poz_left === 100){
                left_arr = left_arr.reverse();
                color.reverse();
                poz_left = left;
                poz_right = right;
                clearInterval(interval);
                return ;
            }
            l2= l2+900/240;
            l1= l1+900/240;
            poz_right+=0.5  ;
            poz_left+=0.5;
        })
    }, 3)
})

chek_right.addEventListener('click', () => {
    let l1 = left_arr[0];
    let l2 = -left_arr[0];
    let interval = setInterval(() => { 
        back.forEach((item) =>{
            let deg = -90;
            item.style.background = `linear-gradient(${deg}deg, ${color[0]} ${poz_left}%, ${color[1]} ${poz_right}%)`;
            slider_first.style.left = `${l1}px`;
            slider_second.style.left = `${l2}px`;
            if (poz_left === 100){
                left_arr = left_arr.reverse();
                color.reverse();
                poz_left = left;
                poz_right = right;
                clearInterval(interval);
                return ;
            }
            l2= l2-900/240;
            l1= l1-900/240;
            poz_right+=0.5  ;
            poz_left+=0.5;
        })
    }, 3)
})
//DISPLAY none
let dis_vert = document.querySelector('.slider-block__vertical');
dis_vert.addEventListener(('click'), () => {
    if(document.querySelector('.slider-block__vertical__body img').style.display === "none" ){
        document.querySelector('.slider-block__vertical__body img').style.display = '';
    }
    else{ 
        document.querySelector('.slider-block__vertical__body img').style.display = 'none'
    }
})

let dis_hor = document.querySelector('.slider-block__horizontal');
dis_hor.addEventListener(('click'), () => {
    if(document.querySelector('.slider-block__horizontal__body img').style.display === "none" ){
        document.querySelector('.slider-block__horizontal__body img').style.display = '';
    }
    else{ 
        document.querySelector('.slider-block__horizontal__body img').style.display = 'none'
    }
})


//sort



const addImgPortDataId = () => {
    let i = 1; 
    portImgList.forEach(elem => {elem.setAttribute('data-id', i); i++})
}

const addElemClickHandlerSort = (elem, elemClass, arr) => {
    elem.addEventListener('click', (event) => {
        if (event.target.classList.contains(elemClass)) {
            port_arr = [];
            portImgList.forEach(elem => elem.style.order = '');
            portImgList.forEach(elem => port_arr.push(elem.dataset['id']));
            switch(event.target){
                case arr[0]:
                    portImgList.forEach(
                        (item)=>{
                            item.style.order = item.dataset["id"];
                    }) 
                break;
                case arr[1]:
                    port_arr.sort((a, b) => a - b ).reverse();
                    for (let i = 0 ; i < port_arr.length; i++){
                        portImgList[i].style.order = port_arr[i];
                    }
                break;
                case arr[2]:
                    p_3 = port_arr.splice(4,4);
                    portImgList.forEach((item) => {
                        for (let i=0 ; i<p_3.length; i++){
                            if(item.dataset["id"] === p_3[i]){
                                item.style.order = '-1';
                            }
                        }
                    })
                break;
                case arr[3]:
                    let p_4 =  port_arr.splice(4);
                    portImgList.forEach((item) => {
                        for (let i=0 ; i<p_4.length; i++){
                            if(item.dataset["id"] === p_4[i] ){
                                item.style.order = '-1';
                            }
                        }
                    })   
                break;
            }
        }
    })
}
// activ Img
let port_img = document.querySelector('.portfolio__images');
let port_imgs = document.querySelector('.portfolio__images').querySelectorAll('img');
port_imgs.forEach((el) => {
    el.addEventListener('click', (event) =>  {
        port_imgs.forEach(el => el.id = '');
        event.target.id='portfolio__image_activ';
    } )
} )

const addClick = () =>{
    document.querySelector('.get-a-quote__form__button').addEventListener('click', (event) =>{
        event.preventDefault();
        generateModal();
    })
}
 
const generateModal = () => {
    let name = document.querySelector(".get-a-quote__form > input:nth-child(1)").value;
    let email = document.querySelector(".get-a-quote__form > input:nth-child(2)").value;
    let subject = document.querySelector(".get-a-quote__form > input:nth-child(3)").value;
    let cont_text = document.querySelector(".get-a-quote__form__detail").value;
    if(name && (email.indexOf('@') > 0)){
        let content = new ContentModal(name, email, subject, cont_text);
        renderModal(content.generateContent());
    }
}

const renderModal = (content) =>{
    let modal = new Modal('get-a-quote__overlay');
    modal.buildModal(content);
}
