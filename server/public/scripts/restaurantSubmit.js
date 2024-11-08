/*

    @file contains the js to handle the form submission for the new restaurant form.

*/

/*

    @function handleSubmit
        This function should handle the form submission event and send the data to the server
        to create a new restaurant.

*/
const handleSubmit = async (event) => {
    event.preventDefault(); 

    // Extract fields from the form, and
    const form = event.target;
    const name = form.querySelector('#name').value;
    const phone = form.querySelector('#phone').value;
    const address = form.querySelector('#address').value;
    const photo = form.querySelector('#image').value;

    const respone = await fetch('/api/restaurants', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name , phone, address, photo})
    });
    
    if(respone.ok){
        const newRestaurant = await respone.json();
        
        window.location.href = `/restaurants/${newRestaurant.id}`;
    }
    else{
        console.error('Failed to create a new restaurant');
    }
};

/*

    @eventListener DOMContentLoaded
        Add event listener to the form for submit events

*/
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if(form){
        form.addEventListener('submit', handleSubmit);
    }
});
