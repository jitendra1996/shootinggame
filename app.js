const backdrop = document.getElementById('backdrop');
const root = document.getElementById('root');
const btnToStartGame = document.getElementById('gamestart');
const gameCount = document.getElementById('gamecount');
const player1wincount = document.getElementById('player1wincount');
const player2wincount = document.getElementById('player2wincount');
const resultdiv = document.getElementById('result');


let isGameOn = true;
let gCount = 0;
let player1Score = 0;
let player2Score = 0;

gameCount.textContent = 0;
player1wincount.textContent = 0;
player2wincount.textContent = 0;

btnToStartGame.addEventListener('click', e => {
    e.preventDefault();
    if(!isGameOn){
        isGameOn = true;
        btnToStartGame.textContent = 'Start Game';
        resultdiv.textContent = '';
        gameCount.textContent = 0;
        player1wincount.textContent = 0;
        player2wincount.textContent = 0;
    }else{
        const mainDiv = document.createElement('div');
        mainDiv.className = 'backdrop__gameplayarea';
    
        const player1Div = document.createElement('div');
        player1Div.className = 'players';
        player1Div.id = 'player1';
    
        const player1Label = document.createElement('p');
        player1Label.textContent = 'Player - 1';
    
        const player1HealthStatus = document.createElement('progress');
        player1HealthStatus.setAttribute('max', 100);
        player1HealthStatus.setAttribute('value', 100);
        player1HealthStatus.className = 'progressBar';
    
        const player2Div = document.createElement('div');
        player2Div.className = 'players';
        player2Div.id = 'player2';
    
        const player2Label = document.createElement('p');
        player2Label.textContent = 'Player - 2';
    
        const player2HealthStatus = document.createElement('progress');
        player2HealthStatus.setAttribute('max', 100);
        player2HealthStatus.setAttribute('value', 100);
        player2HealthStatus.className = 'progressBar';
    
        const rule = document.createElement('p');
        rule.textContent = 'game controls for player - 1 = \'a\' and for player - 2 = \'j\'';
        rule.className = 'rule';
    
        player1Div.append(player1Label);
        player1Div.append(player1HealthStatus);
    
        player2Div.append(player2Label);
        player2Div.append(player2HealthStatus);
    
        mainDiv.append(player1Div);
        mainDiv.append(player2Div);
        mainDiv.append(rule);
    
        backdrop.append(mainDiv);
        backdrop.style.display = 'block';
    
    
        document.addEventListener('keypress', keyPressHandler);
        
    }


});

function keyPressHandler(e) {
    e.preventDefault();
    const hitpower = Math.floor(Math.random() * 6);

    if (e.key === 'j' || e.key === 'J') {
        backdrop.children[0].children[0].children[1].value -= hitpower;
        //player1
        if (backdrop.children[0].children[0].children[1].value <= 0) {
            player2Score++;
            gCount++;
            gameCount.textContent = gCount;
            player2wincount.textContent = player2Score;
            
            if(player2Score >= 3){
                resultdiv.textContent = 'Player2 won the match!';
                btnToStartGame.textContent = 'New game';
                gCount = 0;
                player1Score = 0;
                player2Score = 0;

                isGameOn = false;
            }
            
            backdrop.removeChild(backdrop.children[0]);
            backdrop.style.display = 'none'
            if (backdrop.style.display === 'none') {
                document.removeEventListener('keypress', keyPressHandler);
            }
        }
    }
    if (e.key === 'a' || e.key === 'A') {
        backdrop.children[0].children[1].children[1].value -= hitpower;
        //player2
        if (backdrop.children[0].children[1].children[1].value <= 0) {
            player1Score++;
            gCount++;
            gameCount.textContent = gCount;
            player1wincount.textContent = player1Score;
            
            if(player1Score >= 3){
                resultdiv.textContent = 'Player1 won the match!';
                btnToStartGame.textContent = 'New game';
                gCount = 0;
                player1Score = 0;
                player2Score = 0;
                isGameOn = false;
            }

            backdrop.removeChild(backdrop.children[0]);
            backdrop.style.display = 'none';
            if (backdrop.style.display === 'none') {
                document.removeEventListener('keypress', keyPressHandler);
            }
        }
    }
}


backdrop.addEventListener('click', e => {
    backdrop.removeChild(backdrop.children[0]);
    backdrop.style.display = 'none';
    document.removeEventListener('keypress', keyPressHandler);
})