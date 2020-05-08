let postList = [];
let postHandler = [];
let tmpIcon = '<i class="fas fa-circle toolbar-iconImg"></i>';

const showImg = (postId, idx) => {
	let post = postHandler.find((x) => {
		return x.id === postId;
	});
	if (post !== undefined) {
		let changeImg = post.curImg + idx;
		post.imgList[post.curImg-1].style.display = 'none';
		post.imgList[changeImg-1].style.display = 'block';
		if (changeImg === post.countImg) {
			// hide next button
			post.next.style.visibility = 'hidden';
		}
		else if (changeImg === 1) {
			// hide prev button
			post.prev.style.visibility = 'hidden';
		}
		else if (changeImg === post.countImg-1) {
			post.next.style.visibility = 'visible';
		}
		else if (changeImg === 2) {
			post.prev.style.visibility = 'visible';
		}
		let toolbarIconImg =  post.toolbarCenter.getElementsByClassName('toolbar-iconImg');
		toolbarIconImg[post.curImg-1].style.color = '#ABABAB';
		post.curImg = changeImg;
		toolbarIconImg[post.curImg-1].style.color = '#0095F6';
	}
	else {
		console.log('err');
	}
}

const autoExpandTextArea = (event) => {
	let post = event.currentTarget.post;
	let element = event.currentTarget.element;
	if (post !== undefined) {
		element.style.height = '18px';
	    element.style.height = element.scrollHeight + 'px';
	    let value = element.value.trim();
	    let btnSubmit = post.getElementsByClassName('commentSubmit')[0];
	    if (value.length === 0) {
	    	btnSubmit.setAttribute('disabled', '');
	    }
	    else {
	    	btnSubmit.removeAttribute('disabled');
	    }
	}
}

const removeLike = (element) => {
	element.setAttribute('action-label', 'unlike');
	element.classList.add('far');
	element.classList.remove('fas');
	element.style.animation = 'scalingLikeBtn .5s forwards';
	setTimeout(() => {
		element.style.animation = 'none';
	}, 500);
}

const addLike = (element) => {
	element.setAttribute('action-label', 'like');
	element.classList.add('fas');
	element.classList.remove('far');
	element.style.animation = 'scalingLikeBtn .5s forwards';
	setTimeout(() => {
		element.style.animation = 'none';
	}, 500);
}

const likeHandler = (event) => {
	let element = event.currentTarget.element;
	let action = element.getAttribute('action-label');
	if (action === 'like' && element.classList.contains('fas')) {
		removeLike(element);
	}
	else if (element.classList.contains('far')) {
		addLike(element);
	}
}

const animateOverlay = (element) => {
	let overlay = element.getElementsByClassName('post-overlay-icon')[0];
	overlay.style.visibility = 'visible';
	let icon = overlay.getElementsByTagName('i')[0];
	icon.style.animation = 'scalingInOverlay .5s ease-in-out';
	setTimeout(() => {
		icon.style.animation = 'scalingOutOverlay 1s ease-in-out';
	}, 450);
	setTimeout(() => {
		overlay.style.visibility = 'hidden';
		icon.style.animation = 'none';
	}, 1500);
}

const openModalMore = (event) => {
	let modal = event.currentTarget.modal;
	modal.style.visibility = 'visible';
	modal.style.animation = 'fadeInModal .2s forwards';
	let body = document.getElementsByTagName("body")[0];
	body.style.overflow = 'hidden';
}

const closeModal = (event) => {
	let target = event.target;
	if (target.classList.contains('main-modal-more') || target.classList.contains('modal-close')) {
		let modal = event.currentTarget.modal;
		modal.style.visibility = 'hidden';
		modal.style.animation = 'none';
		let body = document.getElementsByTagName("body")[0];
		body.setAttribute('style', '');
	}
}

postList = document.getElementsByClassName('main-post-item');

for (let post of postList) {
	// process slide images
	let postId = post.id;
	let btnPrev = post.getElementsByClassName('btnPrev')[0];
	let btnNext = post.getElementsByClassName('btnNext')[0];

	let imgList = post.getElementsByClassName('post-img');
	let toolbar = post.getElementsByClassName('toolbar-center')[0];

	// process like animation
	let likeBtn = post.getElementsByClassName('btnLike');
	for (let btn of likeBtn) {
		btn.addEventListener('click', likeHandler);
		btn.element = btn;
	}

	for (let img of imgList) {
		img.style.display = 'none';
		toolbar.innerHTML = toolbar.innerHTML + tmpIcon;
		img.addEventListener('dblclick', () => {
			addLike(likeBtn[0]);
			animateOverlay(img.parentElement);
		});
	}

	postHandler.push({
		id: postId,
		curImg: 1,
		imgList: imgList,
		toolbarCenter: toolbar,
		countImg: imgList.length,
		prev: btnPrev,
		next: btnNext
	});
	// process comment
	let textArea = post.getElementsByClassName('commentText')[0];
	textArea.addEventListener('input', autoExpandTextArea);
	textArea.post = post;
	textArea.element = textArea;

	// post more option
	let modalMore = post.getElementsByClassName('main-modal-more')[0];
	modalMore.addEventListener('click', closeModal);
	modalMore.modal = modalMore;
	let moreBtn = post.getElementsByClassName('post-more')[0];
	moreBtn.addEventListener('click', openModalMore);
	moreBtn.modal = modalMore;
}


postHandler.map((post) => {
	showImg(post.id, 0);
});