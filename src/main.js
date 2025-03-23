document.addEventListener('DOMContentLoaded', () => {
	fetch('/data.json')
		.then(response => response.json())
		.then(data => {
			/* --- MUSIC SECTION --- */
			let musicContainer = document.getElementById('music-tracks');
			if (musicContainer && data.music && data.music.tracks && data.music.tracks.length > 0) {
				data.music.tracks.forEach(track => {
					let trackCard = document.createElement('div');
					trackCard.className = 'bg-darker rounded-lg overflow-hidden shadow-lg p-6';
					trackCard.innerHTML = `
			  <h3 class="font-bold text-xl mb-2">${track.name}</h3>
			  <p class="text-gray-300 text-sm mb-4">Released: ${track.released}</p>
			`;
					musicContainer.appendChild(trackCard);
				});
			} else {
				// Hide the music section if no tracks
				document.getElementById('music').style.display = 'none';
			}

			/* --- EVENTS SECTION --- */
			let eventsContainer = document.getElementById('events-list');
			if (eventsContainer && data.events && data.events.list && data.events.list.length > 0) {
				data.events.list.forEach(event => {
					let eventCard = document.createElement('div');
					eventCard.className = 'bg-darker rounded-lg overflow-hidden shadow-lg p-6 flex flex-col md:flex-row';
					eventCard.innerHTML = `
			  <div class="md:w-1/5 text-center md:text-left mb-4 md:mb-0">
				<span class="block text-primary text-2xl font-bold">${event.day}</span>
				<span class="block text-gray-300">${event.month}</span>
			  </div>
			  <div class="md:w-3/5 mb-4 md:mb-0">
				<h3 class="font-bold text-xl mb-1">${event.title}</h3>
				<p class="text-gray-300 mb-2">
				  <i class="fas fa-map-marker-alt text-primary mr-2"></i>${event.location}
				</p>
				<p class="text-gray-400 text-sm">${event.description}</p>
			  </div>
			  <div class="md:w-1/5 flex items-center justify-center md:justify-end">
				<a href="#" class="bg-primary hover:bg-opacity-80 text-white py-2 px-4 rounded-full text-sm transition-all transform hover:scale-105">
				  Get Tickets
				</a>
			  </div>
			`;
					eventsContainer.appendChild(eventCard);
				});
			} else {
				document.getElementById('events').style.display = 'none';
			}

			/* --- GALLERY SECTION --- */
			let galleryContainer = document.getElementById('gallery-grid');
			if (galleryContainer && data.gallery && data.gallery.images && data.gallery.images.length > 0) {
				data.gallery.images.forEach(image => {
					let galleryItem = document.createElement('div');
					galleryItem.className = 'gallery-item';
					galleryItem.innerHTML = `<img src="${image.src}" alt="${image.alt}" class="w-full h-full object-cover" loading="lazy" />`;
					galleryContainer.appendChild(galleryItem);
				});
			} else {
				document.getElementById('gallery').style.display = 'none';
			}

			/* --- BOOKING SECTION --- */
			let bookingContainer = document.getElementById('booking-packages');
			let bookingQuote = document.getElementById('booking-quote');
			if (bookingContainer && data.booking && data.booking.packages && data.booking.packages.length > 0) {
				data.booking.packages.forEach(pkg => {
					let pkgCard = document.createElement('div');
					pkgCard.className = 'bg-dark rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform';
					// Choose a background color based on package type (you can adjust as needed)
					let bgColor = pkg.type === 'Festival Performance' ? 'bg-secondary' : 'bg-primary';
					pkgCard.innerHTML = `
			  <div class="${bgColor} py-4 text-center">
				<h3 class="font-bold text-xl text-white">${pkg.type}</h3>
			  </div>
			  <div class="p-6">
				<div class="text-center mb-6">
				  <span class="text-4xl font-bold">${pkg.price}</span>
				  <span class="text-gray-400 block mt-1">Starting at</span>
				</div>
				<ul class="space-y-3 mb-8">
				  ${pkg.details.map(item => `<li class="flex items-start">
					<i class="fas fa-check text-primary mt-1 mr-3"></i>
					<span>${item}</span>
				  </li>`).join('')}
				</ul>
				<a href="#contact" class="block w-full ${bgColor} hover:bg-opacity-80 text-white text-center py-3 rounded-full transition-all transform hover:scale-105">
				  Inquire Now
				</a>
			  </div>
			`;
					bookingContainer.appendChild(pkgCard);
				});
				if (data.booking.customQuoteText) {
					bookingQuote.textContent = data.booking.customQuoteText;
				}
			} else {
				document.getElementById('booking').style.display = 'none';
			}

			/* --- CONTACT SECTION --- */
			let contactInfo = document.getElementById('contact-info');
			let contactSocial = document.getElementById('contact-social');
			if (contactInfo && data.contact && data.contact.info) {
				contactInfo.innerHTML = `
			<div class="flex items-start">
			  <div class="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
				<i class="fas fa-envelope text-primary"></i>
			  </div>
			  <div>
				<h4 class="font-medium">Email</h4>
				<p class="text-gray-300">${data.contact.info.email}</p>
			  </div>
			</div>
			<div class="flex items-start mt-4">
			  <div class="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
				<i class="fas fa-phone text-primary"></i>
			  </div>
			  <div>
				<h4 class="font-medium">Management</h4>
				<p class="text-gray-300">${data.contact.info.management}</p>
			  </div>
			</div>
			<div class="flex items-start mt-4">
			  <div class="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
				<i class="fas fa-map-marker-alt text-primary"></i>
			  </div>
			  <div>
				<h4 class="font-medium">Based In</h4>
				<p class="text-gray-300">${data.contact.info.location}</p>
			  </div>
			</div>
		  `;
			}
			if (contactSocial && data.contact && data.contact.social) {
				contactSocial.innerHTML = Object.entries(data.contact.social)
					.map(([key, url]) => {
						// You can use font-awesome class names based on the social network name
						return `<a href="${url}" target="_blank" class="bg-primary bg-opacity-10 hover:bg-opacity-20 p-3 rounded-full transition-all">
						<i class="fab fa-${key} text-primary text-xl"></i>
					  </a>`;
					})
					.join('');
			}
			// Hide the entire contact section if no info exists
			if (!(data.contact && data.contact.info)) {
				document.getElementById('contact').style.display = 'none';
			}
		})
		.catch(err => console.error('Error loading data:', err));
});
