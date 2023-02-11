//code for slider section 

const prevBtn = document.querySelector('.left-btn');
const nextBtn = document.querySelector('.right-btn');
const track = document.querySelector('.slider-track');
const banners = Array.from(track.getElementsByTagName('li'));
const slideIndicator_div = document.querySelector('.slide-indicator');
const sliceIndicators = slideIndicator_div.getElementsByTagName('div');

const slideWidth = document.querySelector('.current-slide').getBoundingClientRect().width;

function setSlidePosition(slide, index) {
    slide.style.left = `${slideWidth * index}px`;
}

banners.forEach(setSlidePosition);

function moveSlide(slideContainer, currentSlide, targetSlide) {
    slideContainer.style.transform = `translateX(-${targetSlide.style.left})`
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}


nextBtn.addEventListener('click', () => {
    const currentSlide = document.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    if (nextSlide == null) return;
    moveSlide(track, currentSlide, nextSlide);
    changeSlideIndicator(banners.indexOf(nextSlide), banners.indexOf(currentSlide));
})

prevBtn.addEventListener('click', () => {
    const currentSlide = document.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    if (prevSlide == null) return;
    moveSlide(track, currentSlide, prevSlide);

    changeSlideIndicator(banners.indexOf(prevSlide), banners.indexOf(currentSlide));
})

function changeSlideIndicator(indexOfCurrentSlide, indexOfPrevSlide) {
    sliceIndicators[indexOfPrevSlide].removeAttribute('id');
    sliceIndicators[indexOfPrevSlide].textContent = '';
    sliceIndicators[indexOfCurrentSlide].setAttribute('id', 'current-indicator');
    sliceIndicators[indexOfCurrentSlide].textContent = `${indexOfCurrentSlide + 1}/${sliceIndicators.length}`;
}

// end 

//js for slider catalogue
const prevBtns_catalogue = document.querySelectorAll('.left-controls');
const nextBtns_catalogue = document.querySelectorAll('.right-controls');

const prevBtn_popularCakse_catalogue = prevBtns_catalogue[0];
const nextBtn_popularCakse_catalogue = nextBtns_catalogue[0];

const prevBtn_photoCakse_catalogue = prevBtns_catalogue[1];
const nextBtn_photoCakse_catalogue = nextBtns_catalogue[1];

const popularCake_catalogue = document.querySelector('#popularCakes-catalogue');
const photoCake_catalogue = document.querySelector('#photoCakes-catalogue');

const catalogue_container_width = document.querySelector(".catalogue-container").offsetWidth;
const individualCards_width = popularCake_catalogue.firstElementChild.getBoundingClientRect().width; //same width of both catalogue cards

const numOfCardsVisible = Math.floor(catalogue_container_width / individualCards_width);

class slider {
    constructor(cards, numOfCardsVisible, prevBtn, nextBtn) {
        this.cards = cards
        this.startIndex = 0
        this.endIndex = numOfCardsVisible - 1
        this.prevBtn = prevBtn
        this.nextBtn = nextBtn
        this.boundNextHandler = this.handleNextBtn.bind(this)
        this.boundPrevHandler = this.handlePrevBtn.bind(this)
        this.nextBtn.addEventListener('click', this.boundNextHandler)
        this.prevBtn.addEventListener('click', this.boundPrevHandler)
    }

    showBtn(btn) {
        if (btn.style.display != "block") btn.style.display = "block";
    }

    hideBtn(btn) {
        btn.style.display = "none";
    }

    handleNextBtn() {
        if (this.endIndex == this.cards.length - 1) return
        this.startIndex++
        this.endIndex++
        this.cards[this.endIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
        this.showBtn(this.prevBtn)
        if (this.endIndex == this.cards.length - 1) this.hideBtn(this.nextBtn)
    }

    handlePrevBtn() {
        if (this.startIndex == 0) return
        this.startIndex--;
        this.endIndex--;
        this.cards[this.startIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
        this.showBtn(this.nextBtn)
        if (this.startIndex == 0) this.hideBtn(this.prevBtn)
    }

}

const popularCakeSlider = new slider(popularCake_catalogue.children, numOfCardsVisible, prevBtn_popularCakse_catalogue, nextBtn_popularCakse_catalogue)
const photoCakeSlider = new slider(photoCake_catalogue.children, numOfCardsVisible, prevBtn_photoCakse_catalogue, nextBtn_photoCakse_catalogue)

//customer review section js

const customer_review_div = document.querySelector('.customer-review');
const customer_name = document.querySelector('.customer-name');
const review_indicators = document.querySelector('.customer-review-indicator').getElementsByTagName('div');

let customer_review_index = 0;
let review_interval_id;

const customer_review_obj_array =
    [
        {
            customerName: "Prashant",
            customerReview: "Tasty as well as beautiful cake"
        },
        {
            customerName: "Nitika",
            customerReview: "Awesome"
        },
        {
            customerName: "Renjana",
            customerReview: "The reciepting said it was really beautiful"
        },
        {
            customerName: "Nidhi Chopra",
            customerReview: "Very tasty and skillfully made. Beautiful and tasty cake."
        }

    ]

const total_customer_review = customer_review_obj_array.length;


//resetting the index when it is more than total review length
//and also chanding the indicators class 
function change_customerReview() {
    review_interval_id = setInterval(() => {
        if (customer_review_index > (total_customer_review - 1)) customer_review_index = 0;

        customer_review_div.textContent = customer_review_obj_array[customer_review_index].customerReview;
        customer_name.textContent = customer_review_obj_array[customer_review_index].customerName;

        const previousIndicator = document.querySelector('#active-review-indicator');
        if (previousIndicator != null) previousIndicator.removeAttribute('id');
        review_indicators[customer_review_index].setAttribute('id', 'active-review-indicator');

        customer_review_index++;
    }, 2300);
};

change_customerReview();

