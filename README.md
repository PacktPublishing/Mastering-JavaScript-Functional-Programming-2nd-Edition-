# 	Mastering JavaScript Functional Programming

<a href="https://www.packtpub.com/web-development/mastering-javascript-functional-programming-second-edition?utm_source=github&utm_medium=repository&utm_campaign=9781839213069"><img src="https://www.packtpub.com/media/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/9/7/9781839213069-original.png" alt="	Mastering JavaScript Functional Programming" height="256px" align="right"></a>

This is the code repository for [Mastering JavaScript Functional Programming](https://www.packtpub.com/media/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/9/7/9781839213069-original.png), published by Packt.

**Write clean, robust, and maintainable web and server code using functional JavaScript**

## What is this book about?
Functional programming is a paradigm for developing software with better performance. It helps you write concise and testable code. To help you take your programming skills to the next level, this comprehensive book will assist you in harnessing the capabilities of functional programming with JavaScript and writing highly maintainable and testable web and server apps using functional JavaScript

This book covers the following exciting features: 
* Simplify JavaScript coding using function composition, pipelining, chaining, and transducing
* Use declarative coding as opposed to imperative coding to write clean JavaScript code
* Create more reliable code with closures and immutable data
* Apply practical solutions to complex programming problems using recursion
* Improve your functional code using data types, type checking, and immutability

If you feel this book is for you, get your [copy](https://www.amazon.com/dp/183921306X) today!

<a href="https://www.packtpub.com/?utm_source=github&utm_medium=banner&utm_campaign=GitHubBanner"><img src="https://raw.githubusercontent.com/PacktPublishing/GitHub/master/GitHub.png" 
alt="https://www.packtpub.com/" border="5" /></a>


## Instructions and Navigations
All of the code is organized into folders. For example, Chapter02.

The code will look like the following:
```
function newCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const nc = newCounter();
console.log(nc()); // 1
console.log(nc()); // 2
console.log(nc()); // 3
```

**Following is what you need for this book:**
This book is for JavaScript developers who want to enhance their programming skills and build efficient web applications. Frontend and backend developers who use various JavaScript frameworks and libraries like React, Angular, or Node.js will also find the book helpful. Working knowledge of ES2019 is required to grasp the concepts covered in the book easily.

With the following software and hardware list you can run all code files present in the book (Chapter 1-12).

### Software and Hardware List

| Chapter  | Software required                   | OS required                        |
| -------- | ------------------------------------| -----------------------------------|
| 1 - 12   | Node.js, OpenSUSE, Chrome, Firefox, | Windows, Mac OS X, and Linux (Any) |
|          | JSFiddle, Babel, Jasmine, Prettier, |                                    |
|          |                                     |                                    |


### Related products <Other books you may enjoy>
* React Projects [[Packt]](https://www.packtpub.com/programming/react-js-projects?utm_source=github&utm_medium=repository&utm_campaign=9781789954937) [[Amazon]](https://www.amazon.com/dp/1789954932)

* Web Development with Angular and Bootstrap - Third Edition [[Packt]](https://www.packtpub.com/web-development/web-development-angular-and-bootstrap-third-edition?utm_source=github&utm_medium=repository&utm_campaign=9781788838108) [[Amazon]](https://www.amazon.com/dp/1788838106)

## Get to Know the Author
**Federico Kereki**
FEDERICO KEREKI Federico Kereki is a Uruguayan Systems Engineer, with a Master's degree in Education, and more than 30 years of experience as a consultant, system developer, university professor, and writer.
He is currently a Subject Matter Expert at Globant, where he gets to use a good mixture of development frameworks, programming tools, and operating systems, such as JavaScript, Node.JS, React and Redux, Vue, SOA, Containers, with both Windows and Linux.
He has taught several computer science courses at Universidad de la República, Universidad ORT Uruguay, and Universidad de la Empresa. He has also written texts for these courses.
He has written several articles--on JavaScript, web development, and open source topics-- for magazines such as Linux Journal and LinuxPro Magazine in the United States, Linux+ and Mundo Linux in Europe, and for websites such as Linux.com and IBM DeveloperWorks. He has done technical reviews for several books (for Packt), and he also wrote booklets on computer security (Linux in the Time of Malware and SSH: A Modern Lock for your Server), and two books: Essential GWT: Building for the Web with Google Web Toolkit, and Modern JavaScript Web Development Cookbook (for Packt).
Kereki has given talks on Functional Programming with JavaScript in public conferences (such as JSCONF 2016 or Development Week Santiago 2019) and has used these techniques to develop internet systems for businesses in Uruguay and abroad.
His current interests tend toward software quality and software engineering--with Agile Methodologies topmost--while on the practical side, he works with diverse languages, tools and frameworks, and Open Source Software (FLOSS) wherever possible!
He resides, works, and teaches in Uruguay, but he wrote the first edition of this book while working in India.


### Suggestions and Feedback
[Click here](https://docs.google.com/forms/d/e/1FAIpQLSdy7dATC6QmEL81FIUuymZ0Wy9vH1jHkvpY57OiMeKGqib_Ow/viewform) if you have any feedback or suggestions.
