import { elements } from './base'
import { controlSearch } from '../index'
import { writeNewPost } from '../models/Upload';

export const events = () => {
    //Search by title
    let val;
    elements.serachButton.addEventListener('click', e => {
        elements.searchResPages.innerHTML = '';
        elements.navButtons.innerHTML = '';
        val = elements.searchInput.value;
        controlSearch(undefined, val);
        elements.searchInput.value = '';
    });

    //Serach by title on Enter
    elements.searchInput.addEventListener('keyup', event => {
        //prevent bubbling
        event.stopPropagation();
        console.log(event.keyCode);
        if (event.keyCode === 13) {
            elements.serachButton.click();
        }
    });

    //Search by category
    elements.searchCategory.addEventListener('change', e => {
        //prevent page reload
        e.preventDefault();
        elements.searchResPages.innerHTML = '';
        elements.navButtons.innerHTML = '';
        controlSearch();
    });

    //Upload Controller
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
        lastPage,
        lastResult,
        currentResult;
    elements.navButtons.addEventListener('click', (e) => {
        if (e.target.classList.contains('pagination-button')) {

            let page = e.target.value;
            currenPage = page;
            let buttons = document.querySelectorAll('.nav-buttons button');
            currentResult = document.querySelector('.results_Photos').innerHTML;
            
            buttons.forEach(el => {
                el.classList.remove('active');
                event.target.classList.add('active');
            });

           /* Check if the page was changed in the same category or if the category was changed.
            * Without the last condition if we change category and try to load immediately 
            *the same page number nothing will happen.
            */
            if (lastPage !== currenPage || lastResult !== currentResult) {
                lastPage = currenPage;
                elements.searchResPages.innerHTML = '';

                //get the content after it is rendered
                new Promise(() => controlSearch(page)).then(() => {
                    lastResult = document.querySelector('.results_Photos').innerHTML;
                })
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
