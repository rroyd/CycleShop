let closed = false;
let closing = false;

function toggleFilters() {
    if(!closing) {
        const filters = document.querySelector(".filters");
    
        filters.classList.toggle("hide")
        closed = !closed;
        closing = true;
        if(closed) {
            setTimeout(() => {
                filters.style.display = closed ? "none" : ''
                closing = false;
            }, 500)
        }
        else {
            filters.style.display = closed ? "none" : ''
            closing = false;
        }
    
    }
}