// Carousel Presentation
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');

function showSlide(index) 
{
  slides.forEach((slide, i) => {
    if (i === index) 
    {
      slide.style.display = 'block';
    }
    else 
    {
      slide.style.display = 'none';
    }
  });
}

function nextSlide() 
{
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() 
{
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

document.addEventListener('DOMContentLoaded', () => {
  showSlide(currentSlide);
  setInterval(nextSlide, 3000); // Change de slide tous les 3 seconds
});

//New event carousel
const nbr= 6;
let currentSlidee = 1;
var prev_btn= document.getElementById("newEventPrev-btn");
var next_btn= document.getElementById("newEventNext-btn");

next_btn.addEventListener('click', 
function () 
{
    // if (currentSlidee <= nbr) {
    //     document.getElementById("newEventCarousel-slide" + currentSlidee).style.display = 'none';
    //     currentSlidee++;
    //     b= currentSlidee + 2;
    //     document.getElementById("newEventCarousel-slide" + b).style.display = 'block';
    // }
});

prev_btn.addEventListener('click', 
function () 
{
    // if (currentSlidee >= 1) {
    //     document.getElementById("newEventCarousel-slide" + currentSlidee).style.display = 'none';
    //     currentSlidee--;
    //     document.getElementById("newEventCarousel-slide" + currentSlidee).style.display = 'block';
    // }
});

