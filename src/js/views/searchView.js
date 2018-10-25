import { elements } from './base';

export const getInput = () => elements.searchCategory.value;

const renderPhoto = photo => {
    const markup = `
        <div>
       
        
                    <img src="https://www.w3schools.com/images/w3schools_green.jpg" alt="${photo.mainCategory}">
          
               
        </div>
    `;
    elements.searchResPages.insertAdjacentHTML('beforeend', markup);
};
export const renderResults = recipes => {
    recipes.forEach(renderPhoto);
} 
