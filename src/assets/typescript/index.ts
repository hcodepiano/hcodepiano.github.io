[...document.querySelectorAll(".piano .piano-key")].forEach((element: Element) => {

    element.addEventListener("click", (event) => {

        const currentKey = event.target as Element;

        if (currentKey) {

            const piano = currentKey.closest(".piano");

            piano!.querySelectorAll(".piano-key").forEach(element => {

                if (element.classList.contains("pressed")) {
                    element.classList.remove("pressed");
                }

            });

            currentKey.classList.add("pressed");

        }

    });

});