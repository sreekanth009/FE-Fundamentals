export const deleteItem = (inputVal) => {
    return `
        <button type="button" id="${inputVal}" class="delete-item">
            Remove
        </button>
    `
}

export const paragraphText = (inputVal) => {
    return `
        <p>${inputVal}</p>
    `
}

{/* <i class="material-icons">close</i> */}