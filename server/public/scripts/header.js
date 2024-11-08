/* 

    @file header.js
        This file should contain js to create the header, nav and footer
        for the website to avoid having to print it in all the html files.

*/

document.addEventListener('DOMContentLoaded', function() {
    //creates the header
    const header = document.querySelector('header');

    header.className = 'header';
    header.innerHTML = `
        <h1>Lorem Ipsum</h1>
    `;
    document.body.prepend(header);

    const nav = document.querySelector('nav');

    nav.className = 'navbar';
    nav.innerHTML = `
        <a href="/">Home</a>
        <a href="/attractions">Attractions</a>
        <a href="/restaurants">Restaurants</a>
        <a href="/new-restaurant">New Restaurants</a>
    `;
    header.after(nav);

    const footer = document.querySelector('footer');
    footer.className = 'footer';
    footer.innerHTML =  `
        <span id="contact">© contact: jtenorio@sfsu.edu</span>
    `;
    document.body.append(footer);
});