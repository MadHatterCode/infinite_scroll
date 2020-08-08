const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;

// Unsplash API
let initialCount = 5;
const apiKey = "gm9ky3rFBMS13n1Ab42FVmVAFoQVF4Mk9hFnnH_-JPs";
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialCount}`;

function updateInitilAPIImageCount(picCount) {
	apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

// Check if all images were loaded
function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
		count = 30;
	}
}

// Helper Function
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

// Create Elemnts for links and photos, add to DOM
function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.length;
	// Run function for each object in photosArray
	photosArray.forEach((photo) => {
		// Create <a> to link to Unsplash
		const item = document.createElement("a");
		setAttributes(item, {
			href: photo.links.html,
			target: "_blank",
		});
		// create <img> for photo
		const img = document.createElement("img");
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});
		// Event Listener, check when each is finished loading
		img.addEventListener("load", imageLoaded);
		// Put <img> inside <a>, then put both inside imageContainer
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

// Get photos from Unsplash API
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
		if (isInitialLoad) {
			updateInitilAPIImageCount(30);
			isInitialLoad = false;
		}
	} catch (error) {
		// Catch error here
	}
}

// Check to see if scrtolling near bottom of the page, Load More Photos
window.addEventListener("scroll", () => {
	if (
		window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		getPhotos();
	}
});

// On Load
getPhotos();
