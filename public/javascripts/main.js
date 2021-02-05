const downloadForm = document.getElementById("download");
downloadForm.addEventListener("submit", async event => {
    // Keep form data from reaching server before being validated
    event.preventDefault();

    const url = document.getElementById("url").value.trim();

    // Validate input length
    if (!url.length) { console.log("Empty URL Field"); return; }

    const fileType = document.getElementById("file_type").value;
    const endpoint = fileType == "mp3" ? `/download/mp3?url=${String(url)}` : `/download/mp4?url=${String(url)}`;
    window.location.href = endpoint;
});

const searchForm = document.getElementById("search");
searchForm.addEventListener("submit", async event => {
    // Keep form data from reaching server before being validated
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    // Validate input length
    if (!title.length) { console.log("Empty Title Field"); return; }

    const endpoint = `/search?title=${title}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);
});