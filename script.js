const InfoBox = document.querySelector(".element-info");
let selectedElements = [];
let emptyElements = 0;

// Function to assign classes (element groups) to elements
function assignGroups() {
  const elements = document.querySelectorAll(".element");
  elements.forEach((element) => {
    const atomicNumber = parseInt(element.dataset.position);
    for (const [group, numbers] of Object.entries(elementGroups)) {
      if (numbers.includes(atomicNumber)) {
        element.classList.add(group);
        break;
      }
    }
  });
}

// Function to create an element div with the given element data.
function createElement(element) {
  const el = document.createElement("div");
  el.classList.add("element");
  el.dataset.position = element.position;

  // Check if atomic number and symbol are part of element data
  if (element.number && element.symbol) {
    el.innerHTML = `
        <div class="number">${element.number}</div>
        <div class="symbol">${element.symbol}</div>
        <div class="name">${element.name}</div>
    `;
  } else {
    el.innerHTML = `<div class="name">${element.name}</div>`;
  }

  // Event listener to display element information
  el.addEventListener("click", (event) => {
    // Prevent event from bubbling up to document
    event.stopPropagation();

    showElementInfo(element);
  });
  return el;
}

// Function to display information about the clicked element
function showElementInfo(element) {
  // Display the InfoBox
  InfoBox.style.display = "block";

  // Clear previous classes before adding a new one
  InfoBox.className = "";

  // Assign the correct class based on the group
  for (const [group, numbers] of Object.entries(elementGroups)) {
    if (numbers.includes(element.position)) {
      InfoBox.classList.add(group, "element-info");
      console.log(`Class ${group} added for position ${element.position}`);
      break;
    }
  }

  if (element.number) {
    // Display detailed information for elements with a number
    InfoBox.innerHTML = `
        <h2>${element.name} (${element.symbol})</h2>
        <p>Atomic Number: ${element.number}</p>
        <p>Atomic Weight: ${element.weight}</p>
        <p>Electron Configuration: ${element.config}</p>
    `;
  } else {
    // Display generic information and apply color for elements without a number
    InfoBox.innerHTML = `This colour represents all ${element.name}`;
    InfoBox.classList.add("centered");
  }

  return InfoBox;
}

// Function to hide element information
function hideElementInfo() {
  InfoBox.style.display = "none";
}
// Event listener to hide element information
document.addEventListener("click", hideElementInfo);

// Initialize the periodic table by creating and adding elements to the table.
function initPeriodicTable() {
  const table = document.querySelector(".periodic-table");
  elements.forEach((element) => {
    const el = createElement(element);
    table.appendChild(el);
    assignGroups();
  });
}

// Function to search elements
function searchElement() {
  const input = document.getElementById("search").value.toLowerCase();
  const elements = document.querySelectorAll(".element");

  elements.forEach((element) => {
    const name = element.querySelector(".name").innerText.toLowerCase();
    const symbol = element.querySelector(".symbol").innerText.toLowerCase();
    const number = element.querySelector(".number").innerText.toLowerCase();

    if (
      name.includes(input) ||
      symbol.includes(input) ||
      number.includes(input)
    ) {
      element.style.display = "";
    } else {
      element.style.display = "none";
    }
  });
}
// Function to start the memory game.
function startMemoryGame() {
  // Map the values to strings
  const categoryMapping = {
    "1 - 20": "Elements 1 - 20",
    "alkali-metals": "Alkali Metals",
    "alkali-earth-metals": "Alkali Earth Metals",
    "transition-metals": "Transition Metals",
    "post-transition-metals": "Post-transition Metals",
    metalloids: "Metalloids",
    nonmetals: "Nonmetals",
    halogens: "Halogens",
    "noble-gases": "Noble Gases",
    lanthanides: "Lanthanides",
    actinides: "Actinides",
  };

  // Display the dropdown menu
  document.querySelector(".memory-game-prompt").style.display = "block";

  // Add an event listener to the dropdown menu
  document
    .getElementById("element-category")
    .addEventListener("change", function () {
      // Get the category selected from the dropdown menu
      const category = this.value;
      alert(`You have selected ${categoryMapping[category]}`);

      // Filter elements based on the selected category and add them to the "SelectedElements" array
      switch (category) {
        case "1 - 20":
          selectedElements = elements.slice(0, 20);
          break;
        case "alkali-metals":
          selectedElements = elements.filter((el) =>
            ["Li", "Na", "K", "Rb", "Cs", "Fr"].includes(el.symbol)
          );
          break;
        case "alkali-earth-metals":
          selectedElements = elements.filter((el) =>
            ["Be", "Mg", "Ca", "Sr", "Ba", "Ra"].includes(el.symbol)
          );
          break;
        case "transition-metals":
          selectedElements = elements.filter((el) =>
            [
              21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 39, 40, 41, 42, 43, 44,
              45, 46, 47, 48, 72, 73, 74, 75, 76, 77, 78, 79, 80, 104, 105, 106,
              107, 108, 109, 110, 111, 112, 121,
            ].includes(el.number)
          );
          break;
        case "post-transition-metals":
          selectedElements = elements.filter((el) =>
            [13, 31, 49, 50, 81, 82, 83, 113, 114, 115, 116, 122].includes(
              el.number
            )
          );
          break;
        case "metalloids":
          selectedElements = elements.filter((el) =>
            [5, 14, 32, 33, 51, 52, 84, 123].includes(el.number)
          );
          break;
        case "nonmetals":
          selectedElements = elements.filter((el) =>
            [1, 6, 7, 8, 15, 16, 34].includes(el.number)
          );
          break;
        case "halogens":
          selectedElements = elements.filter((el) =>
            ["F", "Cl", "Br", "I", "At", "Ts"].includes(el.symbol)
          );
          break;
        case "noble-gases":
          selectedElements = elements.filter((el) =>
            ["He", "Ne", "Ar", "Kr", "Xe", "Rn", "Og"].includes(el.symbol)
          );
          break;
        case "lanthanides":
          selectedElements = elements.slice(56, 72);
          break;
        case "actinides":
          selectedElements = elements.slice(88, 104);
          break;
        default:
          alert("no such element group");
      }
      emptyElements = selectedElements.length;
      console.log(emptyElements);

      // Loop through each element in the "selectedElements" array
      selectedElements.forEach((element) => {
        // Select the Corresponding Element in the DOM
        const el = document.querySelector(
          `.element[data-position="${element.position}"]`
        );
        // Clear the Inner HTML of the Selected Element
        el.innerHTML = `<div class="number">--</div><div class="symbol">--</div><div class="name">--</div>`;

        document.querySelector(".message").innerHTML =
          "Click the element box to enter either the name or symbol of the missing element";

        el.addEventListener("click", () => promptUser(element, el));
      });
    });
}

function promptUser(element, el) {
  // Prompt the user for input and store input in a variable "answer"
  const answer = prompt(
    `Enter the symbol or name for element with atomic number ${element.number}:`
  );

  // Check user input
  if (
    answer === element.symbol ||
    answer.toLowerCase() === element.name.toLowerCase()
  ) {
    // Update the element display if the input is correct
    el.innerHTML = `<div class="number">${element.number}</div><div class="symbol">${element.symbol}</div><div class="name">${element.name}</div>`;
    hideElementInfo();
    emptyElements--;
    console.log(emptyElements);
  } else {
    alert("Incorrect. Try again");
    hideElementInfo();
  }
  if (emptyElements === 0) {
    document.querySelector(".message").innerHTML =
      "Congratulations! You've completded the Periodic table Memory Game!";
  }
}

// Initialize the periodic table when the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", initPeriodicTable);

// Array of elements with their properties and positions
const elements = [
  {
    number: 1,
    symbol: "H",
    name: "Hydrogen",
    weight: 1.008,
    config: "1s1",
    position: 1,
  },
  {
    number: 2,
    symbol: "He",
    name: "Helium",
    weight: 4.0026,
    config: "1s2",
    position: 2,
  },
  {
    number: 3,
    symbol: "Li",
    name: "Lithium",
    weight: 6.94,
    config: "[He] 2s1",
    position: 3,
  },
  {
    number: 4,
    symbol: "Be",
    name: "Beryllium",
    weight: 9.0122,
    config: "[He] 2s2",
    position: 4,
  },
  {
    number: 5,
    symbol: "B",
    name: "Boron",
    weight: 10.81,
    config: "[He] 2s2 2p1",
    position: 5,
  },
  {
    number: 6,
    symbol: "C",
    name: "Carbon",
    weight: 12.011,
    config: "[He] 2s2 2p2",
    position: 6,
  },
  {
    number: 7,
    symbol: "N",
    name: "Nitrogen",
    weight: 14.007,
    config: "[He] 2s2 2p3",
    position: 7,
  },
  {
    number: 8,
    symbol: "O",
    name: "Oxygen",
    weight: 15.999,
    config: "[He] 2s2 2p4",
    position: 8,
  },
  {
    number: 9,
    symbol: "F",
    name: "Fluorine",
    weight: 18.998,
    config: "[He] 2s2 2p5",
    position: 9,
  },
  {
    number: 10,
    symbol: "Ne",
    name: "Neon",
    weight: 20.18,
    config: "[He] 2s2 2p6",
    position: 10,
  },
  {
    number: 11,
    symbol: "Na",
    name: "Sodium",
    weight: 22.99,
    config: "[Ne] 3s1",
    position: 11,
  },
  {
    number: 12,
    symbol: "Mg",
    name: "Magnesium",
    weight: 24.305,
    config: "[Ne] 3s2",
    position: 12,
  },
  {
    number: 13,
    symbol: "Al",
    name: "Aluminum",
    weight: 26.982,
    config: "[Ne] 3s2 3p1",
    position: 13,
  },
  {
    number: 14,
    symbol: "Si",
    name: "Silicon",
    weight: 28.085,
    config: "[Ne] 3s2 3p2",
    position: 14,
  },
  {
    number: 15,
    symbol: "P",
    name: "Phosphorus",
    weight: 30.974,
    config: "[Ne] 3s2 3p3",
    position: 15,
  },
  {
    number: 16,
    symbol: "S",
    name: "Sulfur",
    weight: 32.06,
    config: "[Ne] 3s2 3p4",
    position: 16,
  },
  {
    number: 17,
    symbol: "Cl",
    name: "Chlorine",
    weight: 35.45,
    config: "[Ne] 3s2 3p5",
    position: 17,
  },
  {
    number: 18,
    symbol: "Ar",
    name: "Argon",
    weight: 39.948,
    config: "[Ne] 3s2 3p6",
    position: 18,
  },
  {
    number: 19,
    symbol: "K",
    name: "Potassium",
    weight: 39.098,
    config: "[Ar] 4s1",
    position: 19,
  },
  {
    number: 20,
    symbol: "Ca",
    name: "Calcium",
    weight: 40.078,
    config: "[Ar] 4s2",
    position: 20,
  },
  {
    number: 21,
    symbol: "Sc",
    name: "Scandium",
    weight: 44.956,
    config: "[Ar] 3d1 4s2",
    position: 21,
  },
  {
    number: 22,
    symbol: "Ti",
    name: "Titanium",
    weight: 47.867,
    config: "[Ar] 3d2 4s2",
    position: 22,
  },
  {
    number: 23,
    symbol: "V",
    name: "Vanadium",
    weight: 50.942,
    config: "[Ar] 3d3 4s2",
    position: 23,
  },
  {
    number: 24,
    symbol: "Cr",
    name: "Chromium",
    weight: 51.996,
    config: "[Ar] 3d5 4s1",
    position: 24,
  },
  {
    number: 25,
    symbol: "Mn",
    name: "Manganese",
    weight: 54.938,
    config: "[Ar] 3d5 4s2",
    position: 25,
  },
  {
    number: 26,
    symbol: "Fe",
    name: "Iron",
    weight: 55.845,
    config: "[Ar] 3d6 4s2",
    position: 26,
  },
  {
    number: 27,
    symbol: "Co",
    name: "Cobalt",
    weight: 58.933,
    config: "[Ar] 3d7 4s2",
    position: 27,
  },
  {
    number: 28,
    symbol: "Ni",
    name: "Nickel",
    weight: 58.693,
    config: "[Ar] 3d8 4s2",
    position: 28,
  },
  {
    number: 29,
    symbol: "Cu",
    name: "Copper",
    weight: 63.546,
    config: "[Ar] 3d10 4s1",
    position: 29,
  },
  {
    number: 30,
    symbol: "Zn",
    name: "Zinc",
    weight: 65.38,
    config: "[Ar] 3d10 4s2",
    position: 30,
  },
  {
    number: 31,
    symbol: "Ga",
    name: "Gallium",
    weight: 69.723,
    config: "[Ar] 3d10 4s2 4p1",
    position: 31,
  },
  {
    number: 32,
    symbol: "Ge",
    name: "Germanium",
    weight: 72.63,
    config: "[Ar] 3d10 4s2 4p2",
    position: 32,
  },
  {
    number: 33,
    symbol: "As",
    name: "Arsenic",
    weight: 74.922,
    config: "[Ar] 3d10 4s2 4p3",
    position: 33,
  },
  {
    number: 34,
    symbol: "Se",
    name: "Selenium",
    weight: 78.971,
    config: "[Ar] 3d10 4s2 4p4",
    position: 34,
  },
  {
    number: 35,
    symbol: "Br",
    name: "Bromine",
    weight: 79.904,
    config: "[Ar] 3d10 4s2 4p5",
    position: 35,
  },
  {
    number: 36,
    symbol: "Kr",
    name: "Krypton",
    weight: 83.798,
    config: "[Ar] 3d10 4s2 4p6",
    position: 36,
  },
  {
    number: 37,
    symbol: "Rb",
    name: "Rubidium",
    weight: 85.468,
    config: "[Kr] 5s1",
    position: 37,
  },
  {
    number: 38,
    symbol: "Sr",
    name: "Strontium",
    weight: 87.62,
    config: "[Kr] 5s2",
    position: 38,
  },
  {
    number: 39,
    symbol: "Y",
    name: "Yttrium",
    weight: 88.906,
    config: "[Kr] 4d1 5s2",
    position: 39,
  },
  {
    number: 40,
    symbol: "Zr",
    name: "Zirconium",
    weight: 91.224,
    config: "[Kr] 4d2 5s2",
    position: 40,
  },
  {
    number: 41,
    symbol: "Nb",
    name: "Niobium",
    weight: 92.906,
    config: "[Kr] 4d4 5s1",
    position: 41,
  },
  {
    number: 42,
    symbol: "Mo",
    name: "Molybdenum",
    weight: 95.95,
    config: "[Kr] 4d5 5s1",
    position: 42,
  },
  {
    number: 43,
    symbol: "Tc",
    name: "Technetium",
    weight: 98,
    config: "[Kr] 4d5 5s2",
    position: 43,
  },
  {
    number: 44,
    symbol: "Ru",
    name: "Ruthenium",
    weight: 101.07,
    config: "[Kr] 4d7 5s1",
    position: 44,
  },
  {
    number: 45,
    symbol: "Rh",
    name: "Rhodium",
    weight: 102.91,
    config: "[Kr] 4d8 5s1",
    position: 45,
  },
  {
    number: 46,
    symbol: "Pd",
    name: "Palladium",
    weight: 106.42,
    config: "[Kr] 4d10",
    position: 46,
  },
  {
    number: 47,
    symbol: "Ag",
    name: "Silver",
    weight: 107.87,
    config: "[Kr] 4d10 5s1",
    position: 47,
  },
  {
    number: 48,
    symbol: "Cd",
    name: "Cadmium",
    weight: 112.41,
    config: "[Kr] 4d10 5s2",
    position: 48,
  },
  {
    number: 49,
    symbol: "In",
    name: "Indium",
    weight: 114.82,
    config: "[Kr] 4d10 5s2 5p1",
    position: 49,
  },
  {
    number: 50,
    symbol: "Sn",
    name: "Tin",
    weight: 118.71,
    config: "[Kr] 4d10 5s2 5p2",
    position: 50,
  },
  {
    number: 51,
    symbol: "Sb",
    name: "Antimony",
    weight: 121.76,
    config: "[Kr] 4d10 5s2 5p3",
    position: 51,
  },
  {
    number: 52,
    symbol: "Te",
    name: "Tellurium",
    weight: 127.6,
    config: "[Kr] 4d10 5s2 5p4",
    position: 52,
  },
  {
    number: 53,
    symbol: "I",
    name: "Iodine",
    weight: 126.9,
    config: "[Kr] 4d10 5s2 5p5",
    position: 53,
  },
  {
    number: 54,
    symbol: "Xe",
    name: "Xenon",
    weight: 131.29,
    config: "[Kr] 4d10 5s2 5p6",
    position: 54,
  },
  {
    number: 55,
    symbol: "Cs",
    name: "Cesium",
    weight: 132.91,
    config: "[Xe] 6s1",
    position: 55,
  },
  {
    number: 56,
    symbol: "Ba",
    name: "Barium",
    weight: 137.33,
    config: "[Xe] 6s2",
    position: 56,
  },
  {
    number: 57,
    symbol: "La",
    name: "Lanthanum",
    weight: 138.91,
    config: "[Xe] 5d1 6s2",
    position: 57,
  },
  {
    number: 58,
    symbol: "Ce",
    name: "Cerium",
    weight: 140.12,
    config: "[Xe] 4f1 5d1 6s2",
    position: 58,
  },
  {
    number: 59,
    symbol: "Pr",
    name: "Praseodymium",
    weight: 140.91,
    config: "[Xe] 4f3 6s2",
    position: 59,
  },
  {
    number: 60,
    symbol: "Nd",
    name: "Neodymium",
    weight: 144.24,
    config: "[Xe] 4f4 6s2",
    position: 60,
  },
  {
    number: 61,
    symbol: "Pm",
    name: "Promethium",
    weight: 145,
    config: "[Xe] 4f5 6s2",
    position: 61,
  },
  {
    number: 62,
    symbol: "Sm",
    name: "Samarium",
    weight: 150.36,
    config: "[Xe] 4f6 6s2",
    position: 62,
  },
  {
    number: 63,
    symbol: "Eu",
    name: "Europium",
    weight: 151.96,
    config: "[Xe] 4f7 6s2",
    position: 63,
  },
  {
    number: 64,
    symbol: "Gd",
    name: "Gadolinium",
    weight: 157.25,
    config: "[Xe] 4f7 5d1 6s2",
    position: 64,
  },
  {
    number: 65,
    symbol: "Tb",
    name: "Terbium",
    weight: 158.93,
    config: "[Xe] 4f9 6s2",
    position: 65,
  },
  {
    number: 66,
    symbol: "Dy",
    name: "Dysprosium",
    weight: 162.5,
    config: "[Xe] 4f10 6s2",
    position: 66,
  },
  {
    number: 67,
    symbol: "Ho",
    name: "Holmium",
    weight: 164.93,
    config: "[Xe] 4f11 6s2",
    position: 67,
  },
  {
    number: 68,
    symbol: "Er",
    name: "Erbium",
    weight: 167.26,
    config: "[Xe] 4f12 6s2",
    position: 68,
  },
  {
    number: 69,
    symbol: "Tm",
    name: "Thulium",
    weight: 168.93,
    config: "[Xe] 4f13 6s2",
    position: 69,
  },
  {
    number: 70,
    symbol: "Yb",
    name: "Ytterbium",
    weight: 173.05,
    config: "[Xe] 4f14 6s2",
    position: 70,
  },
  {
    number: 71,
    symbol: "Lu",
    name: "Lutetium",
    weight: 174.97,
    config: "[Xe] 4f14 5d1 6s2",
    position: 71,
  },
  {
    number: 72,
    symbol: "Hf",
    name: "Hafnium",
    weight: 178.49,
    config: "[Xe] 4f14 5d2 6s2",
    position: 72,
  },
  {
    number: 73,
    symbol: "Ta",
    name: "Tantalum",
    weight: 180.95,
    config: "[Xe] 4f14 5d3 6s2",
    position: 73,
  },
  {
    number: 74,
    symbol: "W",
    name: "Tungsten",
    weight: 183.84,
    config: "[Xe] 4f14 5d4 6s2",
    position: 74,
  },
  {
    number: 75,
    symbol: "Re",
    name: "Rhenium",
    weight: 186.21,
    config: "[Xe] 4f14 5d5 6s2",
    position: 75,
  },
  {
    number: 76,
    symbol: "Os",
    name: "Osmium",
    weight: 190.23,
    config: "[Xe] 4f14 5d6 6s2",
    position: 76,
  },
  {
    number: 77,
    symbol: "Ir",
    name: "Iridium",
    weight: 192.22,
    config: "[Xe] 4f14 5d7 6s2",
    position: 77,
  },
  {
    number: 78,
    symbol: "Pt",
    name: "Platinum",
    weight: 195.08,
    config: "[Xe] 4f14 5d9 6s1",
    position: 78,
  },
  {
    number: 79,
    symbol: "Au",
    name: "Gold",
    weight: 196.97,
    config: "[Xe] 4f14 5d10 6s1",
    position: 79,
  },
  {
    number: 80,
    symbol: "Hg",
    name: "Mercury",
    weight: 200.59,
    config: "[Xe] 4f14 5d10 6s2",
    position: 80,
  },
  {
    number: 81,
    symbol: "Tl",
    name: "Thallium",
    weight: 204.38,
    config: "[Xe] 4f14 5d10 6s2 6p1",
    position: 81,
  },
  {
    number: 82,
    symbol: "Pb",
    name: "Lead",
    weight: 207.2,
    config: "[Xe] 4f14 5d10 6s2 6p2",
    position: 82,
  },
  {
    number: 83,
    symbol: "Bi",
    name: "Bismuth",
    weight: 208.98,
    config: "[Xe] 4f14 5d10 6s2 6p3",
    position: 83,
  },
  {
    number: 84,
    symbol: "Po",
    name: "Polonium",
    weight: 209,
    config: "[Xe] 4f14 5d10 6s2 6p4",
    position: 84,
  },
  {
    number: 85,
    symbol: "At",
    name: "Astatine",
    weight: 210,
    config: "[Xe] 4f14 5d10 6s2 6p5",
    position: 85,
  },
  {
    number: 86,
    symbol: "Rn",
    name: "Radon",
    weight: 222,
    config: "[Xe] 4f14 5d10 6s2 6p6",
    position: 86,
  },
  {
    number: 87,
    symbol: "Fr",
    name: "Francium",
    weight: 223,
    config: "[Rn] 7s1",
    position: 87,
  },
  {
    number: 88,
    symbol: "Ra",
    name: "Radium",
    weight: 226,
    config: "[Rn] 7s2",
    position: 88,
  },
  {
    number: 89,
    symbol: "Ac",
    name: "Actinium",
    weight: 227,
    config: "[Rn] 6d1 7s2",
    position: 89,
  },
  {
    number: 90,
    symbol: "Th",
    name: "Thorium",
    weight: 232.04,
    config: "[Rn] 6d2 7s2",
    position: 90,
  },
  {
    number: 91,
    symbol: "Pa",
    name: "Protactinium",
    weight: 231.04,
    config: "[Rn] 5f2 6d1 7s2",
    position: 91,
  },
  {
    number: 92,
    symbol: "U",
    name: "Uranium",
    weight: 238.03,
    config: "[Rn] 5f3 6d1 7s2",
    position: 92,
  },
  {
    number: 93,
    symbol: "Np",
    name: "Neptunium",
    weight: 237,
    config: "[Rn] 5f4 6d1 7s2",
    position: 93,
  },
  {
    number: 94,
    symbol: "Pu",
    name: "Plutonium",
    weight: 244,
    config: "[Rn] 5f6 7s2",
    position: 94,
  },
  {
    number: 95,
    symbol: "Am",
    name: "Americium",
    weight: 243,
    config: "[Rn] 5f7 7s2",
    position: 95,
  },
  {
    number: 96,
    symbol: "Cm",
    name: "Curium",
    weight: 247,
    config: "[Rn] 5f7 6d1 7s2",
    position: 96,
  },
  {
    number: 97,
    symbol: "Bk",
    name: "Berkelium",
    weight: 247,
    config: "[Rn] 5f9 7s2",
    position: 97,
  },
  {
    number: 98,
    symbol: "Cf",
    name: "Californium",
    weight: 251,
    config: "[Rn] 5f10 7s2",
    position: 98,
  },
  {
    number: 99,
    symbol: "Es",
    name: "Einsteinium",
    weight: 252,
    config: "[Rn] 5f11 7s2",
    position: 99,
  },
  {
    number: 100,
    symbol: "Fm",
    name: "Fermium",
    weight: 257,
    config: "[Rn] 5f12 7s2",
    position: 100,
  },
  {
    number: 101,
    symbol: "Md",
    name: "Mendelevium",
    weight: 258,
    config: "[Rn] 5f13 7s2",
    position: 101,
  },
  {
    number: 102,
    symbol: "No",
    name: "Nobelium",
    weight: 259,
    config: "[Rn] 5f14 7s2",
    position: 102,
  },
  {
    number: 103,
    symbol: "Lr",
    name: "Lawrencium",
    weight: 262,
    config: "[Rn] 5f14 7s2 7p1",
    position: 103,
  },
  {
    number: 104,
    symbol: "Rf",
    name: "Rutherfordium",
    weight: 267,
    config: "[Rn] 5f14 6d2 7s2",
    position: 104,
  },
  {
    number: 105,
    symbol: "Db",
    name: "Dubnium",
    weight: 270,
    config: "[Rn] 5f14 6d3 7s2",
    position: 105,
  },
  {
    number: 106,
    symbol: "Sg",
    name: "Seaborgium",
    weight: 271,
    config: "[Rn] 5f14 6d4 7s2",
    position: 106,
  },
  {
    number: 107,
    symbol: "Bh",
    name: "Bohrium",
    weight: 270,
    config: "[Rn] 5f14 6d5 7s2",
    position: 107,
  },
  {
    number: 108,
    symbol: "Hs",
    name: "Hassium",
    weight: 277,
    config: "[Rn] 5f14 6d6 7s2",
    position: 108,
  },
  {
    number: 109,
    symbol: "Mt",
    name: "Meitnerium",
    weight: 278,
    config: "[Rn] 5f14 6d7 7s2",
    position: 109,
  },
  {
    number: 110,
    symbol: "Ds",
    name: "Darmstadtium",
    weight: 281,
    config: "[Rn] 5f14 6d9 7s1",
    position: 110,
  },
  {
    number: 111,
    symbol: "Rg",
    name: "Roentgenium",
    weight: 282,
    config: "[Rn] 5f14 6d10 7s1",
    position: 111,
  },
  {
    number: 112,
    symbol: "Cn",
    name: "Copernicium",
    weight: 285,
    config: "[Rn] 5f14 6d10 7s2",
    position: 112,
  },
  {
    number: 113,
    symbol: "Nh",
    name: "Nihonium",
    weight: 286,
    config: "[Rn] 5f14 6d10 7s2 7p1",
    position: 113,
  },
  {
    number: 114,
    symbol: "Fl",
    name: "Flerovium",
    weight: 289,
    config: "[Rn] 5f14 6d10 7s2 7p2",
    position: 114,
  },
  {
    number: 115,
    symbol: "Mc",
    name: "Moscovium",
    weight: 290,
    config: "[Rn] 5f14 6d10 7s2 7p3",
    position: 115,
  },
  {
    number: 116,
    symbol: "Lv",
    name: "Livermorium",
    weight: 293,
    config: "[Rn] 5f14 6d10 7s2 7p4",
    position: 116,
  },
  {
    number: 117,
    symbol: "Ts",
    name: "Tennessine",
    weight: 294,
    config: "[Rn] 5f14 6d10 7s2 7p5",
    position: 117,
  },
  {
    number: 118,
    symbol: "Og",
    name: "Oganesson",
    weight: 294,
    config: "[Rn] 5f14 6d10 7s2 7p6",
    position: 118,
  },
  {
    name: "Alkali Metals",
    position: 119,
  },
  {
    name: "Alkali Earth Metals",
    position: 120,
  },
  {
    name: "Transition Metals",
    position: 121,
  },
  {
    name: "Post-transition Metals",
    position: 122,
  },
  {
    name: "Metalloids",
    position: 123,
  },
  {
    name: "Nometals",
    position: 124,
  },
  {
    name: "Halogens",
    position: 125,
  },
  {
    name: "Noble Gases",
    position: 126,
  },
  {
    name: "Lanthanides",
    position: 127,
  },
  {
    name: "Actinides",
    position: 128,
  },
];

const elementGroups = {
  "alkali-metals": [3, 11, 19, 37, 55, 87, 119],
  "alkali-earth-metals": [4, 12, 20, 38, 56, 88, 120],
  "transition-metals": [
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 39, 40, 41, 42, 43, 44, 45, 46, 47,
    48, 72, 73, 74, 75, 76, 77, 78, 79, 80, 104, 105, 106, 107, 108, 109, 110,
    111, 112, 121,
  ],
  "post-transition-metals": [
    13, 31, 49, 50, 81, 82, 83, 113, 114, 115, 116, 122,
  ],
  metalloids: [5, 14, 32, 33, 51, 52, 84, 123],
  nonmetals: [1, 6, 7, 8, 15, 16, 34, 124],
  halogens: [9, 17, 35, 53, 85, 117, 125],
  "noble-gases": [2, 10, 18, 36, 54, 86, 118, 126],
  lanthanides: [
    57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 127,
  ],
  actinides: [
    89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 128,
  ],
};
