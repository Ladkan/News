const alertCooldowns = new Map()

export function alertsystem(type:string, message:string , duration:number){
    const currentTime = Date.now()

    if(alertCooldowns.has(message)){
        const lastTriggerTime = alertCooldowns.get(message)
        if(currentTime - lastTriggerTime < 1000) return
    }

    alertCooldowns.set(message, currentTime)

    const alertContainer = document.getElementById('alert-container')
    const alert = document.createElement('div')

    alert.style.minWidth = '250px'
    alert.style.maxWidth = '400px'
    alert.style.padding = '15px'
    alert.style.borderRadius = '5px'
    alert.style.color = 'white'
    alert.style.fontSize = '15px'
    alert.style.display = 'flex'
    alert.style.alignItems = 'center'
    alert.style.gap = '5px'
    alert.style.animation = 'slide-in 0.5s ease'
    alert.style.opacity = '0.9'
    alert.style.backgroundColor = '#181a1e'
    alert.style.border = 'solid 1px rgba(94, 92, 92, 0.418)'
    alert.style.position = 'relative'
    alert.style.cursor = 'pointer'
    alert.classList.add('alert')

    const countdownBar = document.createElement('div')
    countdownBar.classList.add('countdown-bar')
    countdownBar.style.position = 'absolute'
    countdownBar.style.bottom = '0'
    countdownBar.style.left = '0'  
    countdownBar.style.height = '4px'
    countdownBar.style.backgroundColor = 'rgba(255, 255, 255, 0.7)'
    countdownBar.style.transition = 'width linear'
    countdownBar.style.width = '100%'


    if(type === 'error'){
        alert.style.borderColor = 'var(--alert-error-color)'
        countdownBar.style.backgroundColor = 'var(--alert-error-color)'
        alert.innerHTML = `${message}`
    } else if (type === 'warning') {
        alert.style.borderColor = 'var(--alert-warning-color)'
        countdownBar.style.backgroundColor = 'var(--alert-warning-color)'
        alert.innerHTML = `${message}`
    } else if (type === 'success') {
        alert.style.borderColor = 'var(--alert-success-color)'
        countdownBar.style.backgroundColor = 'var(--alert-success-color)'
        alert.innerHTML = `${message}`
    } else if (type === 'info') {
        alert.style.borderColor = 'var(--alert-info-color)'
        countdownBar.style.backgroundColor = 'var(--alert-info-color)'
        alert.innerHTML = `${message}`
    }

    alert.appendChild(countdownBar)

    alertContainer?.appendChild(alert)

    setTimeout(() => {
        countdownBar.style.width = '0%'
    }, 50)

    countdownBar.style.transitionDuration = `${duration}`

    let remainingTime = duration * 1000
    const interval = 100

    const countdownTimer = setInterval(() => {
        remainingTime -= interval
        if(remainingTime <= 0){
            clearInterval(countdownTimer)
            alert.style.animation = 'slide-out .5s ease'
            alert.addEventListener('animationend', () => alert.remove())
        }
    }, interval)

    alert.addEventListener('click', () => {
        clearInterval(countdownTimer)
        remainingTime = 100
        countdownBar.style.transitionDuration = '0.1s'
        countdownBar.style.width = '0%'
        setTimeout(() => {
            alert.style.animation = 'slide-out 0.5s ease'
            alert.addEventListener('animationend', () => alert.remove())
        }, 100)
    })

}