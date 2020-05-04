let search = document.getElementsByClassName('header-search')[0];
let cancel = document.getElementsByClassName('header-search-cancel')[0];
let input = document.getElementsByClassName('header-search-input')[0];
let isCancel = false;
const enableSearch = () => {
	if (!search.classList.contains('header-search-active') && !isCancel) {
		search.classList.add('header-search-active');
		input.focus();
	}
	else {
		isCancel = false;
	}
}

const disableSearch = () => {
	if (search.classList.contains('header-search-active')) {
		input.value = '';
		search.classList.remove('header-search-active');
		isCancel = true;
	};
}

search.addEventListener('click', enableSearch);
cancel.addEventListener('click', disableSearch);