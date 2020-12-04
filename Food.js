class FoodC{
    constructor(Stock1){
        this.image = loadImage("images/Milk.png");
        this.stock = Stock1;
    }

    getFoodStock(){
        var foodRef = database.ref('Food');
        foodRef.on("value",(data)=>{
        this.stock = data.val();
        })
    }

    updateFoodStock(Stock){
        database.ref('/').update({
        Food: Stock
        });
    }

    deductFood(){
        newStock = this.stock - 1;
        database.ref('/').update({
            Food: newStock
            });
    }

    addFood(){
        newStock = this.stock + 1;
        database.ref('/').update({
            Food: newStock
            });
    }

    display(){
        var x = 550,y=100;
        var line2 = false;
        imageMode(CENTER);

        if(this.stock!=0){
            for(var i=0;i<this.stock;i++){
                image(this.image,x,y,50,50);
                x=x+50;
                y=y;
                if(i>=this.stock/2-1 && line2 != true){
                x = 550;
                y = 200;
                line2 = true;
                }
            }
        }

    }
}