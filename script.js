let search = document.querySelector("#search-input");
let btn = document.querySelector("#search-button");
let pName = document.querySelector("#pokemon-name");
let pId = document.querySelector("#pokemon-id");
let pWeight = document.querySelector("#weight");
let pHeight = document.querySelector("#height");
let pTypes = document.querySelector("#types");
let pHP = document.querySelector("#hp");
let pAttack = document.querySelector("#attack");
let pDefense = document.querySelector("#defense");
let pSpecialAttack = document.querySelector("#special-attack");
let pSpecialDefense = document.querySelector("#special-defense");
let pSpeed = document.querySelector("#speed");
let pImg = document.querySelector("#sprite");

// console.log(
//   search,
//   btn,
//   pname,
//   pweight,
//   pheight,
//   ptypes,
//   pHP,
//   pAttack,
//   pDefense,
//   pSpecialAttack,
//   pSpecialDefense,
//   pSpeed
// );

// function fun() {
//   return new Promise((resolve, reject) => {
//     fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon")
//       .then((res) => resolve(res.json()))
//       .catch((err) => reject(err));
//   });
// }
async function searching() {
  let flag = false;
  let pokemon;


  await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon")
  .then(res => res.json())
    .then((res) => {
      for (let i = 0; i < res.results.length; i++) {
        if (search.value.toLowerCase() === res.results[i].name || search.value == res.results[i].id) {
          pokemon = i;
          flag = true;
        }
      }

      if (flag === false) {
        alert("Pokémon not found");
      } else {
        fetch(res.results[pokemon].url)
          .then((res) => res.json())
          .then((res) => {
            console.log(res.types);
            pImg.src = res.sprites.front_default;
            pImg.style.width = "200px";
            pId.innerHTML = `#${res.id} `;
            pName.innerHTML = res.name.toUpperCase();
            pWeight.innerHTML = `Weight: ${res.weight}`;
            pHP.innerHTML = res.stats[0].base_stat;
            pAttack.innerHTML = res.stats[1].base_stat;
            pDefense.innerHTML = res.stats[2].base_stat;
            pSpecialAttack.innerHTML = res.stats[3].base_stat;
            pSpecialDefense.innerHTML = res.stats[4].base_stat;
            pSpeed.innerHTML = res.stats[5].base_stat;
            pTypes.innerHTML = "";
            res.types.map((v) => {
              pTypes.innerHTML += `<span class="badge ${v.type.name}">${v.type.name}</span>`;
            });
          });
      }
    })
    .catch((err) => console.log(err));
}
