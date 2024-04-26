document.addEventListener("DOMContentLoaded", function () {
    const filterItems = document.querySelectorAll("#filter li");
    const games = document.querySelectorAll(".game");

    filterItems.forEach(item => {
        item.addEventListener("click", function () {
            const category = this.getAttribute("data-category");
            filterGames(category);
        });
    });

    function filterGames(category) {
        games.forEach(game => {
            if (category === "all" || game.getAttribute("data-category") === category) {
                game.classList.remove("hidden"); 
            } else {
                game.classList.add("hidden"); 
            }
        });
    }
});
