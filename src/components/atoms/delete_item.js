export const deleteItem = (inputVal) => {
    return `
        <button type="button" id="${inputVal}" class="delete-item">
            <i class="material-icons">close</i>
        </button>
    `
}