$(document).ready(function () {
    var vm = new Vue({
        el: "#app",
        data: {
            gather: true,
            state: "Press the cards to start a game!",
            symbols: [
              {label: "spades",symbol: "♠" },
              {label: "hearts",symbol: "♥" },
              {label: "diamonds",symbol: "♦" },
              {label: "clubs",symbol: "♣" }
            ],
            cards: [
                {id: 1,label: "spades",open: false},
                {id: 2,label: "hearts", open: false},
                {id: 3,label: "clubs", open: false},
                {id: 4,label: "diamonds", open: false}
            ],
            question: null,
            mode: "",
            count: 0
        },
        methods: {
          getSymbol(label) {
              var result = this.symbols.find(s=>s.label==label)
              return result?result.symbol:label
          },
          shuffle() {
              var newOrder = [1,2,3,4].sort((a,b)=>Math.random()>0.5?1:-1)
              console.log(newOrder)
              //把新排序cid指定到牌的id=>換新id
              this.cards.forEach((card,cid)=> card.id=newOrder[cid]);
          },
          turnAll(state) {
              this.cards.forEach(card=> card.open=state)
          },
          startGame() {
              this.mode=""
              this.question = this.symbols[parseInt(Math.random()*4)]  //從0~3之間選一個
              this.turnAll(false)
              this.gather = true
              this.state="Ready..."
              setTimeout(()=> {
                this.gather = false
                this.state="Your mission is.."
              },1000)
              setTimeout(()=> {
                this.turnAll(true)
                this.state="Find "+this.question.label+this.question.symbol+ "!"
              },2000)
              setTimeout(()=> {
                this.turnAll(false)
                this.state="Get ready.."
              },4000)

              this.count=0
              setTimeout(()=> {
                var startSuffle = ()=> {
                    this.shuffle() 
                    console.log("Suffle !" + this.count)
                    if(this.count++<6) {
                       setTimeout(()=>{
                        startSuffle()
                       },300)
                    } else {
                        this.state="Please Pick out "+this.question.label+this.question.symbol+ "!"
                        this.mode="answer"
                    }
                }
                startSuffle()
              },6000)
          },
          //找正確卡牌
          getCard(label) {
            return this.cards.find(card=>card.label==label)
          },
          openCard(card) {
            if(this.mode=="answer") {
                card.open=!card.open
                if(card.label==this.question.label) {
                    this.state = "答對了,恭喜找到"+this.question.label+this.question.symbol+ "!"
                } else {
                    this.state = "答錯了"
                    setTimeout(()=> {
                        var card = this.getCard(this.question.label)
                        card.open = true
                    },1000)
                }
                setTimeout(()=> {
                    this.startGame()
                },6000)
            } else {
                this.startGame()
            }
          }
        },
        mounted() {
            // this.startGame()
        }
    })
});