const filterButton = document.querySelector("#filters")

const filters = document.querySelector(".filters")

const instance = Popper.createPopper(filterButton, filters, {
    placement: 'bottom',
    modifiers: [
        {
            name: 'offset',
            options: {
                offset: [0,8]
            }
        }
    ]
})

let closed = true;


filterButton.addEventListener('click', () => {
    if(closed) {
        filters.setAttribute('data-show', '');

    instance.setOptions((options) => ({
        ...options,
        modifiers: [
            ...options.modifiers,
            { name: 'eventListeners', enabled: true },
        ],
        }));

    instance.update();
    } else {
        filters.removeAttribute('data-show');

        instance.setOptions((options) => ({
            ...options,
            modifiers: [
              ...options.modifiers,
              { name: 'eventListeners', enabled: false },
            ],
        }));
    }
    closed = !closed;
})

