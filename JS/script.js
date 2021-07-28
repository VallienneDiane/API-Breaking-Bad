fetch('https://www.breakingbadapi.com/api/characters')
    .then((response) => {
        return response.json();
    })
    .then((characters) => {
        // Utilisation d'un forEach pour effectuer des actions pour chaque personnage que contient le tableau "characters"
        characters.forEach(character => {
            // Création des vignettes avec la photo du personnage. On ajoute des attributs "data-" qui vont nos servir à appliquer des filtres d'affichage
            var div = document.createElement('div');
            div.classList.add("character");
            div.setAttribute('data-appearance', character.appearance); // ajoute attribut (name, value)
            div.setAttribute('data-name', character.name);
            div.setAttribute('data-status', character.status);

            // Pour créer l'attribut "data-drug" on recherche des mots clés dans les différentes occupation de chaque personnage
            var drugRelated = "";
            character.occupation.forEach(occupation => {
                if (occupation.includes("meth") || occupation.includes("Meth") || occupation.includes("drug") || occupation.includes("Drug") || occupation.includes("cartel") || occupation.includes("Cartel") || occupation.includes("gang") || occupation.includes("Gang") || occupation.includes("Chemist")) {
                    drugRelated = "yes";
                }
                else {
                    drugRelated = "no";
                }
            });
            div.setAttribute('data-drug', drugRelated);

            var image = document.createElement('img');
            image.src = character.img;
            div.append(image);

            // Une fois la vignette crée, on l'ajoute dans la div ayant l'id #characters
            document.querySelector('#characters').append(div);

            // Création de grosse vignette contenant des informations sur le personnage
            var infos = document.createElement('div');
            infos.classList.add("infos");
            infos.classList.add("none");
            infos.setAttribute('data-name', character.name);
            var name = document.createElement('h3');
            name.innerHTML = character.name;
            var img = document.createElement('img');
            img.src = character.img;
            var nickname = document.createElement('p');
            nickname.innerHTML = `Surnom :&nbsp; "${character.nickname}"`;
            var actor = document.createElement('p');
            actor.innerHTML = `Interprété par :&nbsp; ${character.portrayed}`;

            infos.append(name);
            infos.append(img);
            infos.append(nickname);

            // Consultation d'une autre partie de l'API pour obtenir une citation aléatoire par personnage
            // On utilise le nom des personnages pour faire la correspondance entre les deux API
            // Pour que l'url de l'API soit correcte, il faut que le nom et le prénom soient séparés par un "+"
            var author = character.name.replace(" ", "+");
            var url = "https://www.breakingbadapi.com/api/quote/random?author=" + author;
            var quotes = "";

            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((quote) => {
                    if (quote.length == 1) {
                        quotes = document.createElement('p');
                        quotes.innerHTML = `Citation célèbre :&nbsp; "${quote[0].quote}"`;
                        infos.append(quotes);
                    };
                });

            infos.append(actor);
            
            // On ajoute la grosse vignette au html. Elle a une classe ".none" qui permet de ne pas l'afficher
            document.querySelector('body').append(infos);
        });
    });

// Lorsque l'on clique sur un bouton, selon son dataset.season on affiche les personnages correspondants    
document.querySelector('#seasons').addEventListener('click', (el) => {
    el = el.target;
    var thumbnail = document.querySelectorAll(".character");
    if (el.dataset.season) {
        thumbnail.forEach(thumb => {
            thumb.classList.add("none");    // On cache déjà toutes les vignettes avant d'afficher celle qui cochent nos critères
        });

        if (el.dataset.season === "all") {
            thumbnail.forEach(thumb => {
                if (thumb.dataset.appearance) {
                    thumb.classList.remove("none");
                };
            });
        }
        else if (el.dataset.season === "1") {
            thumbnail.forEach(thumb => {
                if (thumb.dataset.appearance.includes("1")) {
                    thumb.classList.remove("none");
                };
            });
        }
        else if (el.dataset.season === "2") {
            thumbnail.forEach(thumb => {
                if (thumb.dataset.appearance.includes("2")) {
                    thumb.classList.remove("none");
                };
            });
        }
        else if (el.dataset.season === "3") {
            thumbnail.forEach(thumb => {
                if (thumb.dataset.appearance.includes("3")) {
                    thumb.classList.remove("none");
                };
            });
        }
        else if (el.dataset.season === "4") {
            thumbnail.forEach(thumb => {
                if (thumb.dataset.appearance.includes("4")) {
                    thumb.classList.remove("none");
                };
            });
        }
        else if (el.dataset.season === "5") {
            thumbnail.forEach(thumb => {
                if (thumb.dataset.appearance.includes("5")) {
                    thumb.classList.remove("none");
                };
            });
        };
    };
});

// Lorsque l'on effectue un changement au niveau des inputs, en fonction des dataset des personnages, on ajoute ou enleve la classe ".none" qui permet de les cacher
document.querySelector('#inputs').addEventListener("input", (el) => {
    el = el.target;
    var thumbnail = document.querySelectorAll(".character");
    if (el.checked == true) {
        if (el.name === "alive") {
            thumbnail.forEach(thumb => {
                if (thumb.dataset.status === "Alive") {
                    thumb.classList.remove("noneStatus");
                };
            });
        };
        if (el.name === "dead") {
            thumbnail.forEach(thumb => {
                if (thumb.dataset.status === "Deceased") {
                    thumb.classList.remove("noneStatus");
                };
            });
        };
        if (el.name === "presumed") {
            thumbnail.forEach(thumb => {
                if (thumb.dataset.status === "Presumed dead" || thumb.dataset.status === "Unknown") {
                    thumb.classList.remove("noneStatus");
                };
            });
        };
        if (el.name === "drugRelated") {
            thumbnail.forEach(thumb => {
                if (thumb.dataset.drug === "yes") {
                    thumb.classList.remove("noneDrug");
                };
            });
        };
        if (el.name === "noDrug") {
            thumbnail.forEach(thumb => {
                if (thumb.dataset.drug === "no") {
                    thumb.classList.remove("noneDrug");
                };
            });
        };
    };
    if (el.checked == false) {
        if (el.name === "alive") {
            thumbnail.forEach(thumb => {
                if (thumb.dataset.status === "Alive") {
                    thumb.classList.add("noneStatus");
                };
            });
        };
        if (el.name === "dead") {
            thumbnail.forEach(thumb => {
                if (thumb.dataset.status === "Deceased") {
                    thumb.classList.add("noneStatus");
                };
            });
        };
        if (el.name === "presumed") {
            thumbnail.forEach(thumb => {
                if (thumb.dataset.status === "Presumed dead" || thumb.dataset.status === "Unknown") {
                    thumb.classList.add("noneStatus");
                };
            });
        };
        if (el.name === "drugRelated") {
            thumbnail.forEach(thumb => {
                if (thumb.dataset.drug === "yes") {
                    thumb.classList.add("noneDrug");
                };
            });
        };
        if (el.name === "noDrug") {
            thumbnail.forEach(thumb => {
                if (thumb.dataset.drug === "no") {
                    thumb.classList.add("noneDrug");
                };
            });
        };
    };
});

// Lorsque l'on clique sur une petite vignette, la grosse vignette qui a le même dataset.name s'affiche et "l'arrière plan" devient flou et non-cliquable par l'ajout de classes
document.querySelector('#characters').addEventListener('click', el => {
    el = el.target;
    var bigThumbnail = document.querySelectorAll('.infos');
    if (el.dataset.name) {
        document.querySelector('main').classList.add("noEvent", "blur");
        document.querySelector('header').classList.add("noEvent", "blur");

        bigThumbnail.forEach(bigThumb => {
            bigThumb.classList.add("none");
            if (bigThumb.dataset.name === el.dataset.name) {
                bigThumb.classList.remove("none");
            };
        });
    };
});

// Lorsque l'on clique sur la grosse vignette, celle-ci redevient cachée, le fond n'est plus flou et redevient cliquable
document.querySelector('body').addEventListener('click', el => {
    el = el.target;
    if (el.classList.contains("infos")) {
        document.querySelector('main').classList.remove("noEvent", "blur");
        document.querySelector('header').classList.remove("noEvent", "blur");
        var bigThumbnail = document.querySelectorAll('.infos');
        bigThumbnail.forEach(bigThumb => {
            bigThumb.classList.add("none");
        });
    };
});

//alert("Attention ! Ce site présente de nombreux spoilers sur la série Breaking Bad. ");