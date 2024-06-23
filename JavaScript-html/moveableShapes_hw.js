class Moveable{
	constructor (x, y){
		this.x = x;
		this.y = y;
	}
	
	moveX(speed){
		//TODO
		//Check if position is valid, either will have to make temp rectangle
		//or create better util method for checking overlaps that do not require rectangles
		this.x += speed
	}
	
	moveY(speed){
		this.y += speed
	}
	
	getPos(){
		return [this.x, this.y];
	}
}
	

class Rectangle extends Moveable{
	constructor (x, y, width, height, color){
		super(x, y)
		this.width = width;
		this.height = height;
		this.color = color;
	}
	
	getWidth(){
		return this.width;
	}
	
	getHeight(){
		return this.height;
	}
	
	getCorners(){
		return [[this.x, this.y], //Upper Left Corner 
			[this.x + this.width, this.y], //Upper Right Corner
			[this.x, this.y + this.height], //Lower Left Corner
			[this.x + this.width, this.y + this.height]]; //Lower Right Corner
	}
	
	//Always check the inner 2 points since that is where
	//the overlap will always happen if there is one 
	static checkOverlap(interval1, interval2) {
		
		const [a, b] = interval1;
		const [c, d] = interval2;

		return Math.max(a, c) <= Math.min(b, d);
	}
	
	
	static checkIntersect(rect1, rect2){
		if (!(rect1 instanceof Rectangle && 
			rect2 instanceof Rectangle)) {
			throw new Error('Invalid parameter(s).\
			Expected Rectangle instance(s).');
		}
		
		const rect1Pos = rect1.getPos()
		const rect2Pos = rect2.getPos()
		
		//X interval of rectangles
		const xInt1 = [rect1Pos[0], rect1Pos[0] + rect1.getWidth()]
		const xInt2 = [rect2Pos[0], rect2Pos[0] + rect2.getWidth()]
		
		//Y interval of rectangles
		const yInt1 = [rect1Pos[1], rect1Pos[1] + rect1.getHeight()]
		const yInt2 = [rect2Pos[1], rect2Pos[1] + rect2.getHeight()]
		
		if (this.checkOverlap(xInt1, xInt2) && 
			this.checkOverlap(yInt1, yInt2)) {
			return true;
		}
			
		else {
			return false;
		}
	}
		
	setColor(color){
		this.color = color
	}
	
	paint(context){
		context.fillStyle = this.color; //Can either be name of color or #hexcode
		context.fillRect(this.x, this.y, this.width, this.height);
	}
	
}
