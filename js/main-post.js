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

postList = document.getElementsByClassName('main-post-item');
// postList = Array.prototype.slice.call(postList);
for (let post of postList) {
	// process slide images
	let postId = post.id;
	let btnPrev = post.getElementsByClassName('btnPrev')[0];
	let btnNext = post.getElementsByClassName('btnNext')[0];
	// btnPrev.addEventListener('click', showImg(postId, -1));
	// btnNext.addEventListener('click', showImg(postId, 1));
	let imgList = post.getElementsByClassName('post-img');
	let toolbar = post.getElementsByClassName('toolbar-center')[0];
	for (let i = 0; i < imgList.length; i++) {
		imgList[i].style.display = 'none';
		toolbar.innerHTML = toolbar.innerHTML + tmpIcon;
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
}


postHandler.map((post) => {
	showImg(post.id, 0);
});

