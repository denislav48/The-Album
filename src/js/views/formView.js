import {elements} from './base';

elements.uploadPhotoButton.addEventListener('click', () => {
    elements.popupForm.style.display = 'block';
});
elements.closeForm.addEventListener('click', () => {
    elements.popupForm.style.display = 'none';
});
