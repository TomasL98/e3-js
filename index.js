document
  .getElementById("pizzaForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir el envío del formulario

    // Obtiene el valor del input
    const pizzaId = document.getElementById("pizzaId").value;

    // Verifica si el valor es un número
    if (isNaN(pizzaId)) {
      renderErrorMessage("Ingrese un número válido.");
      return;
    }

    const pizza = getPizzaById(parseInt(pizzaId));

    if (pizza) {
      renderPizzaCard(pizza);
    } else {
      renderErrorMessage("No se encontró ninguna pizza con ese número.");
    }
  });

// Función para renderizar la card de la pizza
function renderPizzaCard(pizza) {
  const resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = "";

  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.src = pizza.image;
  img.alt = pizza.name;
  card.appendChild(img);

  const name = document.createElement("h2");
  name.textContent = pizza.name;
  card.appendChild(name);

  const price = document.createElement("p");
  price.textContent = `Precio: $${pizza.price}`;
  card.appendChild(price);

  const ingredients = document.createElement("p");
  ingredients.textContent = `Ingredientes: ${pizza.ingredientes.join(", ")}`;
  card.appendChild(ingredients);

  resultContainer.appendChild(card);
}

// Función para renderizar mensajes de error
function renderErrorMessage(message) {
  const resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = "";

  const error = document.createElement("p");
  error.textContent = message;
  error.classList.add("error-message");

  resultContainer.appendChild(error);
}

// Función para buscar una pizza por su ID
function getPizzaById(id) {
  const pizzas = [
    {
      id: 1,
      name: "Pizza de Muzzarella",
      price: 500,
      ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
      image: "./img/muzzarella.png",
    },
    {
      id: 2,
      name: "Pizza de Cebolla",
      price: 1500,
      ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
      image: "./img/cebolla.png",
    },
    {
      id: 3,
      name: "Pizza 4 Quesos",
      price: 1380,
      ingredientes: [
        "Muzzarella",
        "Tomate",
        "Queso Azul",
        "Parmesano",
        "Roquefort",
      ],
      image: "./img/4quesos.png",
    },
    {
      id: 4,
      name: "Pizza Especial",
      price: 1000,
      ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
      image: "./img/especial.png",
    },
    {
      id: 5,
      name: "Pizza con Anana",
      price: 600,
      ingredientes: ["Muzzarella", "Tomate", "Anana"],
      image: "./img/anana.png",
    },
  ];

  return pizzas.find((pizza) => pizza.id === id);
}

// Función para obtener la última pizza buscada y renderizada desde localStorage
function getLastSearchedPizza() {
  return JSON.parse(localStorage.getItem("lastSearchedPizza"));
}

// Función para guardar la última pizza buscada y renderizada en localStorage
function saveLastSearchedPizza(pizza) {
  localStorage.setItem("lastSearchedPizza", JSON.stringify(pizza));
}

// Al cargar la página, verificar si hay una pizza guardada en localStorage y renderizarla si existe
window.addEventListener("load", function () {
  const lastSearchedPizza = getLastSearchedPizza();
  if (lastSearchedPizza) {
    renderPizzaCard(lastSearchedPizza);
  }
});

document
  .getElementById("pizzaForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtener el valor del input
    const pizzaId = document.getElementById("pizzaId").value;

    if (isNaN(pizzaId)) {
      renderErrorMessage("Ingrese un número válido.");
      return;
    }

    const pizza = getPizzaById(parseInt(pizzaId));

    if (pizza) {
      // Si la pizza existe, renderizarla y guardarla en localStorage
      renderPizzaCard(pizza);
      saveLastSearchedPizza(pizza);
    } else {
      // Si la pizza no existe, mostrar un mensaje de error
      renderErrorMessage("No se encontró ninguna pizza con ese número.");
    }
  });
