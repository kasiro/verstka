function getText(event){
	if (event.key === 'Enter'){
		let findtext = $('.SearchInput').val();
		return findtext;
	}
	return false;
}
function searchText(text){
	console.log('text:', text);
}
function touchMenu(){
	$('.sidebar').toggleClass('activeSidebar');
}

var slideNow = 1;
var translateWidth = 0;
var navBtnId = 0;
var slideCount = $('.slide').length;
var slideInterval = 3500;
var previd = null;

function nextSlide() {
	if (previd !== null){
		$('.slide-nav-btn:nth-of-type(' + previd + ')')
			.removeClass('active');
	}
	if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
		$('#slidewrapper').css('transform', 'translate(0, 0)');
		slideNow = 1;
		$('.slide-nav-btn:nth-of-type(' + slideNow + ')')
			.addClass('active');
		previd = slideNow;
	} else {
		translateWidth = -$('#viewport').width() * (slideNow);
		$('#slidewrapper').css({
			'transform': 'translate(' + translateWidth + 'px, 0)',
			'-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
			'-ms-transform': 'translate(' + translateWidth + 'px, 0)',
		});
		slideNow++;
		$('.slide-nav-btn:nth-of-type(' + slideNow + ')')
			.addClass('active');
		previd = slideNow;
	}
}

function prevSlide() {
	if (previd !== null){
		$('.slide-nav-btn:nth-of-type(' + previd + ')')
			.removeClass('active');
	}
    if (slideNow == 1 || slideNow <= 0 || slideNow > slideCount) {
        translateWidth = -$('#viewport').width() * (slideCount - 1);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow = slideCount;
		$('.slide-nav-btn:nth-of-type(' + slideNow + ')')
			.addClass('active');
		previd = slideNow;
    } else {
        translateWidth = -$('#viewport').width() * (slideNow - 2);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow--;
		$('.slide-nav-btn:nth-of-type(' + slideNow + ')')
			.addClass('active');
		previd = slideNow;
    }
}

$(document).ready(() => {
	// switchInterval = setInterval(nextSlide, slideInterval);
	// $('#viewport').hover(() => {
	// 	clearInterval(switchInterval);
	// }, () => {
	// 	switchInterval = setInterval(nextSlide, slideInterval);
	// });
	$('.SearchInput').on('keyup', function (event){
		let text = getText(event);
		if (text !== false){
			searchText(text);
		}
	});
	$('.searhButton').click(() => {
		$('.SearchInput').toggleClass('activeInput');
		$('.searhButton').toggleClass('activeButton');
		let attr = $('.searhButton').find('ion-icon').attr('name');
		if (attr == 'search'){
			$('.searhButton').find('ion-icon').attr('name', 'close');
		} else {
			$('.searhButton').find('ion-icon').attr('name', 'search');
		}
	});
	$('.slide-nav-btn:nth-of-type(' + slideNow + ')')
			.addClass('active');
	previd = 1;
	$('.slide-nav-btn').click(function() {
		let navBtnId = $(this).index();
		if (previd !== null && previd != navBtnId + 1){
			$('.slide-nav-btn:nth-of-type(' + previd + ')')
				.removeClass('active');
		}
		if (navBtnId + 1 != slideNow) {
			let translateWidth = -$('#viewport').width() * (navBtnId);
			$('#slidewrapper').css({
				'transform': 'translate(' + translateWidth + 'px, 0)',
				'-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
				'-ms-transform': 'translate(' + translateWidth + 'px, 0)',
			});
			slideNow = navBtnId + 1;
			$(this).addClass('active');
			previd = navBtnId + 1;
		}
	});
	$('#next-btn').click(() => {
		nextSlide()
	});
	
	$('#prev-btn').click(() => {
		prevSlide()
	});
});

// setTimeout(() => {
// 	$('.headerAnim').addClass('active');
// 	$('.sidebar').addClass('active');
// 	$('.content').addClass('active');
// }, 1000);