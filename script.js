const dino = document.querySelector('.dino')
const background = document.querySelector('.background')
let isJumping =false
let position = 0
let score = 0
let cactusSpeed = 20

function handleKeyUp(event){
    if (event.keyCode === 32){
        if(!isJumping){
            jump()
        }
        
        //console.log('Pressionou espaço!')
    }
}

function jump(){
    
    isJumping = true
    let upInterval =setInterval( () => {
        if (position >= 150){
            clearInterval(upInterval)

            let downInterval = setInterval(() => {
                if( position <= 0){
                    clearInterval(downInterval)
                    isJumping = false
                }else{
                    position -= 20 
                    dino.style.bottom = position + 'px' 
                }
                     
            }, 20)
        }else{
            position += 20
        }
        
        

        dino.style.bottom = position + 'px'
    }, 20)
}

function createCactus() {
    const cactus = document.createElement('div')
    let cactusPosition = 1000
    let randomTime = Math.random() * 6000
    //console.log(randomTime)

    cactus.classList.add('cactus')
    cactus.style.left = 1000 + 'px'
    background.appendChild(cactus)

    let leftInterval = setInterval(() => {
        

        if (cactusPosition < -60){
            clearInterval(leftInterval)
            background.removeChild(cactus)
            score += 10
            if (score >= 10){
                // more hard
                cactusSpeed -= 1
            }
        }else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){
            //game Over
            clearInterval(leftInterval)
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo  Score:<input type="number" name="score" id="score"></h1> '
            document.getElementById('score').value = score
        }else  {
            cactusPosition -= 10
            cactus.style.left = cactusPosition + 'px'
        }
    }, cactusSpeed)

    setTimeout(createCactus, randomTime)
} 

createCactus()
document.addEventListener('keyup' , handleKeyUp)
