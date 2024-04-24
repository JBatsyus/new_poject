
const ballLine = document.querySelector('.pagination-item_first')

if(ballLine){
  const ballLineHeight = () => {
    const ballLineCoord = ballLine.getBoundingClientRect().top;
    console.log(ballLineCoord)
    document.documentElement.style.setProperty('--ball-line-height', `${ballLineCoord - 43}px`)
  }
  
  
  window.addEventListener('load', ballLineHeight)
  window.addEventListener('resize', ballLineHeight)
  ballLineHeight()
  
  
}



const appHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight()





