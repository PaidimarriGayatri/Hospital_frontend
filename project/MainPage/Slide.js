const slides=document.querySelectorAll(".slide")
// console.log(slides);
var counter=0;

slides.forEach(
    (slide,index)=>{
        slide.style.left=`${index*100}%`

    }
)

const gonext=()=>{
    counter++
    slideimages()
}
const goprev=()=>{
    counter--
    slideimages()
}
const slideimages=()=>{
    slides.forEach(
        (slide)=>{
            slide.style.transform=`translateX(-${counter*100}%)`
            // slide .style.transform=`translateY(${counter*100}%)`
        
        }
    )
}