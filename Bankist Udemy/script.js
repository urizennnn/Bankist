'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal()
  }
});
const btnScroll = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

btnScroll.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' })
})
document.querySelector('.nav__links').addEventListener('click', function (e) {
  const id = e.target.getAttribute('href')
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
})

const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab')


  //Guard Clause
  if (!clicked) return
  tabs.forEach(element =>
    element.classList.remove('operations__tab--active')
  );
  clicked.classList.add('operations__tab--active')



  tabsContent.forEach(c => c.classList.remove('operations__content--active'))
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')

})
// Menu Fade Animation

const nav = document.querySelector('.nav')

nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const links = e.target;
    const siblings = links.closest('.nav').querySelectorAll('.nav__link')


    siblings.forEach(el => {
      if (el !== links) el.style.opacity = 0.5
    })
  }
})
nav.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const links = e.target;
    const siblings = links.closest('.nav').querySelectorAll('.nav__link')


    siblings.forEach(el => {
      if (el !== links) el.style.opacity = 1
    })
  }

})


//Sticky navigation
// const cords = section1.getBoundingClientRect().top


// window.addEventListener('scroll',function(e){
// if(window.scrollY > cords) nav.classList.add('sticky')
// else nav.classList.remove('sticky')
// nav.style.opactiy = 0.1
// })

// function obsCallBack(e, observer) {
//   e.forEach(entry => {
//     console.log(entry);
//   })

// }
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2]
// }
// const observer = new IntersectionObserver(obsCallBack, obsOptions)
// observer.observe(section1)
const navHeight = nav.getBoundingClientRect().height
const header = document.querySelector('.header')
const sticky = function (e) {
  const [entry] = e

  if (entry.isIntersecting === true)
    nav.classList.remove('sticky')
  else nav.classList.add('sticky')
}

const headerObserver = new IntersectionObserver(sticky, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
})
headerObserver.observe(header)

//Reveal sections
const allSections = document.querySelectorAll('.section')
function revealSection(e, observer) {
  const [entry] = e

  if (entry.isIntersecting)
    entry.target.classList.remove('section--hidden')
  else return

  observer.unobserve(entry.target)

}
const sectionOberver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
})

allSections.forEach(function (section) {
  sectionOberver.observe(section)
  section.classList.add('section--hidden')
})

const loadImg = function (e, observer) {
  const [entry] = e
  if (!entry.isIntersecting) return
  entry.target.src = entry.target.dataset.src
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target)
}
//Lazy loading images
const images = document.querySelectorAll('img[data-src]')

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,

})

images.forEach(images => imgObserver.observe(images))


//slider
// const slides = document.querySelectorAll('.slide')
// const btnLeft = document.querySelector('.slider__btn--left')
// const btnRight = document.querySelector('.slider__btn--right')
// const dotContainer = document.querySelector('.dots')

// let curSlide = 0
// const maxSlide = slides.length;
// const createDots = function () {
//   slides.forEach(function (_, i) {
//     dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
//   })
// }
// createDots()

// const activateDot = function (slide) {
//   document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))
//   document.querySelector(`.dots__dot[data-slide= "${slide}"]`).classList.add('dots__dot--active')
// }
// dotContainer.addEventListener('click', function (e) {
//   if (e.target.classList.contains('dots__dot')) {
//     const { slide } = e.target.dataset
//     goToSlide(slide)
//   }
// })
// activateDot(0)
// const goToSlide = function (slide) {
//   slides.forEach(
//     (s, i) => (s.style.tranform = `translateX(${100 * (i - slide)}%)`)
//   )
// }
// goToSlide(0)
// const nextSlide = function () {
//   if (curSlide === maxSlide - 1) {
//     curSlide = 0
//   } else {
//     curSlide++
//   }
//   goToSlide(curSlide)
//   activateDot(curSlide)
// }
// const prevSlide = function () {
//   curSlide--
//   if (curSlide === maxSlide)
//     goToSlide(curSlide)
//     activateDot(curSlide)
// }
// // const slider = document.querySelector('.slider')
// // slider.style.transform = 'scale(0.4) translateX(-800px)'
// // slider.style.overflow = 'visible'
// // slides.forEach((s, i) => s.style.tranform = `translateX(${100 * i}%)`)

// btnRight.addEventListener('click', nextSlide)
// btnLeft.addEventListener('click', prevSlide)

// document.addEventListener('keydown', function (e) {
//   console.log(e);
//   if (e.key === 'ArrowLeft') prevSlide()
//   if (e.key === 'ArrowRight') nextSlide()
//   else return
// })


const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length;

// Functions
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

// Next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

const init = function () {
  goToSlide(0);
  createDots();

  activateDot(0);
};
init();

// Event handlers
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});


N