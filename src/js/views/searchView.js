import { elements } from './base';

export const getInput = () => elements.searchCategory.value;

// export const clearInput = () => {
//     elements.searchInput.value = '';
// };

// export const clearResults = () => {
//     elements.searchResList.innerHTML = '';
//     elements.searchResPages.innerHTML = '';
// };

// export const highlightSelected = id => {
//     const resultsArr = Array.from(document.querySelectorAll('.results__link'));
//     resultsArr.forEach(el => {
//         el.classList.remove('results__link--active');
//     });
//     document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
// };

// /*
// // 'Pasta with tomato and spinach'
// acc: 0 / acc + cur.length = 5 / newTitle = ['Pasta']
// acc: 5 / acc + cur.length = 9 / newTitle = ['Pasta', 'with']
// acc: 9 / acc + cur.length = 15 / newTitle = ['Pasta', 'with', 'tomato']
// acc: 15 / acc + cur.length = 18 / newTitle = ['Pasta', 'with', 'tomato']
// acc: 18 / acc + cur.length = 24 / newTitle = ['Pasta', 'with', 'tomato']
// */
// export const limitRecipeTitle = (title, limit = 17) => {
//     const newTitle = [];
//     if (title.length > limit) {
//         title.split(' ').reduce((acc, cur) => {
//             if (acc + cur.length <= limit) {
//                 newTitle.push(cur);
//             }
//             return acc + cur.length;
//         }, 0);

//         // return the result
//         return `${newTitle.join(' ')} ...`;
//     }
//     return title;
// }

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
