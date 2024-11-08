/* 
    This file should contain definitions for deleteRestaurantCard,
    and js to attach it as a handler per card.
*/

/*

    @eventListener DOMContentLoaded
        Add event listener to all the delete buttons on the page.
        When clicked, the card should be deleted from the database.

*/
document.addEventListener('DOMContentLoaded', ()=>{
    const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', ()=> {
            const restaurantCard = button.closest('.card');
            deleteRestaurantCard(restaurantCard); 
        });
    });
});

/*
    @function deleteRestaurantCard
        This function should delete a restaurant card from the database
        and reload the page to reflect the changes.
*/
const deleteRestaurantCard = (restaurantCard)=>{
    const id = restaurantCard.dataset.id;
    fetch(`/api/restaurants/${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            //Reload the page to reflect the changes
            window.location.reload();
        } else {
            console.error(`Failed to delete restaurant with ID ${id}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}