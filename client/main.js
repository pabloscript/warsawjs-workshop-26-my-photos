function fetchPhotos() {
    return fetch('/photos')
    .then(response => response.json());
}

function setup() {
    fetchPhotos()
    .then(photos => {
        addPageHeader();
        render(photos);
        zoomPhoto(photos[0]);
    })
    .catch(error => console.error('Something went wrong: ', error));
}

function addPageHeader() {
    const $area = document.querySelector('#app');
    const $pageHeaderWrapper = document.createElement('div');
    const $pageHeader = document.createElement('h1');

    $pageHeaderWrapper.classList.add('page-header');
    $pageHeader.innerText = 'Welcome to my Photo Gallery';
    $pageHeaderWrapper.appendChild($pageHeader);
    $area.appendChild($pageHeaderWrapper);
}

function render(photos) {
    const $area = document.querySelector('#app');
    const $imgThumbnailWrapper = document.createElement('div');

    $imgThumbnailWrapper.classList.add('col-md-12');
    $area.appendChild($imgThumbnailWrapper);

    photos.forEach(photo => {
        const $img = document.createElement('img');
        $img.setAttribute('src', photo.thumb);
        $imgThumbnailWrapper.classList.add('thumbnail');
        $img.addEventListener('click', () => zoomPhoto(photo));
        $imgThumbnailWrapper.appendChild($img);
    });
}

function removeElement(sel) {
    const $element = document.querySelector(sel);

    if ($element) {
        $element.remove();
    }
}

function zoomPhoto(photo) {
    removeElement('.full');

    const $area = document.querySelector('#app');
    const $imgLargeWrapper = document.createElement('div');
    const $imgLarge = document.createElement('img');

    $imgLargeWrapper.classList.add('col-md-12');
    $imgLarge.setAttribute('src', photo.image);
    $imgLarge.classList.add('full', 'img-responsive', 'center-block');
    $imgLargeWrapper.appendChild($imgLarge);
    $area.appendChild($imgLargeWrapper);

    displayPhotoDetails(photo);
}

function displayPhotoDetails(photo) {
    const template = `
        <div class="col-md-12">
            <p class="lead">${photo.author} ${photo.title ? `- ${photo.title}` : ''}</p>
            <p><mark>${photo.tags.map(el => `#${el}`).join(', ')}</mark></p>            
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
