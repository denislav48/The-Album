import { elements } from './base'
import { controlSearch } from '../index'
import { writeNewPost } from '../models/Upload';

export const events = () => {
    //Serach by title on Enter
    elements.searchInput.addEventListener('keyup', event => {
        event.stopPropagation();
        console.log(event.keyCode);
        if (event.keyCode === 13) {
            elements.serachButton.click();
        }
    });

    //Search by category
    elements.searchCategory.addEventListener('change', e => {
        e.preventDefault();
        elements.searchResPages.innerHTML = '';
        elements.paginationNavigation.innerHTML = '';
        controlSearch();
    });

    //Search by title
    let val;
    elements.serachButton.addEventListener('click', e => {
        e.preventDefault();
        elements.searchResPages.innerHTML = '';
        elements.paginationNavigation.innerHTML = '';
        val = elements.searchInput.value;
        controlSearch(undefined, val);
        elements.searchInput.value = '';
    });

    //Upload COntroller

    elements.uploadFormPost.addEventListener('click', () => {
        let title = elements.uploadFormTitle.value,
            user = elements.uploadFormUserName.value,
            category = elements.uploadFormSelect.value;
        if (title && user && category) {
            writeNewPost(title, user, category);
            elements.uploadFormUserName.value = '';
            elements.uploadFormTitle.value = '';
            elements.uploadFormUploadFile.value = '';
            elements.uploadFormSelect.value = '';
        } else {
            alert('Missing field!');
        }
    });

    //Form controls
    elements.uploadPhotoButton.addEventListener('click', () => {
        elements.uploadForm.style.display = 'block';
        elements.uploadPhotoButton.style.display = 'none';
    });

    elements.closeForm.addEventListener('click', () => {
        elements.uploadForm.style.display = 'none';
        elements.uploadFormUserName.value = '';
        elements.uploadFormTitle.value = '';
        elements.uploadFormSelect.value = 'choose';
        elements.uploadPhotoButton.style.display = 'block';
    });

    elements.formUploadButton.addEventListener('click', () => {
        elements.popupForm.style.display = 'none';
        elements.uploadPhotoButton.style.display = 'block';
    })

    //Pagination Control
    let currenPage,
        lastPage;
    elements.navButtons.addEventListener('click', (e) => {
        if (e.target.classList.contains('pagination-button')) {
            let page = e.target.value;
            currenPage = page;
            let activeEl = document.querySelectorAll('.nav-buttons button');
            console.log(activeEl);

            activeEl.forEach(el => {
                el.classList.remove('active');
                event.target.classList.add('active');
            });

            //Check for page change
            if (lastPage !== currenPage) {
                lastPage = currenPage;
                elements.searchResPages.innerHTML = '';
                controlSearch(page,val);
            }
        }
    });

    //Change Upload a photo button appearance on hover

    elements.uploadPhotoButton.addEventListener('mouseover', (ev) => {
        ev.target.innerHTML = "Click me";
    });
    elements.uploadPhotoButton.addEventListener('mouseout', (ev) => {
        ev.target.innerHTML = "Upload a photo";
    });
}
