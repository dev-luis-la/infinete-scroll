const imgContainer = document.getElementById('image-container');
let ready = false;
let imagesLoaded = 0;
let totalImgs = 0;
let photosArray = [];
//https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
const count = 30;
const apiKey ='M61pdUhfiE8Yxh5Z2Ak3viBPbXyP0l6oZAQz1Zi9mBs';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImgs){
        ready = true;
    }
}

function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos(){
    imagesLoaded = 0;
    totalImgs = photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank'
        })
        const img = document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        img.addEventListener('load', imageLoaded)
        item.appendChild(img);
        imgContainer.appendChild(item);

    });
}

 async function getPhotos(){
     try{
        const response = await fetch(apiUrl);
         photosArray = await response.json();
         displayPhotos();
     }catch(err){
        console.log(err);
     }
 }

 window.addEventListener('scroll', () =>{
     if(window.innerHeight + window.scrollY >= document.body.offsetHeight -
        1000 && ready){
            ready = false;
            getPhotos();
        }
 })

 getPhotos();