const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');
const five = document.getElementById('five');
const six = document.getElementById('six');
const seven= document.getElementById('seven');
const eight = document.getElementById('eight');
const nine = document.getElementById('nine');
const one__user = document.getElementById('one__user');
const two__user = document.getElementById('two__user');
const three__user = document.getElementById('three__user');
const four__user = document.getElementById('four__user');
const five__user = document.getElementById('five__user');
const six__user = document.getElementById('six__user');
const seven__user= document.getElementById('seven__user');
const eight__user = document.getElementById('eight__user');
const nine__user = document.getElementById('nine__user');
const btnEmpezar = document.getElementById('btnEmpezar');
const ULTIMO_NIVEL = 5; 

class Juego{
    constructor(){
        this.inicializar();
        this.generarSecuencia();
        setTimeout(this.siguinetenivel,1000);
    }
    inicializar(){
        // con .bind(this) uestra funcion siempre hara refrenecia a su clase
        this.siguinetenivel = this.siguinetenivel.bind(this);
        this.elegirColor = this.elegirColor.bind(this);
        this.toggleBtnEpezar()
        this.nivel = 1;
        this.numbers = {
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine
        }
        this.numbers_user = {
            one__user,
            two__user,
            three__user,
            four__user,
            five__user,
            six__user,
            seven__user,
            eight__user,
            nine__user
        }
    }
    toggleBtnEpezar(){
        if (!btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.add('hide');
        }else{
            btnEmpezar.classList.remove('hide');
        }
    }
    generarSecuencia(){
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n=>Math.round(Math.random()*8));
    }
    siguinetenivel(){
        this.subnivel = 0;
        this.iluminarsecuencia();
        this.AgregareventosClick();
    }
    transformasNumeroAColor(numero){
        switch(numero){
            case 0:
                return 'one';
            case 1:
                return 'two';
            case 2:
                return 'three';
            case 3:
                return 'four';
            case 4:
                return 'five';
            case 5:
                return 'six';
            case 6:
                return 'seven';
            case 7:
                return 'eight';
            case 8:
                return 'nine';
        }
    }
    transformarColorANumero(numero){
        switch(numero){
            case 'one__user':
                return 0;
            case 'two__user':
                return 1;
            case 'three__user':
                return 2;
            case 'four__user':
                return 3;
            case 'five__user':
                return 4;
            case 'six__user':
                return 5;
            case 'seven__user':
                return 6;
            case 'eight__user':
                return 7;
            case 'nine__user':
                return 8;
        }
    }
    iluminarsecuencia(){
        for(let i = 0; i<this.nivel;i++){
            const colorled = this.transformasNumeroAColor(i);
            const led = colorled+'_led';
            document.getElementById(led).classList.add('HIGH');
            console.log(led);
            const color = this.transformasNumeroAColor(this.secuencia[i]);
            setTimeout(()=>this.iluminarColor(color),1000*i);
        }
    }
    apagarColor(color){
        this.numbers[color].classList.remove('_high');
    }
    iluminarColor(color){
        this.numbers[color].classList.add('_high');
        setTimeout(()=>this.apagarColor(color),350)
    }
    apagarColor_user(color){
        this.numbers_user[color].classList.remove('_high_button');
        this.numbers_user[color].classList.add('button');
    }
    iluminarColor_user(color){
        this.numbers_user[color].classList.remove('button');
        this.numbers_user[color].classList.add('_high_button');
        setTimeout(()=>this.apagarColor_user(color),350)
    }
    AgregareventosClick(){
        this.numbers_user.one__user.addEventListener('click', this.elegirColor);//.bind sirve para manterner la refrenencia this cuando se mande a llamar al boton
        this.numbers_user.two__user.addEventListener('click', this.elegirColor);
        this.numbers_user.three__user.addEventListener('click', this.elegirColor);
        this.numbers_user.four__user.addEventListener('click', this.elegirColor);
        this.numbers_user.five__user.addEventListener('click', this.elegirColor);
        this.numbers_user.six__user.addEventListener('click', this.elegirColor);
        this.numbers_user.seven__user.addEventListener('click', this.elegirColor);
        this.numbers_user.eight__user.addEventListener('click', this.elegirColor);
        this.numbers_user.nine__user.addEventListener('click', this.elegirColor);
    }
    Eliminarevetosclick(){
        this.numbers_user.one__user.removeEventListener('click', this.elegirColor);//.bind sirve para manterner la refrenencia this cuando se mande a llamar al boton
        this.numbers_user.two__user.removeEventListener('click', this.elegirColor);
        this.numbers_user.three__user.removeEventListener('click', this.elegirColor);
        this.numbers_user.four__user.removeEventListener('click', this.elegirColor);
        this.numbers_user.five__user.removeEventListener('click', this.elegirColor);
        this.numbers_user.six__user.removeEventListener('click', this.elegirColor);
        this.numbers_user.seven__user.removeEventListener('click', this.elegirColor);
        this.numbers_user.eight__user.removeEventListener('click', this.elegirColor);
        this.numbers_user.nine__user.removeEventListener('click', this.elegirColor);
    }
    elegirColor(ev){
        const colorled = this.transformasNumeroAColor(this.subnivel);
        const led = colorled+'_leduser';
        document.getElementById(led).classList.add('HIGH');
        const name_number = ev.target.dataset.number;
        this.iluminarColor_user(name_number);
        const numero_color = this.transformarColorANumero(name_number);
        if (numero_color === this.secuencia[this.subnivel]) {
            this.subnivel++;
            if (this.subnivel === this.nivel) {
                this.nivel++;
                this.Eliminarevetosclick();
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    // gano
                    this.ganoElUsuario();
                }else{
                    setTimeout(this.siguinetenivel,1000);
                }
                // 
            } 
        }else{
            // perdio
            this.Eliminarevetosclick();
            this.perdioElUsuario();
        }
    }
    ganoElUsuario(){
        swal("Buen trabajo!", "Ganaste", "success").then(this.inicializar.bind(this));
        document.getElementById('one_leduser').classList.remove('HIGH');
        document.getElementById('two_leduser').classList.remove('HIGH');
        document.getElementById('three_leduser').classList.remove('HIGH');
        document.getElementById('four_leduser').classList.remove('HIGH');
        document.getElementById('five_leduser').classList.remove('HIGH');
        document.getElementById('one_led').classList.remove('HIGH');
        document.getElementById('two_led').classList.remove('HIGH');
        document.getElementById('three_led').classList.remove('HIGH');
        document.getElementById('four_led').classList.remove('HIGH');
        document.getElementById('five_led').classList.remove('HIGH');
    }
    perdioElUsuario(){
        swal("Mal!", "intentalo denuevo", "error").then(this.inicializar.bind(this));
        document.getElementById('one_leduser').classList.remove('HIGH');
        document.getElementById('two_leduser').classList.remove('HIGH');
        document.getElementById('three_leduser').classList.remove('HIGH');
        document.getElementById('four_leduser').classList.remove('HIGH');
        document.getElementById('five_leduser').classList.remove('HIGH');
        document.getElementById('one_led').classList.remove('HIGH');
        document.getElementById('two_led').classList.remove('HIGH');
        document.getElementById('three_led').classList.remove('HIGH');
        document.getElementById('four_led').classList.remove('HIGH');
        document.getElementById('five_led').classList.remove('HIGH');
    }
}

function empezarJuego(){
    window.jugar = new Juego();
}