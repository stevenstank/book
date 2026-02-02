function book(title, author, year){
    this.title = title;
    this.author = author;
    this.year = year;
    this.getSummary = function(){console.log(`${this.title} was written by ${this.author} in ${this.year}`);}
}

const book1 = new book('The Great Adventure', 'Saksham', 2026);
const book2 = new book('Mystery of the Night', 'Ananya', 2025);

book1.getSummary();
book2.getSummary();
