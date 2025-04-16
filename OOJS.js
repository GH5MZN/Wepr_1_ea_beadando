// Alap osztály
class Animal {
    constructor(name, sound) {
        this.name = name; // Állat neve
        this.sound = sound; // Állat hangja
    }

    // Az állat hangot ad ki
    introduce() {
        const div = document.createElement("div");
        div.textContent = `Ez egy ${this.name}, és azt mondja: "${this.sound}"`;
        document.getElementById("animalList").appendChild(div); // Az állat hozzáadása az animalList div-hez
    }
}

// Kutya osztály, amely az Animal osztályból öröklődik
class Dog extends Animal {
    constructor(name, sound, breed) {
        super(name, sound); // Az alap osztály konstruktorának meghívása
        this.breed = breed; // Kutya fajtája
    }

    // Metódus: A kutya bemutatkozik, és megemlíti a fajtáját
    introduce() {
        const div = document.createElement("div");
        div.textContent = `Ez egy ${this.breed} kutya, neve: ${this.name}, és azt mondja: "${this.sound}"`;
        document.getElementById("animalList").appendChild(div); // Az állat hozzáadása az animalList div-hez
    }
}

// Macska osztály, amely az Animal osztályból öröklődik
class Cat extends Animal {
    constructor(name, sound, color) {
        super(name, sound); // Az alap osztály konstruktorának meghívása
        this.color = color; // Macska színe
    }

    // Metódus: A macska bemutatkozik, és megemlíti a színét
    introduce() {
        const div = document.createElement("div");
        div.textContent = `Ez egy ${this.color} macska, neve: ${this.name}, és azt mondja: "${this.sound}"`;
        document.getElementById("animalList").appendChild(div); // Az állat hozzáadása az animalList div-hez
    }
}

// Példányosítás
const dog1 = new Dog("Bodri", "Vau-vau", "Golden Retriever");
const cat1 = new Cat("Cirmi", "Miau", "szürke");
const dog2 = new Dog ("Rex", "Vau-vau", "Német juhász");
const cat2 = new Cat ("Mici", "Miau", "Fehér");

// Az állatok bemutatkozása
dog1.introduce();
cat2.introduce();
dog2.introduce();
cat1.introduce();