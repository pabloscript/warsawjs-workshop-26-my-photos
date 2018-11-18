function fetchPhotos() {
    return fetch('/photos')
    .then(response => response.json());
}

function setup() {
    fetchPhotos()
    .then(photos => {
        renderGallery(photos);
        showLargePhoto(photos[0]);
    })
    .catch(error => console.error('Something went wrong: ', error));
}

function renderGallery(photos) {
    const $area = document.querySelector('#app');
    photos.forEach(photo => {
        const $img = document.createElement('img');
        $img.setAttribute('src', photo.thumb);
        $img.addEventListener('click', () => showLargePhoto(photo));
        $area.appendChild($img);
    });
}

function removeElement(sel) {
    const $element = document.querySelector(sel);

    if ($element) {
        $element.remove();
    }
}

function showLargePhoto(photo) {
    removeElement('.full');
    const $area = document.querySelector('#app');
    const $imgLarge = document.createElement('img');
    $imgLarge.setAttribute('src', photo.image);
    $imgLarge.classList.add('full');
    $area.appendChild($imgLarge);

    displayPhotoDetails(photo);
}

function displayPhotoDetails(photo) {
    const template = `
        <div>
            <h3>${photo.author}</h3>
            <p>${photo.tags.map(el => `#${el}`).join(', ')}</p>
            <p>${photo.title}</p> 
        </div>
    `;

    removeElement('.details');

    const $area = document.querySelector('#app');
    const $detailsWrapper = document.createElement('div');
    $detailsWrapper.classList.add('details');
    $detailsWrapper.innerHTML = template;
    $area.appendChild($detailsWrapper);
}

document.addEventListener('DOMContentLoaded', setup);
