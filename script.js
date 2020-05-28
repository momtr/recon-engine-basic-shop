/**
 * Script for My Shop
 */

/** API key */
const token = 'YOUR_API_KEY';
let recon;

let selected = 0;

$(document).ready(() => {

    /** set up SDK */
    recon = new ReconClient({ token }, () => {
        console.log('connected...');
    });

    $('.item').on('click', el => {

        /** increment number of selected items */
        selected++;

        /** when an item is clicked, add it to recon */
        recon.addItem(el.target.id);

        /** change properties of item */
        $(`#${el.target.id}`).css('opacity', '0.3');

        /** show recommendations */
        recon.recommendAnonymouslyByStorage(items => {
            console.log(items);
            $('#recommendations').html('');
            for(let item of items) {
                $('#recommendations').append(`<div class="item" id="${item.item}">${item.item}</div>`)
            }
        });
    });

});

function resetUser() {
    recon.trainModel().then(() => {
        Cookies.set('userID', Date.now());
        Cookies.set('items', '');
        window.location.href = '/';
    })
}
