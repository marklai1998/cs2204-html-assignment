const cakes = initMenu()
const videoSrc = [
  'https://courses.cs.cityu.edu.hk/cs2204/chocolate.mp4',
  'http://courses.cs.cityu.edu.hk/cs2204/cakemaking-s.mp4 '
]

let video = document.getElementById('playback')
let videoIndex = 0
let slideIndex = 0

const setCake = ({ description, nutrition, imagefile }) => {
  document.getElementById('slide_image').src = `./images/${imagefile}`
  document.getElementById('cake_name').innerHTML = description
  const total = nutrition.reduce((acc, { type, percentage }) => {
    document.getElementById(type).innerHTML = percentage
    return acc + percentage
  }, 0)
  document.getElementById('Total').innerHTML = total
}

setInterval(() => {
  slideIndex = slideIndex === cakes.length - 1 ? 0 : slideIndex + 1
  setCake(cakes[slideIndex])
}, 3000)

video.onended = () => {
  setTimeout(() => {
    videoIndex = videoIndex === videoSrc.length - 1 ? 0 : videoIndex + 1
    video.src = videoSrc[videoIndex]
    video.currentTime = 0
    video.play()
  }, 5000)
}
