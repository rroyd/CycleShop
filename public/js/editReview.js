const editReviewBtns = document.querySelectorAll("#editReview");

const reviews = document.querySelectorAll(".cs-review");

const editForm = document.querySelectorAll(".cs-edit-form")

const deleteReviewBtns = document.querySelectorAll(".cs-delete-review")

let isEditing = false;

editReviewBtns.forEach((reviewBtn, i) => {
    reviewBtn.addEventListener('click',() => {
        if(!isEditing) {
            isEditing = true;
            const reviewBody = editForm[i].textContent.trim();

            const previous = editForm[i].innerHTML;
            editForm[i].innerHTML = '';

            currentEditedInput = document.createElement("input");
            currentEditedInput.value = reviewBody;
            currentEditedInput.classList.add("form-control");
            currentEditedInput.setAttribute("name", "review[body]");

            const confirmBtn = document.createElement("button");
            confirmBtn.classList.add("btn", "btn-success");
            confirmBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
</svg>`;

            const cancelBtn = document.createElement("button");
            cancelBtn.classList.add("btn", "btn-danger");
            cancelBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
</svg>`;

            editForm[i].append(currentEditedInput, confirmBtn, cancelBtn); 

            editReviewListeners(cancelBtn, editForm[i], previous);

            currentEditedInput.focus();
        }
    });
});

function editReviewListeners(cancelBtn, review, previous) {
    cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();

        review.innerHTML = previous;

        isEditing = false;
        currentEditedInput = null;
    })
}

deleteReviewBtns.forEach(deleteReviewBtn => {
    deleteReviewBtn.addEventListener("click", function () {
        this.parentElement.submit();
    })
})