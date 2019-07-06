(() => {
	// set up the puzzle pieces and boards
console.log("It works now start the game!")

	//Used for things that shouldn't change
const puzzleBoard = document.querySelector(".puzzle-board"),
			puzzleSelectors = document.querySelectorAll("#buttonHolder img"),
			dropZones = document.querySelectorAll(".drop-zone");

let piecesBoard = document.querySelector(".puzzle-pieces")
let draggablePieces = piecesBoard.querySelectorAll("img")

//arrays are indexed and start at 0

const imageNameArray = ["topLeft", "topRight","bottomLeft","bottomRight"];

// for (i=0; i<imageNameArray.length; i++) {
//console.log(imageNameArray[i])
// }

//debugger;

function switchImage() {
	console.log(this.dataset.puzzleref);

	var deletedImages = resetPuzzlePieces()
	console.log(deletedImages)
	console.log(draggablePieces)
	for (i=0; i < deletedImages.length; i++){
		piecesBoard.appendChild(deletedImages[i]);
	}

	// grab the corresponding background image (0,1,2 or 3)
	// and get it from the images folder images/backGround
	let bgImage = `./images/backGround${this.dataset.puzzleref}.jpg`;

	// set background image style on the container
	puzzleBoard.style.backgroundImage = `url(${bgImage})`;
	// switching dragable images

	draggablePieces.forEach((image,index) => {
		//log the image and current index
		//console.log(image,index)

		//try to change each image source
		image.src = `images/${imageNameArray[index] + this.dataset.puzzleref}.jpg`
	});

	//debugger;
}

function resetPuzzlePieces() {
	var deletedImages = []
	dropZones.forEach(zone => {
		while (zone.firstChild) {
			deletedImages.push(zone.firstChild);
		zone.removeChild(zone.firstChild);
		}
	})
	return deletedImages
}

puzzleSelectors.forEach(button => button.addEventListener("click",switchImage));

//loup through the draggable images
//this is a drag functionality
draggablePieces.forEach(piece => {
	piece.addEventListener("dragstart", function(e) {
		console.log("dragging...");

		//the datatransfer object has two methods: a setter and getter
		//Set data on the drag on retrieve it on the drop
		e.dataTransfer.setData("text/plain", this.id);
	})
})

// this is dragover and drop functionality
dropZones.forEach(zone => {

	// allows user to drag over an elements
	zone.addEventListener('dragover', function(e){
		e.preventDefault();
		console.log("Drugged something over me");
	});
	//allow user to drop an element 
	zone.addEventListener("drop", function(e){

		e.preventDefault();
		console.log("you droped something on me");

		let draggedElement = e.dataTransfer.getData("text/plain");
		console.log(draggedElement);

		// add image  image to the droping zone
		//check if a zone already has an element
		if(zone.children.length < 1){
			e.target.appendChild(document.querySelector(`#${draggedElement}`));}
		else {
		console.log("Zone already has an element in it.");
		}
	});
})

})();
