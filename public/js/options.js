
window.mr = {
    countdown: {
        options: {
            format: "Global Option format override: %D Days %H:%M:%S"
        }
    },
    wizard: {
        options: {
            labels: {
                cancel: "Cancel",
                current: "current step:",
                pagination: "Pagination",
                finish: "Finish",
                next: "Next Step",
                previous: "Previous Step",
                loading: "Loading ..."
            }
        }
    },
    datepicker: {
        options: {
            today: "Hoy",
            clear: "Reiniciar",
            close: "Cierre",
        }
    },
    easypiecharts: {
        options: {
            lineCap: "square",
            lineWidth: 10,
            size: 300,
            animate: {
                duration: 330,
                enabled: true
            }
        }
    },
    sliders: {
        options: {
            autoPlay: true
        }
    },
    granim: {
        options: {
            states: {
                "default-state": {
                    gradients: [
                        ['#834d9b', '#d04ed6'],
                        ['#1CD8D2', '#93EDC7']
                    ],
                    transitionSpeed: 5000,
                    loop: true
                },
                "dark-state": {
                    gradients: [
                        ['#757F9A', '#D7DDE8'],
                        ['#5C258D', '#4389A2']
                    ],
                    transitionSpeed: 5000,
                    loop: true
                }
            },
            onStart: function() {
                console.log('Granim: onStart');
            },
            onGradientChange: function(colorDetails) {
                console.log('Granim: onGradientChange, details: ');
                console.log(colorDetails);
            }
        }
    },
    instagram: {
        options: {
            query: "mediumrarethemes"
        }
    },
    maps: {
        options: {
            map: {
                zoomControl: true,
                zoom: 1
            },
            marker: {
                optimised: true,
                title: "we are here in the overrides"
            }
        }
    },
    masonry: {
        options: {
            sortBy: '[data-masonry-filter]',
            sortAscending: true
        }
    },
    smoothscroll: {
        options: {
            offset: -1000
        }
    },
    twitter: {
        options: {
            enableLinks: false,
            maxTweets: 1
        }
    },
    video: {
        options: {
            ytplayer: {
                startAt: 10
            }
        }
    },
    typed: {
        options: {
            typeSpeed: 250
        }
    }
};


const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const expand = () => {
  searchBtn.classList.toggle("close");
  input.classList.toggle("square");
};

searchBtn.addEventListener("click", expand);
// // Create a "close" button and append it to each list item
// var myNodelist = document.getElementsByTagName("LI");
// var i;
// for (i = 0; i < myNodelist.length; i++) {
//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   myNodelist[i].appendChild(span);
// }

// // Click on a close button to hide the current list item
// var close = document.getElementsByClassName("close");
// var i;
// for (i = 0; i < close.length; i++) {
//   close[i].onclick = function() {
//     var div = this.parentElement;
//     div.style.display = "none";
//   }
// }

// // Add a "checked" symbol when clicking on a list item
// var list = document.querySelector('ul');
// list.addEventListener('click', function(ev) {
//   if (ev.target.tagName === 'LI') {
//     ev.target.classList.toggle('checked');
//   }
// }, false);

// // Create a new list item when clicking on the "Add" button
// function newElement() {
//   var zutat = document.createElement("zutat");
//   var inputValue = document.getElementById("neu_zutat").value;
//   var t = document.createTextNode(inputValue);
//   li.appendChild(t);
//   if (inputValue === '') {
//     alert("You must write something!");
//   } else {
//     document.getElementById("zutaten").appendChild(li);
//   }
//   document.getElementById("neu_zutat").value = "";

//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   li.appendChild(span);

//   for (i = 0; i < close.length; i++) {
//     close[i].onclick = function() {
//       var div = this.parentElement;
//       div.style.display = "none";
//     }
//   }
// }
// var zutaten=[]
// document.getElementById("clickMe").onclick = doFunction;
// var newZutat = function(){
// 	zutaten.push(function(){
// 		var Zutat={
// 			name: document.getElementById("name"),
// 			menge: document.getElementById("menge"),
// 			einheit: document.getElementById("einheit"),
// 		}
// 	})
// }var myNodelist = document.getElementsByTagName("LI");
// var i;
// for (i = 0; i < myNodelist.length; i++) {
//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   myNodelist[i].appendChild(span);
// }

// // Click on a close button to hide the current list item
// var close = document.getElementsByClassName("close");
// var i;
// for (i = 0; i < close.length; i++) {
//   close[i].onclick = function() {
//     var div = this.parentElement;
//     div.style.display = "none";
//   }
// }

// // Add a "checked" symbol when clicking on a list item
// var list = document.querySelector('ul');
// list.addEventListener('click', function(ev) {
//   if (ev.target.tagName === 'LI') {
//     ev.target.classList.toggle('checked');
//   }
// }, false);

// // Create a new list item when clicking on the "Add" button
// function newElement() {
//   var li = document.createElement("li");
//   var inputValue = document.getElementById("myInput").value;
//   var t = document.createTextNode(inputValue);
//   li.appendChild(t);
//   if (inputValue === '') {
//     alert("You must write something!");
//   } else {
//     document.getElementById("myUL").appendChild(li);
//   }
//   document.getElementById("myInput").value = "";

//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   li.appendChild(span);

//   for (i = 0; i < close.length; i++) {
//     close[i].onclick = function() {
//       var div = this.parentElement;
//       div.style.display = "none";
//     }
//   }
// }
var Zutaten = []
function newElementt() {
	var zutat = document.createElement('li'); 
	zutat.innerText = document.getElementById("menge").value +" "+ document.getElementById("einheit").value + " "+ document.getElementById("name").value; 
	document.getElementById("zutaten").appendChild(zutat)
	const newzutat = {
		name: document.querySelector('#name').value,
		menge: document.querySelector('#menge').value,
		einheit: document.querySelector('#einheit').value
	}
	Zutaten.push(newzutat)
}
function newElement() {
	var zutat = document.querySelector("#add_zutat"); 
	 var input= zutat.cloneNode(true)
	 console.log(zutat)
	input.querySelector('#name').value = ""
		input.querySelector('#menge').value = ""
		input.querySelector('#einheit').value = ""	
	document.getElementById("zutaten").appendChild(input)
	
}
function newSchritt(){
	var schritt = document.createElement('textarea');
	schritt.cols = "40";
	schritt.name ="schritte";
	schritt.rows ="2";
	document.getElementById("schritte").appendChild(schritt);
}


