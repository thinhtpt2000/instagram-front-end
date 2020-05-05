let btnPrev = document.getElementById('story-prev');
let btnNext = document.getElementById('story-next');
let listItem = document.getElementsByClassName('story-item-list')[0];
let width = listItem.offsetWidth;

const goNext = () => {
	let pos = 0;
	let idScroll = setInterval(scrollNextAnimation, 10);
	function scrollNextAnimation() {
		if (pos >= width) {
	      	clearInterval(idScroll);
	      	let scrollPosition = Math.ceil(width + listItem.scrollLeft);
	      	if (isRight(scrollPosition)) {
	      		btnNext.style.visibility = 'hidden';
	      	}
	      	if (btnPrev.style.visibility === 'hidden') {
	      		btnPrev.style.visibility = 'visible';
			}
	    } else {
	    	pos += 50; 
	      	listItem.scrollBy({
				top: 0,
		  		left: 50,
		  		behavior: 'smooth'
			});
	    }
	}
	function isRight(pos) {
		let realWidth = listItem.scrollWidth;
		return (realWidth - pos) / pos === 0;
	}
}

const goPrev = () => {
	let pos = 0;
	let idScroll = setInterval(scrollPrevAnimation, 10);
	function scrollPrevAnimation() {
		if (pos >= listItem.offsetWidth) {
	      	clearInterval(idScroll);
	      	if (listItem.scrollLeft === 0) {
    			btnPrev.style.visibility = 'hidden';
			}
			if (btnNext.style.visibility === 'hidden') {
	      		btnNext.style.visibility = 'visible';
			}
	    } else {
	    	pos += 50; 
	      	listItem.scrollBy({
				top: 0,
		  		left: -50,
		  		behavior: 'smooth'
			});
	    }
	}
}

btnPrev.addEventListener('click', goPrev);
btnNext.addEventListener('click', goNext);


const checkInit = () => {
	if (listItem.scrollLeft === 0) {
    	btnPrev.style.visibility = 'hidden';
	}
}

checkInit();