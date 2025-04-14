const analyzePage = async () => {
    const textContent = document.body.innerText;
    const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: textContent })
    });

    const result = await response.json();
    alert(`Trust Score: ${result.score}`);
};

analyzePage();
