
// DOM utility functions:

const el = (sel, par) => (par || document).querySelector(sel);
const newEl = (tag, props) => Object.assign(document.createElement(tag), props);


// Preview images before upload:

const elFiles = el("#formFileMultiple");
const elPreview = el("#preview");

const previewImages = (props) => {
    const images = newEl("img", props);
    images.classList.add('card-img-top')
    return images;
}

const createCardBody = (text) => {
    const cardBody = newEl('div', {});
    cardBody.classList.add('card-body');
    const cardText = document.createElement('p');
    cardText.classList.add('card-text', 'text-truncate');
    cardText.innerText = text;
    cardBody.append(cardText)
    return cardBody;
}

const createCard = (props, text) => {
    const card = document.createElement('div');
    card.classList.add('card', 'w-25');
    card.append(previewImages(props));
    card.append(createCardBody(text));
    elPreview.append(card)
}

const reader = (file, method = "readAsDataURL") => new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve({ file, result: fr.result });
    fr.onerror = (err) => reject(err);
    fr[method](file);
});

const previewCards = async (files) => {
    // Remove existing preview images
    elPreview.innerHTML = "";

    let filesData = [];

    try {
        // Read all files. Return Array of Promises
        const readerPromises = files.map((file) => reader(file));
        filesData = await Promise.all(readerPromises);
    } catch (err) {
        // Notify the user that something went wrong.
        elPreview.textContent = "An error occurred while loading images. Try again.";
        // In this specific case Promise.all() might be preferred over
        // Promise.allSettled(), since it isn't trivial to modify a FileList
        // to a subset of files of what the user initially selected.
        // Therefore, let's just stash the entire operation.
        console.error(err);
        return;
    }

    // All OK. Preview images:
    filesData.forEach(data => {
        createCard({
            src: data.result, // Base64 String
            alt: data.file.name// File.name String
        }, data.file.name)
    });
};

elFiles.addEventListener("change", (ev) => {
    if (!ev.currentTarget.files) return; // Do nothing.
    previewCards([...ev.currentTarget.files]);
});